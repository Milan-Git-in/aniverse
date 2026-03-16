import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aniverse | Manhwas",
  description:
    "Read Manhwas from your favorite authors and series",
};
const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <div className="">{children}</div>;
};

export default layout;
