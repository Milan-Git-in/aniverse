// "use client";
// export const dynamic = "force-dynamic";
// import Gallary from "@/components/Gallary";
// import GradientText from "@/components/GradientText";
// import { Videos } from "@/lib/utils";
// import { motion } from "motion/react";
// import { useSearchParams } from "next/dist/client/components/navigation";
// import React, { useEffect, useState } from "react";

// const ResultsPage = () => {
//   const searchParams = useSearchParams();
//   const [results, setResults] = useState<Videos[]>([]);
//   useEffect(() => {
//     const getResults = async () => {
//       if (!searchParams || searchParams.get("search_query") === "") return;
//       const query = searchParams.get("search_query");
//       if (query) {
//         const data = await fetch(`/search?${query}`);
//         const res = await data.json();
//         setResults(res);
//       }
//     };
//     getResults();
//   }, []);

//   return (
//     <div className="ml-20 p-5 flex items-center justify-center h-full">
//       {results.length > 0 ? (
//         <Gallary recommendations={results} />
//       ) : (
//         <GradientText
//           colors={["#7b00ff,#1e00ff", "#d000ff"]}
//           animationSpeed={8}
//           showBorder={false}
//           className="custom-class text-5xl font-semibold p-2"
//         >
//           No Results found for{" "}
//           {searchParams ? searchParams.get("search_query") : ""}
//         </GradientText>
//       )}
//     </div>
//   );
// };

// export default ResultsPage;
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
