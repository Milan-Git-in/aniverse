import { Controller, Get } from '@nestjs/common';
import { NewsService } from 'src/services/news/news.service';
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}
  @Get()
  async getNews() {
    return await this.newsService.getLatest();
  }
}
