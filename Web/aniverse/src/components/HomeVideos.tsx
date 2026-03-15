"use client";
import { Videos } from "@/lib/utils";
import { UserStore } from "@/store/userstore";
import React, { useEffect, useState } from "react";
import Gallary from "./Gallary";

const HomeVideos = () => {
  const { user, isLoggedin } = UserStore();
  const [recommendations, setRecommendations] = useState<Videos[]>([]);
  const getRecommendations = async () => {
    try {
      const response = await fetch(`api/homepage`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ email: user?.email }),
      });
      const data: {
        results: Videos[];
      } = await response.json();
      console.log(data);
      setRecommendations(data.results);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getRecommendations();
  }, [isLoggedin]);

  return <Gallary recommendations={recommendations} isGrid={true} />;
};

export default HomeVideos;
