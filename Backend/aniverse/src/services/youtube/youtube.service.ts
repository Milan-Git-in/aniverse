import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { page, video } from 'src/utils/types';
import { SupabaseService } from 'src/supabase/service/supabase.service';
import { SupabaseClient } from '@supabase/supabase-js';
@Injectable()
export class YoutubeService {
  private supabase: SupabaseClient;
  constructor(supabaseService: SupabaseService) {
    this.supabase = supabaseService.getClient();
  }

  async updateSearchTokens(email: string, queryToken: string[]): Promise<void> {
    const { data, error } = await this.supabase
      .from('user')
      .select('search_tokens')
      .eq('email', email)
      .single();
    if (error) {
      throw new Error('Failed to fetch search tokens');
    }
    const currentTokens = new Set(data?.search_tokens ?? []);
    queryToken.forEach((t) => currentTokens.add(t));
    const updatedTokens = [...queryToken, ...currentTokens];
    const trimmed = updatedTokens.slice(0, 20); // only keep latest 20
    await this.supabase
      .from('user')
      .update({ search_tokens: trimmed })
      .eq('email', email);
  }

  async searchVideo(
    email: string,
    query: string,
    pageToken = '',
  ): Promise<page | string> {
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
    await this.updateSearchTokens(email, [query]);
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

  async fetchReleveantVideos(email: string): Promise<page> {
    const apiKey = process.env.YOUTUBE_API_KEY;
    if (!apiKey || apiKey === '') {
      return {
        results: [],
        nextPageToken: '',
      };
    }
    const query = await this.supabase
      .from('user')
      .select('search_tokens')
      .eq('email', email);

    const tokens = query?.data?.[0]?.search_tokens?.slice(0, 3) ?? [];
    const q = tokens.join(' ') + ' anime amv edit';

    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search`,
      {
        params: {
          part: 'snippet',
          q: q,
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

  async fetchLatest(): Promise<page> {
    const apiKey = process.env.YOUTUBE_API_KEY;
    if (!apiKey || apiKey === '') {
      return {
        results: [],
        nextPageToken: '',
      };
    }
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search`,
      {
        params: {
          part: 'snippet',
          q: 'anime amv edit',
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
