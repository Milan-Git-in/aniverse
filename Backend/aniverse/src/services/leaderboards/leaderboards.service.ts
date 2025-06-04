import { Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { RedisService } from '../redis/redis.service';
import axios from 'axios';
@Injectable()
export class LeaderboardsService {
  constructor(private readonly redisService: RedisService) {}
  async fetchBest() {
    const redis = this.redisService.getClient();
    try {
      const query =
        'query { Page(perPage: 30) { media(type: ANIME, sort: TRENDING_DESC) { title { english } popularity coverImage { large } } } }';
      const res = await axios.post('https://graphql.anilist.co', {
        query,
      });
      await redis.set('lb:leaderboards', JSON.stringify(res.data));
      return res.data;
    } catch (error) {
      console.log(error.message || error);
    }
    return 'Anilist error';
  }

  // interval of 1 day
  @Interval(24 * 60 * 60 * 1000)
  async autoRefresh() {
    const redis = this.redisService.getClient();
    const res = await this.fetchBest();
    try {
      console.log('updating leaderboards in Redis');
      await redis.set('lb:leaderboards', JSON.stringify(res));
      console.log('leaderboards updated in Redis');
    } catch (error) {
      console.error('Error updating leaderboards in Redis:', error.message);
    }
  }

  async getLatest() {
    const redis = this.redisService.getClient();
    const news = await redis.get('lb:leaderboards');
    if (!news) {
      console.log('fetching live');
      return await this.fetchBest();
    }
    return news;
  }
}
