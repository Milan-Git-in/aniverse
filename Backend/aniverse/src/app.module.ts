import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { YoutubeController } from './controllers/youtube/youtube.controller';
import { YoutubeService } from './services/youtube/youtube.service';
import { ConfigModule } from '@nestjs/config';
import { SupabaseController } from './supabase/controller/supabase.controller';
import { SupabaseService } from './supabase/service/supabase.service';
import { UserController } from './supabase/controller/user/user.controller';
import { ScheduleModule } from '@nestjs/schedule';

import { UserService } from './supabase/service/user/user.service';
import { BloomFilterService } from './services/filter/bloom-filter.service';
import { RedisService } from './services/redis/redis.service';
@Module({
  imports: [ConfigModule.forRoot(), ScheduleModule.forRoot()],
  controllers: [
    AppController,
    YoutubeController,
    SupabaseController,
    UserController,
  ],
  providers: [
    RedisService,
    AppService,
    YoutubeService,
    SupabaseService,
    UserService,
    BloomFilterService,
  ],
})
export class AppModule {}
