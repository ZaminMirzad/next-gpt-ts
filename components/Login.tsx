"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { SiFacebook } from "react-icons/si";

export default function Login() {
  return (
    <div className="flex flex-col space-y-6 h-screen items-center justify-center bg-slate-800 text-slate-100">
      <h1 className="text-6xl mb-10">Login with</h1>
      <div className="flex flex-col space-y-4">
        <button
          onClick={() => signIn("google")}
          className="text-2xl border border-slate-600 rounded px-5 py-2 flex gap-x-3 items-center hover:bg-slate-900/50 transition-all duration-200 ease-out"
        >
          <FcGoogle className="mr-2" />
          Sign in with Google
        </button>
        <button
          onClick={() => signIn("facebook")}
          disabled
          className="text-2xl border border-slate-600 rounded px-5 py-2 flex gap-x-3 items-center hover:bg-slate-900/50 transition-all duration-200 ease-out disabled"
        >
          <SiFacebook className="mr-2  rounded-full " />
          Sign in with Facebook
        </button>
      </div>
    </div>
  );
}
