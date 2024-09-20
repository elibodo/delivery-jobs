"use client";

import React from "react";
import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import MessageBox from "./MessageBox";
import LoadingSpinner from "./LoadingSpinner";
import { pusherClient } from "@lib/pusher";

const ChatDetails = ({ chatId }) => {
  const [chat, setChat] = useState({});
  const [otherMember, setOtherMember] = useState([]);
  const [loading, setLoading] = useState(true);

  const { data: session } = useSession();
  const currentUser = session?.user;

  const [text, setText] = useState("");

  const getChatDetails = async () => {
    try {
      const response = await fetch(`/api/chats/${chatId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setChat(data);
      setOtherMember(
        data?.members?.filter((member) => member._id !== currentUser.id)
      );
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (currentUser && chatId) getChatDetails();
  }, [currentUser, chatId]);

  const sendText = async () => {
    try {
      const response = await fetch("/api/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chatId,
          currentUserId: currentUser.id,
          text,
        }),
      });

      if (response.ok) {
        setText("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    pusherClient.subscribe(chatId);

    const handleMessage = async (newMessage) => {
      setChat((prevChat) => {
        return {
          ...prevChat,
          messages: [...prevChat.messages, newMessage],
        };
      });
    };

    pusherClient.bind("new-message", handleMessage);

    return () => {
      pusherClient.unsubscribe(chatId);
      pusherClient.unbind("new-message", handleMessage);
    };
  }, [chatId]);

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [chat?.messages]);

  return loading ? (
    <LoadingSpinner />
  ) : (
    <div className="h-[600px] flex flex-col bg-white rounded-lg">
      {session?.user?.accountType === "Job Seeker" ? (
        <div className="flex items-center px-5 py-2 text-body-bold">
          <div className="h-10 w-10 rounded-full bg-orange-600 flex items-center justify-center text-white font-bold">
            {chat.jobAppliedTo[0].companyName.charAt(0)}
          </div>
          <div className="ml-5">
            <p className="font-semibold text-lg">
              {chat.jobAppliedTo[0].companyName}&#160; &#183; &#160;
              <span className="text-base font-medium">
                {otherMember[0].name}
              </span>
            </p>
            <p className="text-sm text-gray-600">
              {chat.jobAppliedTo[0].title}
            </p>
          </div>
        </div>
      ) : (
        <div className="flex items-center px-5 py-2 text-body-bold">
          <div className="h-10 w-10 rounded-full bg-orange-600 flex items-center justify-center text-white font-bold">
            {otherMember[0].name.charAt(0)}
          </div>
          <div className="ml-5">
            <p className="font-semibold text-lg">{otherMember[0].name}</p>
            <p className="text-sm text-gray-600">
              {chat.jobAppliedTo[0].title}
            </p>
          </div>
        </div>
      )}
      <div className="flex-1 flex flex-col gap-5 p-4 overflow-y-scroll bg-gray-100">
        {chat?.messages?.map((message, index) => (
          <MessageBox key={index} message={message} currentUser={currentUser} />
        ))}
        <div ref={bottomRef} />
      </div>
      <div className="w-full flex items-center justify-between px-7 py-2 rounded-3xl cursor-pointer">
        <div className="flex items-center gap-4 w-full">
          <input
            type="text"
            placeholder="Write a message..."
            className="text-sm font-medium w-full mr-7 p-2 outline-none"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
        </div>
        <div
          onClick={sendText}
          className="bg-orange-600 text-white hover:bg-white hover:text-orange-600 transition-all duration-200 rounded-full h-10 w-10 flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentcolor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ChatDetails;
