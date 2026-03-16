"use client";

import dynamic from "next/dynamic";
import { Manhwa } from "@/lib/utils";
import Link from "next/link";

// ssr:false is valid here because this is a Client Component
const PdfPreview = dynamic(() => import("./PdfPreview"), {
  ssr: false,
  loading: () => (
    <div className="w-[250px] h-[350px] bg-white/5 animate-pulse rounded-lg" />
  ),
});

interface ManhwaGridProps {
  manhwas: Manhwa[];
}

export default function ManhwaGrid({ manhwas }: ManhwaGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {manhwas.map((manhwa) => (
        <Link
          key={manhwa.id}
          href={`/manhwas/read?url=${encodeURIComponent(manhwa.url)}&title=${encodeURIComponent(manhwa.name)}`}
          className="group flex flex-col rounded-xl overflow-hidden bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/60 transition-all duration-200 hover:shadow-lg hover:shadow-purple-900/30 hover:-translate-y-1"
        >
          <div className="overflow-hidden">
            <PdfPreview url={manhwa.url} />
          </div>
          <div className="px-3 py-2">
            <p className="text-sm font-medium text-gray-200 group-hover:text-purple-300 transition-colors line-clamp-2 leading-snug">
              {manhwa.name}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
