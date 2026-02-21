"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { motion } from "motion/react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export default function CallbackPage() {
  const router = useRouter();
  useEffect(() => {
    const handleAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        router.push("/");
      }
    };

    handleAuth();
  }, []);

  return (
    <motion.div
      animate={{
        rotate: [360],
        repeatCount: Infinity,
      }}
      transition={{
        duration: 0.6,
        ease: "easeInOut",
        repeatType: "loop",
      }}
      className="bg-linear-120 from-purple-400 to-red-600 size-10 rounded-full"
    ></motion.div>
  );
}
