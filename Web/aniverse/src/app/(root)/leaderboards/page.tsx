import { LeaderBoardCard } from "@/lib/utils";
import Image from "next/image";

const page = async () => {
  const data = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/leaderboards`);
  const result = await data.json();
  const leaderboards = result.data.Page.media;
  return (
    <div className="ml-20 p-5 grid grid-cols-4 gap-3 h-[90dvh] overflow-y-scroll">
      {leaderboards
        .sort(
          (a: LeaderBoardCard, b: LeaderBoardCard) =>
            b.popularity - a.popularity,
        )
        .map((card: LeaderBoardCard) => {
          return (
            <div className="flex flex-col" key={card.title.english}>
              <Image
                src={card.coverImage.large}
                alt={card.title.english}
                width={300}
                height={400}
                className="rounded-lg"
              />
              <h3 className="text-xl font-bold mt-2">{card.title.english}</h3>
              <p className="text-gray-500">Popularity: {card.popularity}</p>
            </div>
          );
        })}
    </div>
  );
};

export default page;

/*

{
                    "title": {
                        "english": "ONE PIECE"
                    },
                    "popularity": 607917,
                    "coverImage": {
                        "large": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx21-ELSYx3yMPcKM.jpg"
                    }
                },
*/
