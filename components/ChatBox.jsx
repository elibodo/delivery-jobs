import React from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const ChatBox = ({ chat, currentUser, currentChatId }) => {
  const lastMessage =
    chat?.messages?.length > 0 && chat?.messages[chat?.messages.length - 1];
  const seen = lastMessage?.seenBy?.find(
    (member) => member._id === currentUser.id
  );
  const otherMember = chat?.members?.filter(
    (member) => member._id !== currentUser.id
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
      className={`mb-2 w-[300px] h-auto border-2 flex items-start justify-between p-2 rounded-2xl cursor-pointer hover:bg-gray-200 ${
        chat._id === currentChatId ? "bg-gray-300 border-gray-300" : ""
      }`}
      onClick={() => router.push(destination)}
    >
      <div className="flex gap-3">
        <div className="flex flex-col gap-1">
          <p className="text-base font-bold w-[200px] truncate">
            {otherMember[0]?.name}
          </p>
          {chat.jobAppliedTo.map((job) => (
            <p
              key={job._id}
              className="text-sm font-semibold w-[200px] truncate"
            >
              {job.title}
            </p>
          ))}
          {!lastMessage && (
            <p className="text-sm font-semibold w-[200px] truncate">
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
