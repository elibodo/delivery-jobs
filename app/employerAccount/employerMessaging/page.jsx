import React from "react";
import ChatList from "@components/ChatList";

const EmployerMessaging = () => {
  return (
    <div>
      <div className="mx-3 flex flex-row items-center justify-between border-b-2 border-gray-500 p-2">
        <h1 className="text-2xl font-bold">Messaging</h1>
      </div>
      <div className="flex justify-between gap-5 px-5 py-3">
        <div className="w-full md:w-1/3">
          <ChatList />
        </div>
        <div className="hidden w-2/3 blur-sm md:flex">
          <div className="flex h-[600px] flex-col rounded-lg bg-white">
            <div className="text-body-bold flex items-center px-5 py-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-600 font-bold text-white">
                P
              </div>
              <div className="ml-5">
                <p className="text-lg font-semibold">Perfect Candidate</p>
                <p className="text-sm text-gray-600">Delivery Job</p>
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-5 overflow-y-scroll bg-gray-100 p-4">
              <div className="flex items-start justify-end gap-2">
                <div className="flex flex-col items-end gap-1">
                  <p className="text-sm font-medium">11:08 AM</p>
                  <p className="w-fit rounded-xl bg-orange-600 p-2 text-base font-medium text-white">
                    Hello, we're excited to schedule your interview for the
                    position! Are you available tomorrow at 10 AM?
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-semibold">
                    Delivery Jobs&#160; &#183; &#160; 11:26 AM
                  </p>
                  <p className="w-fit rounded-xl bg-gray-200 p-2 text-base font-medium">
                    Hello! Yes, I wanted to confirm our interview scheduled for
                    tomorrow at 10 AM.
                  </p>
                </div>
              </div>
              <div className="flex items-start justify-end gap-2">
                <div className="flex flex-col items-end gap-1">
                  <p className="text-sm font-medium">12:11 PM</p>
                  <p className="w-fit rounded-xl bg-orange-600 p-2 text-base font-medium text-white">
                    Great! Please bring a copy of your resume.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-semibold">
                    Delivery Jobs&#160; &#183; &#160; 01:20 PM
                  </p>
                  <p className="w-fit rounded-xl bg-gray-200 p-2 text-base font-medium">
                    Thank you! Is there anything specific I should prepare for
                    our conversation?
                  </p>
                </div>
              </div>
              <div className="flex items-start justify-end gap-2">
                <div className="flex flex-col items-end gap-1">
                  <p className="text-sm font-medium">01:31 PM</p>
                  <p className="w-fit rounded-xl bg-orange-600 p-2 text-base font-medium text-white">
                    Just be ready to discuss your experience and why you're
                    interested in the position. See you soon!
                  </p>
                </div>
              </div>
            </div>

            <div className="flex w-full cursor-pointer items-center justify-between rounded-3xl px-7 py-2">
              <div className="flex w-full items-center gap-4">
                <input
                  type="text"
                  placeholder="Write a message..."
                  className="mr-7 w-full p-2 text-sm font-medium outline-none"
                />
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-600 text-white transition-all duration-200 hover:bg-white hover:text-orange-600">
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
