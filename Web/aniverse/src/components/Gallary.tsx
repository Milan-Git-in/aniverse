import { Videos } from "@/lib/utils";
import Link from "next/link";

const Gallary = ({
  recommendations,
  isGrid,
}: {
  recommendations: Videos[];
  isGrid: boolean;
}) => {
  return (
    <div className={isGrid ? "grid grid-cols-3 gap-5" : "flex flex-col gap-5"}>
      {recommendations.map(
        (video, i) => (
          console.log(video),
          (
            <div key={i} className="flex flex-col items-start">
              <Link href={`/watch?v=${video.videoId}+&title=${video.title}`}>
                <img
                  src={`https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`}
                  title={video.title}
                  // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  // allowFullScreen
                  className="rounded-xl w-full h-[250px]"
                />
                <h4 className="text-md font-semibold pl-5">
                  {video.title.slice(0, 40)}....
                </h4>
              </Link>
            </div>
          )
        ),
      )}
    </div>
  );
};

export default Gallary;
