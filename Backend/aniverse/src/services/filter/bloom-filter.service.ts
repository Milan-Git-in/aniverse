import { Injectable, OnModuleInit } from '@nestjs/common';
import { BloomFilter } from 'bloom-filters';
import { RedisService } from '../redis/redis.service';
import { Interval } from '@nestjs/schedule';
import { SupabaseService } from '../../supabase/service/supabase.service';
const REDIS_KEY = 'bloom:email:filter';

@Injectable()
export class BloomFilterService implements OnModuleInit {
  private filter: BloomFilter;

  constructor(
    private readonly redisService: RedisService,
    private readonly supabaseService: SupabaseService,
  ) {
    this.filter = BloomFilter.create(1000000, 0.01);
  }

  async onModuleInit() {
    await this.loadFilter();
  }

  private async loadFilter() {
    const redis = this.redisService.getClient();
    const serialized = await redis.get(REDIS_KEY);

    if (serialized) {
      let json;
      try {
        json =
          typeof serialized === 'string' ? JSON.parse(serialized) : serialized;
      } catch (e) {
        console.error('[Bloom] Invalid JSON from Redis:', serialized);
        throw new Error('Failed to parse Bloom filter from Redis');
      }

      this.filter = BloomFilter.fromJSON(json);
      console.log('[Bloom] Loaded from Redis');
    } else {
      await this.buildAndStoreFilter();
    }
  }

  async buildAndStoreFilter() {
    const supabase = this.supabaseService.getClient();
    const redis = this.redisService.getClient();
    const res = await supabase.from('user').select('email');

    if (!res.data || res.data.length === 0) {
      console.warn('[Bloom] No emails found, skipping filter creation');
      return;
    }

    const allEmails = res.data.map((user) => user.email);
    const filter = new BloomFilter(100000, 10);
    allEmails.forEach((email) => filter.add(email));

    await redis.set(REDIS_KEY, JSON.stringify(filter.saveAsJSON()));
    this.filter = filter;

    console.log(
      `[Bloom] Rebuilt and saved to Redis with ${allEmails.length} emails`,
    );
  }

  @Interval(1000 * 60 * 60)
  async autoRefresh() {
    await this.buildAndStoreFilter();
  }

  public probablyHas(email: string): boolean {
    return this.filter?.has(email);
  }

  public addToFilter(email: string) {
    this.filter.add(email);
  }

  public async syncToRedis() {
    const redis = this.redisService.getClient();
    await redis.set(REDIS_KEY, JSON.stringify(this.filter.saveAsJSON()));
    console.log('[Bloom] Filter synced to Redis');
  }
}
