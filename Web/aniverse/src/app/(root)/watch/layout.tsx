import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aniverse | Play",
  description:
    "Playing anime videos from your favorite channels right here, watch anime, read manga & light novels, anime news, rankings and much more",
};
const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <div>{children}</div>;
};

export default layout;
