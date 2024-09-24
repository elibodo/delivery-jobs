"use client";

import React from "react";
import ChatDetails from "@components/ChatDetails";
import ChatList from "@components/ChatList";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

const ChatPage = () => {
  const { chatId } = useParams();
  const { data: session } = useSession();
  const currentUser = session?.user;

  const seenMessages = async () => {
    try {
      await fetch(`/api/chats/${chatId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentUserId: currentUser.id,
        }),
      });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (currentUser && chatId) seenMessages();
  }, [currentUser, chatId]);

  return (
    <div>
      <div className="mx-3 flex flex-row items-center justify-between border-b-2 border-gray-500 p-2">
        <h1 className="text-2xl font-bold">Messaging</h1>
        <Link
          href="/employerAccount/employerMessaging"
          className="black_button flex md:hidden"
        >
          View Chats
        </Link>
      </div>
      <div className="flex justify-center gap-5 px-2 py-3 md:justify-center md:px-5">
        <div className="hidden md:flex md:w-1/3">
          <ChatList currentChatId={chatId} />
        </div>
        <div className="md:w-2/3">
          <ChatDetails chatId={chatId} />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
