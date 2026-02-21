"use client";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import Link from "next/link";
import React, { useState } from "react";

const Page = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  React.useEffect(() => {
    setIsLoaded(true);
  }, []);
  return (
    <div
      className={`text-white font-semibold text-3xl w-[100dvw] max-h-[100dvh] overflow-hidden text-center flex items-center justify-center border-2 relative ${!isLoaded && "blur-2xl"}`}
    >
      <h1>
        Use <p className="m-0 p-0 inline font-bold text-red-700">Aniverse</p>{" "}
        App for better experience
        <hr className="my-4" />
        <div className="text-lg bg-linear-90 from-yellow-500 to-red-600 bg-clip-text flex gap-3 flex-col">
          In Web? Increase Window width & click below !
          <Link href="/">
            <Button className="bg-linear-140 text-white/80 text-md font-semibold from-yellow-500 to-red-600 w-[80vw]">
              Refresh
            </Button>
          </Link>
        </div>
      </h1>
      <motion.div
        className="w-[100%] h-[150%] bg-white absolute rotate-331 bottom-2 translate-x-[31%] backdrop-blur-md"
        whileInView={{
          y: "+90%",
          opacity: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],

          //   opacity: [1, 0],
        }}
        transition={{
          duration: 1,
        }}
      />
      <motion.div
        className="w-[100%] h-[150%] bg-black absolute rotate-331 top-2 translate-x-[-31%] backdrop-blur-md"
        whileInView={{
          y: "-100%",
          opacity: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        }}
        transition={{
          duration: 1,
        }}
      />
    </div>
  );
};

export default Page;
