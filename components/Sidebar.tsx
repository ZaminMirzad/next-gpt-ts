"use client";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";

import NewChat from "./NewChat";

import { FaSignOutAlt } from "react-icons/fa";
import { useState } from "react";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase";
import ChatRow from "./ChatRow";
import { ImSpinner3 } from "react-icons/im";
import ModelSelection from "./ModelSelection";

export default function Sidebar() {
  const { data: session } = useSession();
  const [isHovered, setIsHovered] = useState(false);

  const [chats, loading, error] = useCollection(
    session &&
      query(
        collection(db, "users", session.user?.email!, "chats"),
        orderBy("createdAt", "asc")
      )
  );
  // console.log(chats);

  return (
    <div className="p-4 flex flex-col  text-slate-100 h-full justify-between">
      <div className="flex-1">
        <div className="flex flex-col">
          {/* create a new chat */}
          <NewChat />
          <div className="hidden md:inline">
            {/* TODO -> select openai model*/}
            <ModelSelection />
          </div>
          {/* TODO -> map throught chat rows */}
          <div className="my-3">
            {chats ? (
              chats?.docs.map((chat) => {
                return <ChatRow key={chat.id} id={chat.id} />;
              })
            ) : (
              <div className="flex items-center justify-center flex-1">
                <ImSpinner3 className="animate-spin" size={26} />
              </div>
            )}
          </div>
        </div>
      </div>
      {/* TODO sign-out */}
      <div className="flex justify-between items-center space-x-8 relative ">
        <button
          onClick={() => signOut()}
          className="group px-5 py-2 border border-slate-800 rounded-lg hovered flex-1 flex items-center gap-x-4"
        >
          <FaSignOutAlt className="-rotate-90 group-hover:animate-pulse transition-all duration-200 ease-in-out " />
          Sign Out
        </button>
        {session && (
          <div
            className="w-10 h-10 rounded-full border overflow-hidden group"
            onMouseEnter={() => setIsHovered(true)}
            // onMouseLeave={() => setIsHovered(false)}
          >
            <img
              src={session.user?.image!}
              alt={session.user?.name!}
              className="w-full object-cover group-hover:opacity-75"
            />
            {isHovered && (
              <div
                className="absolute bottom-12 right-0 bg-slate-600 rounded-lg w-44 px-2 py-2 overflow-hidden overflow-y-auto break-words space-y-2"
                onMouseLeave={() => setIsHovered(false)}
              >
                <p className="text-xs">
                  <strong>Name:</strong> {session?.user?.name}
                </p>
                <p className="text-xs">
                  <strong>Email:</strong> {session?.user?.email}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
