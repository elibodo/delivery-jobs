import React from "react";

const MessageBox = ({ message, currentUser }) => {
  return message?.sender?._id !== currentUser.id ? (
    <div className="flex items-start gap-2">
      <div className="flex flex-col gap-1">
        <p className="text-sm font-semibold">
          {message?.sender?.name} &#160; &#183; &#160;
          {new Date(message?.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
        <p className="w-fit rounded-xl bg-gray-200 p-2 text-base font-medium">
          {message.text}
        </p>
      </div>
    </div>
  ) : (
    <div className="flex items-start justify-end gap-2">
      <div className="flex flex-col items-end gap-1">
        <p className="text-sm font-medium">
          {new Date(message?.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
        <p className="w-fit rounded-xl bg-orange-600 p-2 text-base font-medium text-white">
          {message.text}
        </p>
      </div>
    </div>
  );
};

export default MessageBox;
