"use client";
import React, { use } from "react";
import { useEffect, useState } from "react";
import { Message } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import { UserStore } from "@/store/userstore";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import GradientText from "@/components/GradientText";

const page = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isloading, setIsloading] = useState(true);
  const [text, setText] = useState("");
  const { user } = UserStore();

  useEffect(() => {
    const loadmessages = async () => {
      const { data, error } = await supabase
        .from("chat")
        .select("*")
        .order("created_at", { ascending: true });
      if (error) {
        console.log(error);
      }

      if (data) {
        setMessages(data);
        setIsloading(false);
      }
    };
    loadmessages();
    const channel = supabase
      .channel("public:chat")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "chat" },
        (payload) => {
          setMessages((prev) => [...prev, payload.new as Message]);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);
  const sendMessage = async () => {
    if (text.trim() === "") return;
    const { data, error } = await supabase
      .from("chat")
      .insert({
        username: user?.username || "Guest",
        message: text,
        from: user?.email || "Guest",
        profile_picture: user?.profile_picture || "",
      })
      .select()
      .single();
    setText("");
    if (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isloading ? (
        <h1 className="ml-20 w-full h-[70dvh]  p-5  rounded-md flex items-center justify-center">
          <GradientText className="text-6xl ">Loading...</GradientText>
        </h1>
      ) : (
        <>
          <div
            className="ml-20 p-5 w-full h-[80dvh] flex flex-col gap-5 overflow-scroll scrollbar-hide"
            style={{
              scrollbarWidth: "none",
            }}
          >
            <h1 className="text-3xl font-bold">Global Chat</h1>
            <div className="p-5 flex flex-col gap-5">
              {messages.map((message, i) => (
                <div className="flex flex-row" key={i}>
                  <Image
                    src={message.profile_picture || "/images/default.jpg"}
                    alt={message.username}
                    width={60}
                    height={60}
                    className="rounded-full mr-3"
                  />
                  <div className="flex flex-col gap-2">
                    <p className="font-bold">{message.username}</p>
                    <p>{message.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className=" ml-20 flex justify-self-center self-center justify-between w-[80dvw] border  rounded-full  border-gray-300 p-3">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type your message..."
              className="bg-transparent focus:outline-none w-full px-4"
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
            />
            <ArrowRight onClick={() => sendMessage()} />
          </div>
        </>
      )}
    </>
  );
};
export default page;
