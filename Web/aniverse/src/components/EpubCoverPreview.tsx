"use client";

import { useEffect, useState } from "react";
import ePub from "epubjs";

interface EpubCoverPreviewProps {
  url: string;
}

/**
 * Tries two strategies to extract a cover image from an epub, both bypassing
 * book.coverUrl() which relies on epubjs's CSS / resources sub-systems that
 * silently crash for non-standard epubs (Solo Leveling, some Classroom files).
 *
 * Strategy 1 – book.loaded.cover  (low-level, skips CSS pipeline)
 * Strategy 2 – direct manifest inspection for "cover-image" property / id
 */
async function extractCoverBlobUrl(book: any): Promise<string | null> {
  const archive = book.archive;

  // ── Strategy 1: book.loaded.cover ────────────────────────────────────────
  try {
    const coverPath: string | undefined = await Promise.race([
      book.loaded.cover,
      new Promise<undefined>((_, reject) =>
        setTimeout(() => reject(new Error("timeout")), 5000),
      ),
    ]);

    if (coverPath && archive) {
      const blobUrl: string = await archive.createUrl(coverPath, {
        base64: false,
      });
      if (blobUrl) return blobUrl;
    }
  } catch {
    // strategy 1 failed — fall through
  }

  // ── Strategy 2: direct manifest inspection ───────────────────────────────
  try {
    const manifest: Record<string, any> =
      book.packaging?.manifest ?? {};

    // 2a. metadata.cover ID
    const coverId: string | undefined = book.packaging?.metadata?.cover;
    if (coverId && manifest[coverId]?.href && archive) {
      const blobUrl: string = await archive.createUrl(
        manifest[coverId].href,
        { base64: false },
      );
      if (blobUrl) return blobUrl;
    }

    // 2b. item with properties="cover-image"
    for (const item of Object.values(manifest)) {
      const props: string = item?.properties ?? "";
      const id: string = item?.id ?? "";
      if (
        (props.includes("cover-image") || id === "cover-image") &&
        item?.href &&
        archive
      ) {
        const blobUrl: string = await archive.createUrl(item.href, {
          base64: false,
        });
        if (blobUrl) return blobUrl;
      }
    }
  } catch {
    // strategy 2 failed — fall through
  }

  return null;
}

export default function EpubCoverPreview({ url }: EpubCoverPreviewProps) {
  const [coverSrc, setCoverSrc] = useState<string | null>(null);
  const [state, setState] = useState<"loading" | "cover" | "error">("loading");

  useEffect(() => {
    let cancelled = false;

    // Hard timeout — covers that can't be extracted should fail fast
    const timeout = setTimeout(() => {
      if (!cancelled) setState("error");
    }, 12000);

    (async () => {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const buffer = await res.arrayBuffer();
        if (cancelled) return;

        const book = ePub(buffer as any);

        // Only wait for the book to open (OPF parsed), NOT for full book.ready
        // which triggers the CSS/resource pipeline that crashes bad epubs.
        await (book as any).opened;
        if (cancelled) { book.destroy?.(); return; }

        const blobUrl = await extractCoverBlobUrl(book);
        book.destroy?.();
        if (cancelled) return;

        clearTimeout(timeout);

        if (blobUrl) {
          setCoverSrc(blobUrl);
          setState("cover");
        } else {
          setState("error");
        }
      } catch {
        if (!cancelled) {
          clearTimeout(timeout);
          setState("error");
        }
      }
    })();

    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, [url]);

  if (state === "loading") {
    return (
      <div className="w-full h-[320px] bg-white/5 animate-pulse rounded-t-xl" />
    );
  }

  if (state === "cover" && coverSrc) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={coverSrc}
        alt="Cover"
        className="w-full h-[320px] object-cover"
      />
    );
  }

  // Gradient fallback for truly uncoverable epubs
  return (
    <div className="w-full h-[320px] flex flex-col justify-end bg-gradient-to-br from-violet-900 via-purple-800 to-indigo-900 rounded-t-xl p-4">
      <div className="w-full bg-black/40 backdrop-blur-sm rounded-lg px-3 py-2">
        <p className="text-xs text-white/70 font-semibold uppercase tracking-widest">
          Light Novel
        </p>
      </div>
    </div>
  );
}
