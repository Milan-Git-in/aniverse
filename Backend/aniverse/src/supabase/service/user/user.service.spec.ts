import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { BloomFilterService } from 'src/services/filter/bloom-filter.service';
import { SupabaseService } from 'src/supabase/service/supabase.service';
import { RedisService } from 'src/services/redis/redis.service';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
describe('UserService', () => {
  let service: UserService;
  let supabaseService: SupabaseService;
  let BloomFilter: BloomFilterService;
  beforeEach(async () => {
    dotenv.config();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        BloomFilterService,
        SupabaseService,
        RedisService,
      ],
    }).compile();
    BloomFilter = module.get<BloomFilterService>(BloomFilterService);
    supabaseService = module.get<SupabaseService>(SupabaseService);
    service = module.get<UserService>(UserService);
  });

  beforeAll(async () => {
    await BloomFilter.autoRefresh();
  });

  afterAll(async () => {
    const supabase = supabaseService.getClient();
    await supabase.from('user').delete().eq('email', 'test2@gmail.com');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should Create User', async () => {
    const res = await service.createUser({
      username: 'Failed',
      email: 'test@gmail.com',
    });
    expect(res.success).toBe(true);
  });

  it('Should update email', async () => {
    const res = await service.updateEmail('test@gmail.com', 'test2@gmail.com');
    expect(res.success).toBe(true);
  });

  it('should update username', async () => {
    const res = await service.updateUsername('Success', 'test2@gmail.com');
    expect(res.success).toBe(true);
  });

  it('should upload profile', async () => {
    const filePath = path.join(
      __dirname,
      '..',
      '..',
      '..',
      'images',
      'image.png',
    );

    const buffer = fs.readFileSync(filePath);
    const file = {
      buffer: buffer,
      originalname: 'image.png',
      mimetype: 'image/png',
    } as Express.Multer.File;
    const res = await service.updateProfile(file, 'test2@gmail.com');
    expect(res.success).toBe(true);
  }, 10000);
});
