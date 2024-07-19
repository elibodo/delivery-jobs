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

  // Creates a string of days that the job operates
  const days = post.workdays;
  let operationdays = days.join(" ,  ");

  const companybenefits = post.benefits;
  let jobbenefits = companybenefits.join(" ,  ");

  const handleApply = async (e) => {
    e.preventDefault();
    const applicantArray = post.applicants;
    const deniedApplicantArray = post.deniedApplicants;
    const currentUserEmail = session?.user?.email;
    if (
      !applicantArray.includes(currentUserEmail) &&
      !deniedApplicantArray.includes(currentUserEmail)
    ) {
      try {
        const res = await fetch("/api/job/apply", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            postId: post._id,
            applicantEmail: session?.user?.email,
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
      } catch (error) {}
    } else alert("You have already applied to " + post.title);
  };

  return (
    <div className="flex flex-row gap-4">
      <div className="prompt_card overflow-hidden relative">
        <button
          onClick={() => {
            setAccordionOpen(!accordionOpen);
          }}
          className="flex justify-between w-full text-left gap-5 items-center"
        >
          <div>
            <h1 className="font-bold text-lg">{post.title}</h1>
            <p className="text-sm text-gray-900">{post.companyName}</p>
          </div>
          <div className="flex flex-row gap-2 text-right">
            <p className="text-sm text-gray-900 bg-slate-200 p-1 rounded m-1">
              {post.jobtype}
            </p>
            <p className="text-sm text-gray-900 bg-slate-200 p-1 rounded m-1">
              From ${post.payrange[0]} - ${post.payrange[1]} a{" "}
              {post.payrange[2]}
            </p>
            <p className="text-sm text-gray-900 bg-slate-200 p-1 rounded m-1">
              {post.dispatchlocation}
            </p>
          </div>
          {/* pay from database template */}
          <svg
            className=" fill-gray-700 shrink-0 ml-5"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              y="7"
              width="16"
              height="2"
              rx="1"
              className={`transform origin-center transition duration-200 ease-out ${
                accordionOpen && "!rotate-180"
              }`}
            />
            <rect
              y="7"
              width="16"
              height="2"
              rx="1"
              className={`transform origin-center rotate-90 transition duration-200 ease-out ${
                accordionOpen && "!rotate-180"
              }`}
            />
          </svg>
        </button>
        <div
          className={`grid overflow-hidden transition-all duration-300 ease-in-out text-slate-600 text-sm ${
            accordionOpen
              ? "grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="space-y-2 text-sm text-gray-900 overflow-hidden whitespace-pre-wrap mt-2 border-t-2 border-slate-300">
            {/* apply button */}
            {session?.user?.accountType === "Job Seeker" ? (
              <button onClick={handleApply} className="black_button w-32 mt-3">
                Apply
              </button>
            ) : session === null ? (
              <Link href={"/logIn"} className="black_button w-40 mt-3">
                Sign In To Apply!
              </Link>
            ) : (
              <></>
            )}
            <p className="mt-3 mb-5">{post.description}</p>
            <p className="font-bold">Additional Information</p>
            {/* <p>Number of hires: {post.numOfHires}</p> */}
            <p>Delivery Location: {post.deliverylocation}</p>

            <p>
              Experience Required: {"  "}
              {post.experiencerequired}
            </p>
            <p>{/* This shift is{"  "} {post.shifttype} */}</p>
            <p>
              Days of the week this job operates:{"  "} {operationdays}
            </p>
            <div className="flex flex-row">
              <p>Benefits this company offers:{"  "} </p>
              <span>{jobbenefits}</span>
            </div>
            {/* <p>
            Is a resume required? {"  "}
            {post.resume}
          </p> */}
            <p>
              Contract or W2?{"  "} {post.jobformat}
            </p>
            <p>
              Authorization to work in the United States:{" "}
              {post.workauthorization}
            </p>
            <p>
              Is a drug test required?{"  "} {post.drugtest}
            </p>
            <p>
              Is a background check required?{"  "} {post.backgroundcheck}
            </p>
            <p>
              Is a DOT medical card required?{"  "} {post.dotcard}
            </p>
          </div>
        </div>
      </div>
      {session?.user.id === post.creator._id &&
        pathName === "/employerAccount/employerAccountHome" && (
          <div className="flex flex-row gap-3 mt-5">
            <div className="flex flex-col gap-3">
              <button onClick={handleDelete} className="has-tooltip">
                <span className="tooltip rounded shadow-lg p-1 bg-gray-500 text-black -mt-8">
                  Permanently Delete Job
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="size-5"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
              {/* edit job */}
              <button className="has-tooltip">
                <span className="tooltip rounded shadow-lg p-1 bg-gray-500 text-black -mt-8">
                  Edit Job
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  class="size-5"
                >
                  <path d="m5.433 13.917 1.262-3.155A4 4 0 0 1 7.58 9.42l6.92-6.918a2.121 2.121 0 0 1 3 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 0 1-.65-.65Z" />
                  <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0 0 10 3H4.75A2.75 2.75 0 0 0 2 5.75v9.5A2.75 2.75 0 0 0 4.75 18h9.5A2.75 2.75 0 0 0 17 15.25V10a.75.75 0 0 0-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5Z" />
                </svg>
              </button>
            </div>
            <div className="rounded-lg border border-gray-300 bg-white/20 w-[175px] h-fit p-3 gap-3">
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
