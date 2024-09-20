import React from "react";
import ChatList from "@components/ChatList";

const EmployerMessaging = () => {
  return (
    <div>
      <div className="flex flex-row items-center justify-between p-2 mx-3 border-b-2 border-gray-500">
        <h1 className="font-bold text-2xl">Messaging</h1>
      </div>
      <div className="flex justify-between gap-5 px-5 py-3">
        <div className="md:w-1/3">
          <ChatList />
        </div>
        <div className="w-2/3 blur-sm hidden md:flex">
          <div className="h-[600px] flex flex-col bg-white rounded-lg">
            <div className="flex items-center px-5 py-2 text-body-bold">
              <div className="h-10 w-10 rounded-full bg-orange-600 flex items-center justify-center text-white font-bold">
                P
              </div>
              <div className="ml-5">
                <p className="font-semibold text-lg">Perfect Candidate</p>
                <p className="text-sm text-gray-600">Delivery Job</p>
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-5 p-4 overflow-y-scroll bg-gray-100">
              <div className="flex gap-2 items-start justify-end">
                <div className="flex flex-col gap-1 items-end">
                  <p className="text-sm font-medium">11:08 AM</p>
                  <p className="w-fit bg-orange-600 text-white p-2 rounded-xl text-base font-medium">
                    Hello, we're excited to schedule your interview for the
                    position! Are you available tomorrow at 10 AM?
                  </p>
                </div>
              </div>
              <div className="flex gap-2 items-start">
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-semibold">
                    Delivery Jobs&#160; &#183; &#160; 11:26 AM
                  </p>
                  <p className="w-fit bg-gray-200 p-2 rounded-xl text-base font-medium">
                    Hello! Yes, I wanted to confirm our interview scheduled for
                    tomorrow at 10 AM.
                  </p>
                </div>
              </div>
              <div className="flex gap-2 items-start justify-end">
                <div className="flex flex-col gap-1 items-end">
                  <p className="text-sm font-medium">12:11 PM</p>
                  <p className="w-fit bg-orange-600 text-white p-2 rounded-xl text-base font-medium">
                    Great! Please bring a copy of your resume.
                  </p>
                </div>
              </div>
              <div className="flex gap-2 items-start">
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-semibold">
                    Delivery Jobs&#160; &#183; &#160; 01:20 PM
                  </p>
                  <p className="w-fit bg-gray-200 p-2 rounded-xl text-base font-medium">
                    Thank you! Is there anything specific I should prepare for
                    our conversation?
                  </p>
                </div>
              </div>
              <div className="flex gap-2 items-start justify-end">
                <div className="flex flex-col gap-1 items-end">
                  <p className="text-sm font-medium">01:31 PM</p>
                  <p className="w-fit bg-orange-600 text-white p-2 rounded-xl text-base font-medium">
                    Just be ready to discuss your experience and why you're
                    interested in the position. See you soon!
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full flex items-center justify-between px-7 py-2 rounded-3xl cursor-pointer">
              <div className="flex items-center gap-4 w-full">
                <input
                  type="text"
                  placeholder="Write a message..."
                  className="text-sm font-medium w-full mr-7 p-2 outline-none"
                />
              </div>
              <div className="bg-orange-600 text-white hover:bg-white hover:text-orange-600 transition-all duration-200 rounded-full h-10 w-10 flex items-center justify-center">
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
        </div>
      </div>
    </div>
  );
};

export default EmployerMessaging;
