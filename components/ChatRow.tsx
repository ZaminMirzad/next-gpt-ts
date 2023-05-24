import { db } from "@/firebase";
import { ChatBubbleLeftIcon, TrashIcon } from "@heroicons/react/24/solid";
import { collection, deleteDoc, doc, orderBy, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";

type Props = {
  id: string;
};

function ChatRow({ id }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();

  const [activeState, setActiveState] = useState(false);
  const [messages] = useCollection(
    collection(db, "users", session?.user?.email!, "chats", id, "messages")
  );

  // Current chat tracker
  useEffect(() => {
    if (!pathname) return;
    setActiveState(pathname.includes(id));
  }, [pathname]);

  // console.log(messages?.docs[messages?.docs.length - 2]?.data());

  // Delete chat fn
  const deletChat = async () => {
    await deleteDoc(doc(db, "users", session?.user?.email!, "chats", id));
    router.replace("/");
  };

  const chatRowText =
    messages?.docs && messages?.docs[messages?.docs.length - 1]?.data();
  return (
    <Link
      href={`/chat/${id}`}
      className={`flex items-center justify-between gap-x-1 p-1 rounded ${
        activeState && "bg-slate-900/40"
      }`}
    >
      <ChatBubbleLeftIcon className="w-5 h-5 text-teal-500" />
      <p className="flex-1 hidden md:inline-flex truncate mr-2">
        {chatRowText?.text?.content || chatRowText?.text || "No chat was made"}
      </p>
      <TrashIcon
        className="w-5 h-5 text-gray-400 hover:text-red-500/70"
        onClick={deletChat}
      />
    </Link>
  );
}

export default ChatRow;
