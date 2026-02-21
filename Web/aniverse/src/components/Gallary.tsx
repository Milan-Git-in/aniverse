import { Videos } from "@/lib/utils";

const Gallary = ({ recommendations }: { recommendations: Videos[] }) => {
  return (
    <div className="grid grid-cols-3 gap-5">
      {recommendations.map((video, i) => (
        <div key={i} className="flex flex-col items-start">
          <iframe
            src={video.url}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="rounded-xl w-full h-[200px]"
          ></iframe>
          <h4 className="text-md font-semibold pl-5">
            {video.title.slice(0, 40)}....
          </h4>
        </div>
      ))}
    </div>
  );
};

export default Gallary;
