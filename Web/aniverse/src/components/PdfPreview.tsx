"use client";

import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PdfPreviewProps {
  url: string;
}

export default function PdfPreview({ url }: PdfPreviewProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className="w-[250px] h-[350px] flex items-center justify-center bg-white/5 rounded-lg text-sm text-gray-400">
        Preview unavailable
      </div>
    );
  }

  return (
    <div className="relative w-[250px] overflow-hidden rounded-lg">
      {loading && (
        <div className="absolute inset-0 w-[250px] h-[350px] bg-white/5 animate-pulse rounded-lg" />
      )}
      <Document
        file={url}
        onLoadSuccess={() => setLoading(false)}
        onLoadError={() => {
          setLoading(false);
          setError(true);
        }}
        loading={null}
      >
        <Page
          pageNumber={1}
          width={250}
          renderTextLayer={false}
          renderAnnotationLayer={false}
        />
      </Document>
    </div>
  );
}
