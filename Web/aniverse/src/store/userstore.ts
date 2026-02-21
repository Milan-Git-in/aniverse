import { create } from "zustand";

export type User = {
  id: number;
  created_at: string;
  username: string;
  profile_picture: string;
  email: string;
  search_tokens: string[];
};
type UserStore = {
  user: User | null;
  setUser: (user: User) => void;
  isLoggedin: boolean;
  setLoggedin: (isLoggedin: boolean) => void;
};

export const UserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) =>
    set(() => ({
      user,
    })),
  isLoggedin: false,
  setLoggedin: (isLoggedin: boolean) =>
    set(() => ({
      isLoggedin,
    })),
}));
