"use client";

import { use, useEffect, useState } from "react";
import Gallary from "@/components/Gallary";
import { Videos } from "@/lib/utils";
import { UserStore } from "@/store/userstore";

export default function ResultsClient({
  searchParams,
}: {
  searchParams: Promise<{ search_query?: string }>;
}) {
  const params = use(searchParams);
  const [results, setResults] = useState<Videos[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getResults = async () => {
      if (!params.search_query) return;

      const res = await fetch(
        `/api/search?search_query=${params.search_query}&email=${user?.email}`,
      );
      const data = await res.json();
      console.log(data);
      setResults(data.results || []);
      setIsLoading(false);
    };
    getResults();
  }, [params.search_query]);
  const { user } = UserStore();

  return (
    <div className="ml-20 p-5 flex items-center justify-center h-full">
      {isLoading ? (
        <div>Loading...</div>
      ) : results.length === 0 ? (
        <div>No results found for "{params.search_query}"</div>
      ) : null}
      {results.length > 0 && (
        <Gallary recommendations={results} isGrid={true} />
      )}
    </div>
  );
}
