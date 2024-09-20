import React from "react";

const MessageBox = ({ message, currentUser }) => {
  return message?.sender?._id !== currentUser.id ? (
    <div className="flex gap-2 items-start">
      <div className="flex flex-col gap-1">
        <p className="text-sm font-semibold">
          {message?.sender?.name} &#160; &#183; &#160;
          {new Date(message?.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
        <p className="w-fit bg-gray-200 p-2 rounded-xl text-base font-medium">
          {message.text}
        </p>
      </div>
    </div>
  ) : (
    <div className="flex gap-2 items-start justify-end">
      <div className="flex flex-col gap-1 items-end">
        <p className="text-sm font-medium">
          {new Date(message?.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
        <p className="w-fit bg-orange-600 text-white p-2 rounded-xl text-base font-medium">
          {message.text}
        </p>
      </div>
    </div>
  );
};

export default MessageBox;
