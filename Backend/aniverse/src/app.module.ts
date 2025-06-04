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
import { NodemailerController } from './controllers/nodemailer/nodemailer.controller';
import { NodemailerService } from './services/nodemailer/nodemailer.service';
import { ReadingsController } from './controllers/readings/readings.controller';
import { ReadingsService } from './services/readings/readings.service';
import { NewsController } from './controllers/news/news.controller';
import { NewsService } from './services/news/news.service';
import { LeaderboardsService } from './services/leaderboards/leaderboards.service';
import { LeaderboardsController } from './controllers/leaderboards/leaderboards.controller';
@Module({
  imports: [ConfigModule.forRoot(), ScheduleModule.forRoot()],
  controllers: [
    AppController,
    YoutubeController,
    SupabaseController,
    UserController,
    NodemailerController,
    ReadingsController,
    NewsController,
    LeaderboardsController,
  ],
  providers: [
    RedisService,
    AppService,
    YoutubeService,
    SupabaseService,
    UserService,
    BloomFilterService,
    NodemailerService,
    ReadingsService,
    NewsService,
    LeaderboardsService,
  ],
})
export class AppModule {}
