import { DocumentData } from "firebase/firestore";
import { ChatCompletionResponseMessage } from "openai";
import React from "react";

function Message({ message }: DocumentData) {
  return (
    <div className="py-5">
      <div className="flex items-start space-x-5 px-10 max-w-2xl mx-auto">
        <img
          src={message.user.avatar}
          alt={message.user.name}
          className="w-10"
        />
        <p className="pt-1 text-sm">{message.text.content || message.text} </p>
      </div>
    </div>
  );
}

export default Message;
