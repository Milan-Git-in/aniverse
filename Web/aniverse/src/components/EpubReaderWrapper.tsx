"use client";

import dynamic from "next/dynamic";

const EpubReader = dynamic(() => import("./EpubReader"), {
  ssr: false,
  loading: () => (
    <div className="flex absolute items-center justify-center min-h-screen">
      <div className="w-10 h-10 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});

interface EpubReaderWrapperProps {
  url: string;
  title?: string;
}

export default function EpubReaderWrapper({
  url,
  title,
}: EpubReaderWrapperProps) {
  return <EpubReader url={url} title={title} />;
}
