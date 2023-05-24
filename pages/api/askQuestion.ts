import query from "@/lib/queryApi";
import { NextApiRequest, NextApiResponse } from "next";
import admin from "firebase-admin";
import { adminDb } from "@/firebaseAdmin";
import { Message } from "@/typings";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { prompt, chatId, model, session } = await req.body;

  if (!prompt) {
    res.status(400).json({ answer: "Please provide a prompt!" });
    return;
  }
  if (!chatId) {
    res.status(400).json({ answer: "Please provide the chatId!" });
    return;
  }

  //   GPT query
  const response = await query(prompt, chatId, model);
  const message: Message = {
    text: response || "chatGPT was unable to find an answer for your prompt",
    createdAt: admin.firestore.Timestamp.now(),
    user: {
      _id: "ChatGPT",
      name: "ChatGPT",
      avatar: `https://ui-avatars.com/api/?name=${session?.user?.name}`,
    },
  };

  await adminDb
    .collection("users")
    .doc(session?.user?.email)
    .collection("chats")
    .doc(chatId)
    .collection("messages")
    .add(message);

  res.status(200).json({ answer: message.text });
}
