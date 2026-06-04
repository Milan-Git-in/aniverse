import { Suspense } from "react";
import ResultsClient from "@/components/ResultsClient";

export default function Page({
  searchParams,
}: {
  searchParams: Promise<{ search_query?: string }>;
}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultsClient searchParams={searchParams} />
    </Suspense>
  );
}
