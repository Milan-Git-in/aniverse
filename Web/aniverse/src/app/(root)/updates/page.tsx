"use client";
import Updates from "@/components/Updates";
import { News } from "@/lib/utils";

const page = async () => {
  const data = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/updates`, {
    next: {
      revalidate: 2 * 60 * 60, // Revalidate every 2 hours
    },
  });
  const result: News = await data.json();

  return <Updates news={result} />;
};

export default page;
