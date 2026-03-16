import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aniverse | Light Novels",
  description:
    "Read light novels from your favorite authors and series",
};
const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <div className="ml-20">{children}</div>;
};

export default layout;
