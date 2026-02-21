"use client";

import { useRef, useState } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";

export default function SearchBox() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [focused, setFocused] = useState(false);
  const router = useRouter();

  const handleSearch = () => {
    const value = inputRef.current?.value.trim();
    if (!value) return;
    router.push(`/results?search_query=${value}`);
  };

  return (
    <div className="flex items-center w-[420px] bg-zinc-900 border border-zinc-800 rounded-full px-3 py-[0.4rem] focus-within:border-purple-600 transition">
      {/* LEFT GROUP (icon + input) */}
      <div className="flex items-center flex-1 gap-1 justify-center overflow-x-hidden">
        <motion.div
          initial={{
            opacity: focused ? 0 : 1,
            translateX: focused ? 0 : -50,
          }}
          animate={{
            opacity: focused ? 1 : 0,
            translateX: focused ? 0 : -50,
          }}
          transition={{ duration: 0.3 }}
        >
          <Search className="w-5 h-5 text-zinc-400" />
        </motion.div>
        <input
          ref={inputRef}
          type="text"
          placeholder="Search"
          className="flex-1 bg-transparent outline-none text-sm text-white placeholder-zinc-400"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
        />
      </div>

      {/* RIGHT BUTTON */}
      <button
        onClick={handleSearch}
        className="p-1.5  rounded-full bg-zinc-800 hover:bg-zinc-700 transition"
      >
        <Search className="w-4 h-4 text-white" />
      </button>
    </div>
  );
}
