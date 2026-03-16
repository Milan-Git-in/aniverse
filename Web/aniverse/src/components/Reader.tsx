"use client";

import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface ReaderProps {
  url: string;
  title?: string;
}

export default function Reader({ url, title }: ReaderProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [scale, setScale] = useState<number>(1.0);
  const [loading, setLoading] = useState(true);

  const handleLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setLoading(false);
  };

  const zoomIn = () => setScale((s) => Math.min(s + 0.2, 3.0));
  const zoomOut = () => setScale((s) => Math.max(s - 0.2, 0.4));
  const resetZoom = () => setScale(1.0);

  return (
    <div className="flex flex-col h-full min-h-screen bg-[#0f0f0f] text-white">
      {/* Toolbar */}
      <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-3 bg-[#1a1a1a] border-b border-white/10 shadow-lg">
        <p className="text-sm font-medium text-purple-300 truncate max-w-xs">
          {title ?? "Reader"}
        </p>

        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-400">{numPages} pages</span>
          <div className="flex items-center gap-1 bg-white/5 rounded-lg px-2 py-1">
            <button
              onClick={zoomOut}
              className="w-7 h-7 flex items-center justify-center rounded hover:bg-white/10 transition-colors text-lg font-bold"
              aria-label="Zoom out"
            >
              −
            </button>
            <button
              onClick={resetZoom}
              className="text-xs w-14 text-center hover:text-purple-300 transition-colors"
            >
              {Math.round(scale * 100)}%
            </button>
            <button
              onClick={zoomIn}
              className="w-7 h-7 flex items-center justify-center rounded hover:bg-white/10 transition-colors text-lg font-bold"
              aria-label="Zoom in"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* PDF Content */}
      <div className="flex-1 overflow-y-auto flex flex-col items-center py-8 gap-4 px-4">
        {loading && (
          <div className="flex flex-col items-center gap-4 pt-20 text-gray-400">
            <div className="w-10 h-10 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm">Loading PDF…</p>
          </div>
        )}

        <Document
          file={url}
          onLoadSuccess={handleLoadSuccess}
          onLoadError={() => setLoading(false)}
          loading={null}
        >
          {Array.from({ length: numPages }, (_, i) => (
            <div
              key={i + 1}
              className="shadow-xl rounded-sm overflow-hidden mb-4"
            >
              <Page
                pageNumber={i + 1}
                scale={scale}
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
            </div>
          ))}
        </Document>
      </div>
    </div>
  );
}
