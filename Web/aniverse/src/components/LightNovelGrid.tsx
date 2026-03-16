"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { LightNovel } from "@/lib/utils";

// ssr:false is valid here because this is a Client Component
const EpubCoverPreview = dynamic(() => import("./EpubCoverPreview"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[320px] bg-white/5 animate-pulse rounded-t-xl" />
  ),
});

const LightNovelGrid = ({ lightnovels }: { lightnovels: LightNovel[] }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {lightnovels.map((lightnovel) => (
        <Link
          key={lightnovel.id}
          href={`/lightnovels/read?url=${encodeURIComponent(lightnovel.Url)}&title=${encodeURIComponent(lightnovel.Name)}`}
          className="group flex flex-col rounded-xl overflow-hidden bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/60 transition-all duration-200 hover:shadow-lg hover:shadow-purple-900/30 hover:-translate-y-1"
        >
          <div className="overflow-hidden rounded-t-xl">
            <EpubCoverPreview url={lightnovel.Url} />
          </div>
          <div className="px-3 py-2">
            <p className="text-sm font-medium text-gray-200 group-hover:text-purple-300 transition-colors line-clamp-2 leading-snug">
              {lightnovel.Name}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default LightNovelGrid;