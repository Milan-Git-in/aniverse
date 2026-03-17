import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aniverse | Updates",
  description:
    "Stay up-to-date with the latest anime news, airing schedules, and recent releases. Explore what's new in the anime world and never miss an update on your favorite series.",
};
const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <div className="">{children}</div>;
};

export default layout;
