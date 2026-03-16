"use client";

import dynamic from "next/dynamic";

// ssr:false is valid here because this is a Client Component
const Reader = dynamic(() => import("./Reader"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-10 h-10 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});

interface ReaderWrapperProps {
  url: string;
  title?: string;
}

export default function ReaderWrapper({ url, title }: ReaderWrapperProps) {
  return <Reader url={url} title={title} />;
}
