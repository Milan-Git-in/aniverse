import { Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { RedisService } from '../redis/redis.service';
import axios from 'axios';
@Injectable()
export class NewsService {
  constructor(private readonly redisService: RedisService) {}
  async fetchNews(timeStamp: number) {
    const redis = this.redisService.getClient();
    try {
      const time = Math.floor(timeStamp / 1000);
      const query = `query { airingToday: Page(perPage: 15) { airingSchedules(airingAt_greater: ${time}, sort: TIME) { airingAt episode media { title { romaji english } siteUrl coverImage { large } } } } recent: Page(perPage: 10) { media(sort: ID_DESC, type: ANIME) { title { romaji english } siteUrl startDate { year month day } coverImage { large } } } }`;
      const res = await axios.post('https://graphql.anilist.co', {
        query,
      });
      await redis.set('news:news', JSON.stringify(res.data));
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
    const timeStamp = Date.now();
    const res = await this.fetchNews(timeStamp);
    try {
      console.log('Setting latest news in Redis');
      await redis.set('news:news', JSON.stringify(res));
      console.log('Latest news set in Redis');
    } catch (error) {
      console.error('Error setting news in Redis:', error.message);
    }
  }

  async getLatest() {
    const redis = this.redisService.getClient();
    await redis.del('news');
    const news = await redis.get('news:news');
    if (!news) {
      console.log('fetching live');
      return await this.fetchNews(Date.now());
    }
    return news;
  }
}
