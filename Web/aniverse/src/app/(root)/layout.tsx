import type { Metadata } from "next";
import Profile from "@/components/ui/Profile";
import SearchBox from "@/components/ui/SearchBox";
import { AppSidebar } from "@/components/AppSidebar";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Aniverse | Home",
  description:
    "Binge Youtube Videos from your favorite channels right here, watch anime, read manga & light novels, anime news, rankings and much more",
};

export default function pageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen text-secondary border-l-4 border-purple-500">
      <div className=" h-[4rem] w-screen px-5 flex justify-between items-center">
        <Link
          href="/"
          className="flex items-center text-3xl font-semibold gap-3"
        >
          <Image src="/favicon.ico" alt="Aniverse" width={40} height={60} />
          <h1>Aniverse</h1>
        </Link>
        <SearchBox />
        <Profile />
      </div>
      <AppSidebar />
      {children}
    </div>
  );
}
