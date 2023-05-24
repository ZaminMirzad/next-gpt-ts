"use client";

import { db } from "@/firebase";
import { Message } from "@/typings";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import React, { FormEvent, useState } from "react";
import toast from "react-hot-toast";

type Props = {
  chatId: string;
};
function ChatInput({ chatId }: Props) {
  const [prompt, setPrompt] = useState("");
  const { data: session } = useSession();

  // TODO: useSWR to select model
  const model = "davinci";

  // fns
  const generateResponse = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt) return;

    const input = prompt.trim();
    setPrompt("");

    const message: Message = {
      text: input,
      createdAt: serverTimestamp(),
      user: {
        _id: session?.user?.email!,
        name: session?.user?.name!,
        avatar:
          session?.user?.image ||
          `https://ui-avatars.com/api/?name=${session?.user?.name}`,
      },
    };

    await addDoc(
      collection(
        db,
        "users",
        session?.user?.email!,
        "chats",
        chatId,
        "messages"
      ),
      message
    );

    // TOAST notification loading...

    const notification = toast.loading("GPT is doing the job...");

    await fetch("/api/askQuestion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: input,
        chatId,
        model,
        session,
      }),
    }).then(() => {
      // TODO: TOAST success
      toast.success("GPT found the answer", {
        id: notification,
      });
    });
  };
  return (
    <div>
      <form
        onSubmit={generateResponse}
        className=" px-0 space-x-5 flex items-center bg-slate-700 rounded-full"
      >
        <input
          type="text"
          className="pl-4 py-3 outline-none placeholder:text-sm flex-1 bg-transparent disabled:cursor-not-allowed"
          placeholder="Type your message here"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button
          type="submit"
          disabled={!prompt}
          className=" bg-teal-600 px-6 py-2 h-full rounded-r-full disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          <PaperAirplaneIcon className="w-8 h-8 -rotate-45" />
        </button>
      </form>
    </div>
  );
}

export default ChatInput;
