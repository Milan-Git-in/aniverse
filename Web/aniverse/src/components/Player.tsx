import React from "react";
import Gallary from "./Gallary";

const Player = async ({
  videoId,
  title,
}: {
  videoId: string;
  title: string;
}) => {
  // const response = await fetch(
  //   `${process.env.NEXT_PUBLIC_URL}/api/similar?videoId=${videoId}`,
  // );

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/search?search_query=${encodeURIComponent(title.split(" ")[0])}`,
  );
  const { results } = await response.json();
  console.log(results);
  return (
    <div className="flex flex-row gap-4 ml-20 p-5 overflow-hidden h-[80dvh]">
      <div className="flex-3/4 flex flex-col gap-5">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="w-full h-[70vh] rounded-md"
        />
        <h1 className="text-3xl font-bold">{title}</h1>
      </div>
      {results && (
        <div className="flex-1/3 rounded-md flex flex-col ">
          <h3 className="text-xl font-semibold p-3 ">Similar Videos</h3>

          <div className="flex-1 overflow-y-auto ">
            <Gallary recommendations={results} isGrid={false} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Player;
