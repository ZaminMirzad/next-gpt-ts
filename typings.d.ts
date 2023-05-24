import { ChatCompletionRequestMessage } from "openai";

interface Message {
  text: string | ChatCompletionRequestMessage;
  createdAt: admin.firestore.TimeStamp;
  user: {
    _id: string;
    name: string;
    avatar: string;
  };
}
