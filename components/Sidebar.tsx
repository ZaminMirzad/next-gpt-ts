"use client";
import { signOut } from "next-auth/react";
import NewChat from "./NewChat";

import { FaSignOutAlt } from "react-icons/fa";

export default function Sidebar() {
  return (
    <div className="p-4 flex flex-col  text-slate-100 h-full justify-between">
      <div className="flex-1">
        <div>
          {/* newchat btn */}
          <NewChat />
          <div>{/* model selection*/}</div>
          {/* map throught chat rows */}

          {/* sign-out */}
        </div>
      </div>
      <button
        onClick={() => signOut()}
        className="group px-5 py-2 border border-slate-800 rounded-lg hovered flex items-center gap-x-4"
      >
        <FaSignOutAlt className="-rotate-90 group-hover:animate-pulse transition-all duration-200 ease-in-out " />
        Sign Out
      </button>
    </div>
  );
}
