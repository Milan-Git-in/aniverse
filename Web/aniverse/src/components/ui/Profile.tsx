"use client";
import { XIcon } from "lucide-react";
import Image from "next/image";
import { motion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import { Input } from "./input";
import Otp from "../otp";
import { toast } from "sonner";
import { User, UserStore } from "@/store/userstore";
import { SupabaseClient } from "@supabase/supabase-js";

const Profile = () => {
  const { user, setUser, isLoggedin, setLoggedin } = UserStore();
  const [isOpen, setIsOpen] = useState(false);
  const emailref = useRef<null | HTMLInputElement>(null);
  const buttonref = useRef<null | HTMLButtonElement>(null);
  const AvatarRef = useRef<null | HTMLImageElement>(null);
  const OtpRef = useRef<number>(0);
  const supabase = new SupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_KEY!,
  );
  useEffect(() => {
    fetchUser();
  }, []);

  const handleGoogleLogin = async () => {
    console.log(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    );

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `/auth/callback`,
      },
    });

    if (error) {
      console.error("Google login error:", error.message);
    }
  };
  const fetchUser = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    const headers: Record<string, string> = {};

    if (session?.access_token) {
      headers.Authorization = `Bearer ${session.access_token}`;
    }

    const res = await fetch("/api/user/login", { headers });
    const data: { success: boolean; user: User } = await res.json();
    if (!data.user || !data.success) {
      return toast.error("User not found");
    }
    console.log(data.user);
    if (AvatarRef && AvatarRef.current)
      AvatarRef.current.src = data.user.profile_picture;
    setUser(data.user);
    setLoggedin(true);
  };

  const onVerify = async () => {
    if (
      !emailref.current ||
      emailref.current.value == "" ||
      emailref.current.value == null
    ) {
      return toast.error("Email is required");
    }
    if (!isaValidEmail(emailref.current.value)) {
      return toast.error("Please enter a valid email address");
    }
    const email = emailref.current.value;
    const res = await fetch("/api/user/sendotp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });
    const data = await res.json();
    if (!data.response.success) {
      return toast.error(data.response.message || "Error sending OTP");
    }
    return toast.success("OTP sent to your email");
  };
  const isaValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const login = () => {
    console.log(OtpRef);
    const verifyOtp = async () => {
      if (!OtpRef.current || !emailref.current || !emailref.current.value)
        return toast.error("Please enter the email first");

      const email = emailref.current.value;

      const res = await fetch("/api/user/verifyotp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          otp: OtpRef.current,
        }),
      });
      const data = await res.json();
      console.log(data.response);
      if (data.response.success) {
        await fetchUser();
      }
    };
    verifyOtp();
  };

  return (
    <>
      <div className="flex items-center gap-8">
        <h3
          className="text-lg font-medium cursor-pointer select-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {!isLoggedin && "Login"}
          {/*Login*/}
        </h3>
        <Image
          src={user?.profile_picture || "/Images/default.jpg"}
          alt="User"
          width={40}
          height={40}
          className="rounded-full cursor-pointer"
        />
      </div>
      <motion.div
        initial={{
          scale: 0.75,
          opacity: 0,
        }}
        animate={{
          scale: isOpen ? 1 : 0.75,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{
          duration: 0.35,
          ease: "anticipate",
        }}
        className={`absolute top-[40dvh] left-[30dvw] w-[550px] bg-white/10 border-gray-200 rounded-md shadow-lg p-4 z-50 backdrop-blur-xs`}
      >
        <div className="flex justify-center items-center gap-8 mb-2 relative">
          <Image src="/favicon.ico" alt="Aniverse" width={40} height={60} />
          <h1 className="text-2xl">Aniverse</h1>
          <div className="absolute right-2">
            <XIcon
              className="cursor-pointer"
              onClick={() => setIsOpen(false)}
            />
          </div>
        </div>
        <hr className="my-2 border-gray-300" />
        <div className="flex flex-col justify-center items-center mt-[1rem] font-semibold">
          <div className="flex flex-col gap-1">
            <p>Email</p>
            <div className="flex items-center justify-center">
              <Input
                type="email"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    onVerify();
                  }
                }}
                className="w-[300px] focus-visible:ring-purple-400 focus-visible:ring-1"
                ref={emailref}
              />
              <button
                ref={buttonref}
                className="bg-black/60 text-white font-semibold py-1 px-4 rounded-md ml-2 active:scale-95 transition-all duration-300"
                onClick={onVerify}
              >
                Verify
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-1 mt-4">
            <p className="self-end pr-10">OTP</p>
            <Otp
              onComplete={() => login()}
              onChange={(value) => (OtpRef.current = Number(value))}
            />
          </div>
          <hr className="w-full mt-4" />
          <button
            className="ring-2 ring-neutral-500 bg-white p-1 rounded-full px-5 text-black font-semibold text-lg mt-4 active:scale-95 transtion-all duration-200"
            onClick={handleGoogleLogin}
          >
            <Image
              src={"/Images/google.png"}
              alt="google icon"
              width={25}
              height={25}
              className="inline mr-3"
            />
            Login with Google
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default Profile;
