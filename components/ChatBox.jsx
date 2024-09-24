import React from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const ChatBox = ({ chat, currentUser, currentChatId }) => {
  const lastMessage =
    chat?.messages?.length > 0 && chat?.messages[chat?.messages.length - 1];
  const seen = lastMessage?.seenBy?.find(
    (member) => member._id === currentUser.id,
  );
  const otherMember = chat?.members?.filter(
    (member) => member._id !== currentUser.id,
  );
  const { data: session } = useSession();

  const router = useRouter();

  let destination = "";
  switch (session?.user?.accountType) {
    case "Job Seeker":
      destination = `/jobSeekerAccount/jobSeekerMessaging/${chat._id}`;
      break;
    case "Employer":
      destination = `/employerAccount/employerMessaging/${chat._id}`;
      break;
    default:
      destination = "/";
      break;
  }

  return (
    <div
      className={`mb-2 flex h-auto w-[300px] cursor-pointer items-start justify-between rounded-2xl border-2 p-2 hover:bg-gray-200 ${
        chat._id === currentChatId ? "border-gray-300 bg-gray-300" : ""
      }`}
      onClick={() => router.push(destination)}
    >
      <div className="flex gap-3">
        <div className="flex flex-col gap-1">
          <p className="w-[200px] truncate text-base font-bold">
            {otherMember[0]?.name}
          </p>
          {chat.jobAppliedTo.map((job) => (
            <p
              key={job._id}
              className="w-[200px] truncate text-sm font-semibold"
            >
              {job.title}
            </p>
          ))}
          {!lastMessage && (
            <p className="w-[200px] truncate text-sm font-semibold">
              Send a message!
            </p>
          )}

          <p
            className={`w-[200px] truncate ${
              seen
                ? "text-sm font-medium text-gray-500"
                : "text-sm font-semibold"
            }`}
          >
            {lastMessage?.text}
          </p>
        </div>
      </div>
      <div>
        <p className="text-xs text-gray-600">
          {!lastMessage
            ? new Date(chat?.createdAt).toLocaleDateString()
            : new Date(chat?.lastMessageAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default ChatBox;
