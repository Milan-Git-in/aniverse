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
