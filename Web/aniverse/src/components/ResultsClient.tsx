"use client";

import { use, useEffect, useState } from "react";
import Gallary from "@/components/Gallary";
import GradientText from "@/components/GradientText";
import { Videos } from "@/lib/utils";

export default function ResultsClient({
  searchParams,
}: {
  searchParams: Promise<{ search_query?: string }>;
}) {
  const params = use(searchParams);
  const [results, setResults] = useState<Videos[]>([]);

  useEffect(() => {
    const getResults = async () => {
      if (!params.search_query) return;

      const res = await fetch(`/search?search_query=${params.search_query}`);
      const data = await res.json();
      setResults(data);
    };

    getResults();
  }, [params.search_query]);

  return (
    <div className="ml-20 p-5 flex items-center justify-center h-full">
      {results.length > 0 ? (
        <Gallary recommendations={results} />
      ) : (
        <GradientText
          colors={["#7b00ff,#1e00ff", "#d000ff"]}
          animationSpeed={8}
          showBorder={false}
          className="text-5xl font-semibold p-2"
        >
          No Results found for {params.search_query}
        </GradientText>
      )}
    </div>
  );
}
