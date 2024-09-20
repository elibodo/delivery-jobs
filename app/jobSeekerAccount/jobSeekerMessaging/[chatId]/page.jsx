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
      <div className="flex flex-row items-center justify-between p-2 mx-3 border-b-2 border-gray-500">
        <h1 className="font-bold text-2xl">Messaging</h1>
        <Link
          href="/jobSeekerAccount/jobSeekerMessaging"
          className="md:hidden flex black_button"
        >
          View Chats
        </Link>
      </div>
      <div className="flex justify-center md:justify-center gap-5 px-2 md:px-5 py-3">
        <div className="hidden md:w-1/3 md:flex">
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
