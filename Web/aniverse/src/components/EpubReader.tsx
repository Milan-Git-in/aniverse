"use client";

import { useEffect, useRef, useState } from "react";
import ePub from "epubjs";

interface EpubReaderProps {
  url: string;
  title?: string;
}

export default function EpubReader({ url, title }: EpubReaderProps) {
  const viewerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renditionRef = useRef<any>(null);
  const [status, setStatus] = useState<"fetching" | "rendering" | "ready" | "error">("fetching");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const el = viewerRef.current;
    if (!el) return;

    let cancelled = false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let book: any = null;

    (async () => {
      try {
        // Step 1: fetch the epub ourselves so epubjs never has to deal with
        // Supabase signed URL quirks / CORS token handling
        setStatus("fetching");
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status} — could not download epub`);
        const buffer = await res.arrayBuffer();
        if (cancelled) return;

        // Step 2: open from binary
        setStatus("rendering");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        book = ePub(buffer as any);

        // Wait until epub metadata is parsed
        await book.ready;
        if (cancelled) return;

        // Step 3: render — use measured pixel dimensions, never percentages
        const W = el.clientWidth || window.innerWidth;
        const H = el.clientHeight || window.innerHeight - 56;

        const rendition = book.renderTo(el, {
          width: W,
          height: H,
          flow: "paginated",
          spread: "none",
          manager: "default",
        });
        renditionRef.current = rendition;

        await rendition.display();
        if (!cancelled) setStatus("ready");
      } catch (err) {
        if (!cancelled) {
          setErrorMsg(err instanceof Error ? err.message : "Unknown error");
          setStatus("error");
        }
      }
    })();

    // Keyboard navigation
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") renditionRef.current?.next();
      if (e.key === "ArrowLeft"  || e.key === "ArrowUp")   renditionRef.current?.prev();
    };
    window.addEventListener("keydown", handleKey);

    // Resize: re-measure and resize rendition
    const handleResize = () => {
      if (!el) return;
      renditionRef.current?.resize(
        el.clientWidth || window.innerWidth,
        el.clientHeight || window.innerHeight - 56,
      );
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelled = true;
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("resize", handleResize);
      book?.destroy?.();
    };
  }, [url]);

  const prev = () => renditionRef.current?.prev();
  const next = () => renditionRef.current?.next();

  return (
    <div className="flex  w-[95dvw] flex-col h-[90dvh] bg-[#0f0f0f] text-white overflow-hidden">
      {/* Toolbar */}
      <div className="shrink-0 h-14 flex items-center justify-between px-6 py-3 bg-[#1a1a1a] border-b border-white/10 shadow-lg">
        <p className="text-sm font-medium text-purple-300 truncate max-w-xs">
          {title ?? "Reader"}
        </p>
        {status === "ready" && (
          <div className="flex items-center gap-2">
            <button
              onClick={prev}
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-sm transition-colors select-none"
            >
              ← Prev
            </button>
            <button
              onClick={next}
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-sm transition-colors select-none"
            >
              Next →
            </button>
          </div>
        )}
      </div>

      {/* Viewport */}
      <div className="relative flex-1 overflow-hidden">
        {/* Overlays */}
        {(status === "fetching" || status === "rendering") && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#0f0f0f]">
            <div className="w-10 h-10 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mb-3" />
            <p className="text-sm text-gray-400">
              {status === "fetching" ? "Downloading epub…" : "Rendering pages…"}
            </p>
          </div>
        )}
        {status === "error" && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#0f0f0f] gap-2">
            <p className="text-red-400 text-sm text-center max-w-sm">{errorMsg}</p>
          </div>
        )}

        {/* epubjs renders into this div */}
        <div
          ref={viewerRef}
          className="w-full h-full"
          style={{ background: "#ffffff" }}
        />
      </div>
    </div>
  );
}
