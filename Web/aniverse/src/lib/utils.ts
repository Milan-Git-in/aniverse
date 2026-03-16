import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type Videos = {
  title: string;
  videoId: string;
  url: string;
};

export type Message = {
  id: number;
  username: string;
  message: string;
  from: string;
  created_at: string;
  profile_picture: string;
};

export type LeaderBoardCard = {
  title: {
    english: string;
  };
  popularity: number;
  coverImage: {
    large: string;
  };
};

export type AiringSchedules = AiringSchedule[];

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

export type Media = MediaItem[];

export type News = {
  data: {
    airingToday: {
      airingSchedules: AiringSchedules;
    };
    recent: {
      media: Media;
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
