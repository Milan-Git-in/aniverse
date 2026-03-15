import Player from "@/components/Player";
import React from "react";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ v?: string; title?: string }>;
}) => {
  const { v: videoId, title: videoTitle } = await searchParams;
  return <Player videoId={videoId || ""} title={videoTitle || ""} />;
};
export default page;
