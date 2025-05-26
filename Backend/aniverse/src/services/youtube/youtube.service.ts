import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { page, video } from 'src/utils/types';

@Injectable()
export class YoutubeService {
  async searchVideo(query: string, pageToken = ''): Promise<page | string> {
    const apiKey = process.env.YOUTUBE_API_KEY;
    if (!apiKey || apiKey === '') {
      return 'No API key found';
    }
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search`,
      {
        params: {
          part: 'snippet',
          q: `${query} anime amv edit`,
          key: apiKey,
          type: 'video',
          maxResults: 7,
          ...(pageToken && { pageToken }),
        },
      },
    );
    return {
      results: response.data.items.map(
        (item: { snippet: { title: any }; id: { videoId: string } }) => ({
          title: item.snippet.title,
          videoId: item.id.videoId,
          url: 'https://www.youtube.com/embed/' + item.id.videoId,
        }),
      ),
      nextPageToken: response.data.nextPageToken ?? null,
    };
  }
  async fetchLatest(): Promise<page | string> {
    const apiKey = process.env.YOUTUBE_API_KEY;
    if (!apiKey || apiKey === '') {
      return 'No API key found';
    }
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search`,
      {
        params: {
          part: 'snippet',
          q: 'anime edit',
          key: apiKey,
          type: 'video',
          maxResults: 20,
          videoDuration: 'medium',
        },
      },
    );
    return {
      results: response.data.items.map(
        (item: { snippet: { title: string }; id: { videoId: string } }) => ({
          title: item.snippet.title,
          videoId: item.id.videoId,
          url: 'https://www.youtube.com/embed/' + item.id.videoId,
        }),
      ),
      nextPageToken: response.data.nextPageToken ?? null,
    };
  }
}
