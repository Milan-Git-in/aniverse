// Mirrored from web app's lib/utils.ts

export type Videos = {
  title: string;
  videoId: string;
  url: string;
};

export type LeaderBoardCard = {
  title: {
    english: string;
    romaji?: string;
  };
  popularity: number;
  coverImage: {
    large: string;
  };
};

export type AiringSchedule = {
  airingAt: number;
  episode: number;
  media: {
    title: {
      romaji: string;
      english: string | null;
    };
    siteUrl: string;
    coverImage: {
      large: string;
    };
  };
};

export type MediaItem = {
  title: {
    romaji: string;
    english: string | null;
  };
  siteUrl: string;
  startDate: {
    year: number;
    month: number | null;
    day: number | null;
  };
  coverImage: {
    large: string;
  };
};

export type News = {
  data: {
    airingToday: {
      airingSchedules: AiringSchedule[];
    };
    recent: {
      media: MediaItem[];
    };
  };
};

export type Manhwa = {
  id: number;
  created_at: string;
  name: string;
  url: string;
};

export type LightNovel = {
  id: number;
  created_at: string;
  Name: string;
  Url: string;
};
