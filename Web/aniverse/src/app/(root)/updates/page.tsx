"use client";
import { Selector } from "@/components/Selector";
import { AiringSchedule, MediaItem, News } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const page = () => {
  const [position, setPosition] = useState(1);
  const [news, setNews] = useState<News>();
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/updates`);
      const result: News = await data.json();
      console.log("NEWS =========== \n ", result);
      setNews(result);
    };
    fetchData();
  }, []);

  return (
    <div className="ml-20 p-5">
      <Selector position={position} setPosition={setPosition} />
      <div className="mt-5">
        {position === 1 ? (
          <div className="flex flex-col gap-3">
            <h2>Airing Today</h2>
            <div
              className="grid grid-cols-4 gap-4 h-screen overflow-y-scroll"
              style={{
                scrollbarWidth: "none",
              }}
            >
              {news?.data.airingToday.airingSchedules.map(
                (schedule: AiringSchedule, index: number) => (
                  <div key={index} className="p-4 rounded">
                    <Image
                      src={schedule.media.coverImage.large}
                      alt={schedule.media.title.english || "Anime Cover"}
                      width={200}
                      height={300}
                      className="w-full rounded-lg"
                    />

                    <h4 className="text-xl">{schedule.media.title.english}</h4>
                    <h4 className="text-lg text-gray-400">
                      Episode: {schedule.episode}
                    </h4>
                    <h4 className="text-lg text-gray-400">
                      Airing At:
                      {new Date(schedule.airingAt * 1000).toLocaleString()}
                    </h4>
                    <Link
                      href={schedule.media.siteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Details
                    </Link>
                  </div>
                ),
              )}
            </div>
          </div>
        ) : (
          <div>
            <h2>Recent Activity</h2>
            <div className="grid grid-cols-4 gap-4 h-screen overflow-y-scroll">
              {news?.data.recent.media.map((activity: MediaItem, index) => (
                <div key={index} className="p-4 rounded ">
                  <Image
                    src={activity.coverImage.large}
                    alt={activity.title.english || "Anime Cover"}
                    width={200}
                    height={300}
                    className="w-full rounded-lg"
                  />
                  <h4 className="text-xl">
                    {activity.title.english || activity.title.romaji}
                  </h4>
                  <p>Since {activity.startDate.year}</p>
                  <Link
                    href={activity.siteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
