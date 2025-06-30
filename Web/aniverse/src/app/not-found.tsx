import React from "react";
export default function NotFoundPage() {
  return (
    <div
      className="self-center h-[90dvh] w-screen
       flex flex-col gap-y-10 items-center justify-center"
    >
      <h1 className="primary">404 - Page Not Found</h1>
      <a href="/" className="secondary flex gap-1">
        <p className="underline">Go back</p>
        <p className="text-purple-400 ">home</p>
      </a>
    </div>
  );
}
