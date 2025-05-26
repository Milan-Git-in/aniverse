import { Controller, Get, Param, Query } from '@nestjs/common';
import { YoutubeService } from 'src/services/youtube/youtube.service';
import { page } from 'src/utils/types';
@Controller('youtube/v1/')
export class YoutubeController {
  constructor(private readonly youtubeService: YoutubeService) {}

  @Get('search/:Search_Query') // means /youtube/v1/search/:id
  async getSearchResults(
    @Param('Search_Query') Query: string,
    @Query('pageToken') pageToken: string | undefined,
  ): Promise<page | string> {
    return await this.youtubeService.searchVideo(Query, pageToken);
  }

  @Get('home') // means /youtube/v1/home
  async getLatest(): Promise<page | string> {
    return await this.youtubeService.fetchLatest();
  }
}
