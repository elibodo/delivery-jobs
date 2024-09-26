"use client";

import React from "react";
import { useState, useEffect } from "react";
import ChatBox from "./ChatBox";
import { useSession } from "next-auth/react";
import LoadingSpinner from "./LoadingSpinner";
import { pusherClient } from "@lib/pusher";

const ChatList = ({ currentChatId }) => {
  const { data: session } = useSession();
  const currentUser = session?.user;
  const [loading, setLoading] = useState(true);

  const [chats, setChats] = useState([]);
  const [search, setSearch] = useState("");

  const getChats = async () => {
    try {
      const response = await fetch(
        search !== ""
          ? `/api/usersChats/${currentUser.id}/searchChat/${search}`
          : `/api/usersChats/${currentUser.id}`,
      );
      const data = await response.json();
      setChats(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (currentUser) {
      getChats();
    }
  }, [currentUser, search]);

  useEffect(() => {
    if (currentUser) {
      pusherClient.subscribe(currentUser.id);

      const handleChatUpdate = (updatedChat) => {
        setChats((allChats) =>
          allChats.map((chat) => {
            if (chat._id === updatedChat.id) {
              return { ...chat, messages: updatedChat.messages };
            } else {
              return chat;
            }
          }),
        );
      };

      const handleNewChat = (newChat) => {
        setChats((allChats) => [...allChats, newChat]);
      };

      pusherClient.bind("update-chat", handleChatUpdate);
      pusherClient.bind("new-chat", handleNewChat);

      return () => {
        pusherClient.unsubscribe(currentUser.id);
        pusherClient.unbind("update-chat", handleChatUpdate);
        pusherClient.unbind("new-chat", handleNewChat);
      };
    }
  }, [currentUser]);

  return loading ? (
    <LoadingSpinner />
  ) : (
    <div className="flex h-[600px] flex-col gap-5">
      <input
        className="rounded-md border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium"
        placeholder="Search for a chat..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="custom-scrollbar flex flex-1 flex-col overflow-y-scroll">
        {/* {chats?.map((chat, index) => (
          <ChatBox
            chat={chat}
            key={index}
            currentUser={currentUser}
            currentChatId={currentChatId}
          />
        ))} */}
        {chats?.length > 0 ? (
          chats?.map((chat, index) => (
            <ChatBox
              chat={chat}
              key={index}
              currentUser={currentUser}
              currentChatId={currentChatId}
            />
          ))
        ) : (
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-500">No Messages</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatList;
