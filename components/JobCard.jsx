"use client";

import React, { useEffect } from "react";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

const JobCard = ({ post, handleDelete }) => {
  const [accordionOpen, setAccordionOpen] = useState(false);
  const { data: session } = useSession();
  const pathName = usePathname();

  // Formats the creation date
  const createdDate = (() => {
    const date = new Date(post.createdAt);
    return !isNaN(date) // Check if the date is valid
      ? date.toLocaleDateString("en-US", {
          timeZone: "UTC",
        })
      : ""; // Return an empty string if the date is invalid
  })();

  // Creates a string of days that the job operates
  const days = post.workdays;
  let operationdays = days.join(",  ");

  const companybenefits = post.benefits;
  let jobbenefits = companybenefits.join(",  ");

  const handleApply = async (e) => {
    e.preventDefault();
    const applicantArray = post.applicants;
    const deniedApplicantArray = post.deniedApplicants;
    const currentUserEmail = session?.user?.email;

    let index = applicantArray.findIndex(
      (obj) => obj.email === currentUserEmail,
    );
    if (index === -1 && !deniedApplicantArray.includes(currentUserEmail)) {
      try {
        const res = await fetch("/api/job/apply", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            postId: post._id,
            applicantEmail: session?.user?.email,
            applicantName: session?.user?.name,
            applicantPhoneNumber: session?.user?.phoneNumber,
          }),
        });
        await fetch("/api/job/email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            appEmail: session?.user?.email,
            postId: post._id,
          }),
        });
        if (res.ok) {
          alert("Successfully applied to " + post.title);
          window.location.reload();
        } else {
          alert("Could not apply to " + post.title);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("You have already applied to " + post.title);
    }
  };

  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <div className="prompt_card relative overflow-hidden">
        <button
          onClick={() => {
            setAccordionOpen(!accordionOpen);
          }}
          className="flex w-full items-center justify-between text-left md:gap-5"
        >
          {/* Desktop layout */}
          <div className="hidden md:flex md:flex-col">
            <h1 className="text-lg font-bold">{post.title}</h1>
            <p className="text-sm text-gray-900">{post.companyName}</p>
          </div>
          <div className="hidden md:flex md:flex-row md:gap-2 md:text-center">
            <p className="m-1 rounded bg-slate-200 p-1 text-sm text-gray-900">
              {post.jobtype}
            </p>
            <p className="m-1 rounded bg-slate-200 p-1 text-sm text-gray-900">
              From ${post.payrange[0]} - ${post.payrange[1]} a{" "}
              {post.payrange[2]}
            </p>
            <p className="m-1 rounded bg-slate-200 p-1 text-sm text-gray-900">
              {post.dispatchlocation}
            </p>
          </div>
          {/* Mobile layout */}
          <div className="md:hidden">
            <div>
              <h1 className="text-lg font-bold">{post.title}</h1>
              <p className="text-sm text-gray-900">{post.companyName}</p>
            </div>
            <div className="mt-2 text-sm">
              <div className="flex gap-5">
                <p className="rounded bg-slate-200 p-1 text-gray-900">
                  {post.jobtype}
                </p>
                <p className="rounded bg-slate-200 p-1 text-gray-900">
                  {post.dispatchlocation}
                </p>
              </div>
              <div className="mt-2 flex">
                <p className="rounded bg-slate-200 p-1 font-semibold text-gray-900">
                  From ${post.payrange[0]} - ${post.payrange[1]} a{" "}
                  {post.payrange[2]}
                </p>
              </div>
            </div>
          </div>
          {/* pay from database template */}
          <svg
            className="shrink-0 fill-gray-700 md:ml-5"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              y="7"
              width="16"
              height="2"
              rx="1"
              className={`origin-center transform transition duration-200 ease-out ${
                accordionOpen && "!rotate-180"
              }`}
            />
            <rect
              y="7"
              width="16"
              height="2"
              rx="1"
              className={`origin-center rotate-90 transform transition duration-200 ease-out ${
                accordionOpen && "!rotate-180"
              }`}
            />
          </svg>
        </button>
        <div
          className={`grid overflow-hidden text-sm text-slate-600 transition-all duration-300 ease-in-out ${
            accordionOpen
              ? "grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="mt-2 space-y-2 overflow-hidden whitespace-pre-wrap border-t-2 border-slate-300 text-sm text-gray-900">
            {/* apply button */}
            <div className="flex justify-center md:justify-start">
              {session?.user?.accountType === "Job Seeker" ? (
                <button
                  onClick={handleApply}
                  className="black_button mt-2 w-32"
                >
                  Apply
                </button>
              ) : session === null ? (
                <Link href={"/logIn"} className="black_button mt-3 w-40">
                  Sign In To Apply!
                </Link>
              ) : (
                <></>
              )}
            </div>
            {/* <p className="mt-8 pb-5">{post.description}</p> */}
            <div
              className="prose prose-sm prose-h1:text-base prose-h1:font-semibold prose-p:text-sm prose-h1:pb-1 prose-h1:pt-2 prose-p:my-0 prose-p:py-0 prose-li:py-0 prose-li:my-0 mt-6 whitespace-pre-line break-words pb-4 text-sm md:ml-14"
              dangerouslySetInnerHTML={{ __html: post.description }}
            />
            <p className="text-base font-bold">Additional Information</p>
            <div className="flex flex-row">
              <p className="mr-2 whitespace-nowrap font-semibold">
                Delivery Location:
              </p>
              <p>{post.deliverylocation}</p>
            </div>
            <div className="flex flex-row">
              <p className="mr-2 whitespace-nowrap font-semibold">
                Experience Required:
              </p>
              <p>{post.experiencerequired}</p>
            </div>
            <div className="flex flex-row">
              <p className="mr-2 whitespace-nowrap font-semibold">
                Operating Days:
              </p>
              <p>{operationdays}</p>
            </div>
            <div className="flex flex-row">
              <p className="mr-2 whitespace-nowrap font-semibold">
                Company Benefits:
              </p>
              <p>{jobbenefits}</p>
            </div>
            <div className="flex flex-row">
              <p className="mr-2 whitespace-nowrap font-semibold">
                Position Type:
              </p>
              <p>{post.jobformat}</p>
            </div>
            <div className="flex flex-row">
              <p className="mr-2 whitespace-nowrap font-semibold">
                United States Work Authorization:
              </p>
              <p>{post.workauthorization}</p>
            </div>
            <div className="flex flex-row">
              <p className="mr-2 whitespace-nowrap font-semibold">Drug Test:</p>
              <p>{post.drugtest}</p>
            </div>
            <div className="flex flex-row">
              <p className="mr-2 whitespace-nowrap font-semibold">
                Background Check:
              </p>
              <p>{post.backgroundcheck}</p>
            </div>
            <div className="flex flex-row">
              <p className="mr-2 whitespace-nowrap font-semibold">
                DOT Medical Card:
              </p>
              <p>{post.dotcard}</p>
            </div>
            <div className="flex flex-row">
              <p className="mr-2 whitespace-nowrap font-semibold">Posted On:</p>
              <p>{createdDate}</p>
            </div>
          </div>
        </div>
      </div>
      {session?.user.id === post.creator._id &&
        pathName === "/employerAccount/employerAccountHome" && (
          <div className="mb-5 flex flex-row justify-center gap-3 md:justify-normal">
            <div className="flex flex-row gap-3 md:mt-2 md:flex-col">
              <button onClick={handleDelete} className="has-tooltip">
                <span className="tooltip -mt-8 rounded bg-gray-500 p-1 text-black shadow-lg">
                  Delete Job
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fillRule="currentColor"
                  className="size-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {/* edit job */}
              <button className="has-tooltip">
                <span className="tooltip -mt-8 rounded bg-gray-500 p-1 text-black shadow-lg">
                  Edit Job
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fillRule="currentColor"
                  className="size-5"
                >
                  <path d="m5.433 13.917 1.262-3.155A4 4 0 0 1 7.58 9.42l6.92-6.918a2.121 2.121 0 0 1 3 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 0 1-.65-.65Z" />
                  <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0 0 10 3H4.75A2.75 2.75 0 0 0 2 5.75v9.5A2.75 2.75 0 0 0 4.75 18h9.5A2.75 2.75 0 0 0 17 15.25V10a.75.75 0 0 0-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5Z" />
                </svg>
              </button>
              {/* copy job */}
              <button className="has-tooltip">
                <span className="tooltip -mt-8 rounded bg-gray-500 p-1 text-black shadow-lg">
                  Copy Job
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fillRule="currentColor"
                  className="size-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M15.988 3.012A2.25 2.25 0 0 1 18 5.25v6.5A2.25 2.25 0 0 1 15.75 14H13.5V7A2.5 2.5 0 0 0 11 4.5H8.128a2.252 2.252 0 0 1 1.884-1.488A2.25 2.25 0 0 1 12.25 1h1.5a2.25 2.25 0 0 1 2.238 2.012ZM11.5 3.25a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 .75.75v.25h-3v-.25Z"
                    clipRule="evenodd"
                  />
                  <path
                    fillRule="evenodd"
                    d="M2 7a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7Zm2 3.25a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75Zm0 3.5a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <div className="h-fit w-[175px] gap-3 rounded-lg border border-gray-300 bg-white/20 p-3">
              <div className="flex flex-row justify-between">
                <h1 className="font-bold">Applicants: </h1>
                <span className="font-semibold">{post.applicants.length}</span>
              </div>
              {/* <div className="flex flex-row justify-between mt-2">
                <h1 className="font-bold">Clicks: </h1>
                <span className="font-semibold">{post.clicks}</span>
              </div> */}
            </div>
          </div>
        )}
    </div>
  );
};

export default JobCard;
