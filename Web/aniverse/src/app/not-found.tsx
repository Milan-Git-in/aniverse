import Image from "next/image";
import React from "react";
import Shadow from "../../public/Images/Shadow.png";
export default function NotFoundPage() {
  return (
    <>
      <Image
        src={Shadow}
        alt="Shadow"
        className="fixed bottom-0 left-40 w-[300px]  z-0"
        priority
      />
      <div className="self-center h-screen w-screen  flex flex-col items-center justify-center text-center gap-4 px-4">
        <h1 className="text-6xl font-extrabold text-white">404</h1>

        <h2 className="text-2xl font-semibold text-purple-300">
          Wrong place. Big mistake.
        </h2>

        <p className="text-md text-gray-200 max-w-md">
          This page doesn’t exist. It was wiped. Clean.
        </p>

        <a
          href="/"
          className="flex gap-6 text-sm font-medium text-white hover:text-purple-600 transition duration-500"
        >
          <span>STEP BACK</span>
        </a>
      </div>
    </>
  );
}
