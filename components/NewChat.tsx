"use client";

import { db } from "@/firebase";
import { PlusIcon } from "@heroicons/react/24/solid";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function NewChat() {
  const router = useRouter();
  const { data: session } = useSession();
  // Create a new chat
  const createNewChate = async () => {
    const doc = await addDoc(
      collection(db, "users", session?.user?.email!, "chats"),
      {
        userId: session?.user?.email,
        createdAt: serverTimestamp(),
      }
    );

    // route
    router.push(`/chat/${doc.id}`);
  };
  return (
    <button
      onClick={createNewChate}
      className="flex items-center chatRow flex-1"
    >
      <PlusIcon className="h-5 w-5 text-blue-500" />
      NewChat
    </button>
  );
}
