"use client";

import HomeVideos from "@/components/HomeVideos";
import { useIsMobile } from "@/hooks/use-mobile";

import { redirect } from "next/navigation";
const Page = () => {
  if (useIsMobile() === true) {
    redirect("/mobile");
  }
  return (
    <div className="ml-20 p-5 max-h-[calc(100vh-4rem)] overflow-y-scroll">
      <HomeVideos />
    </div>
  );
};

export default Page;
