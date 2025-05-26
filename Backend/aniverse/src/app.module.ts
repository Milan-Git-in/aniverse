import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { YoutubeController } from './controllers/youtube/youtube.controller';
import { YoutubeService } from './services/youtube/youtube.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, YoutubeController],
  providers: [AppService, YoutubeService],
})
export class AppModule {}
