import { Body, Controller, Param, Post, Query } from '@nestjs/common';
import { YoutubeService } from '../../services/youtube/youtube.service';
import { page } from 'src/utils/types';
@Controller('youtube/v1/')
export class YoutubeController {
  constructor(private readonly youtubeService: YoutubeService) {}

  @Post('search/:Search_Query') // means /youtube/v1/search/:id
  async getSearchResults(
    @Body() body: { email: string },
    @Param('Search_Query') Query: string,
    @Query('pageToken') pageToken: string | undefined,
  ): Promise<page | string> {
    if (pageToken === undefined) pageToken = '';
    return await this.youtubeService.searchVideo(body.email, Query, pageToken);
  }

  @Post('home') // means /youtube/v1/home
  async getLatest(@Body() body: { email: string }): Promise<page | string> {
    const res = await this.youtubeService.fetchReleveantVideos(body.email);

    if (res.results.length > 0) return res;
    else {
      return await this.youtubeService.fetchLatest();
    }
  }
}
