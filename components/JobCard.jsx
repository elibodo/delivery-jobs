"use client";

import React from "react";
import { useState } from "react";
import { useSession } from "next-auth/react";

const JobCard = ({ post }) => {
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [applicant, setApplicant] = useState("");
  const [postId, setPostId] = useState("");

  const { data: session } = useSession();

  // Creates a string of days that the job operates
  const days = post.workdays;
  let operationdays = days.join(" ,  ");

  const companybenefits = post.benefits;
  let jobbenefits = companybenefits.join(" ,  ");

  const handleApply = async (e) => {
    e.preventDefault();
    if (session?.user) {
      setApplicant(session?.user?.email);
      setPostId(post._id);
    }
    try {
      const res = await fetch("/api/job/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId,
          applicant: session?.user?.email,
        }),
      });
    } catch (error) {}
  };

  return (
    <div className="prompt_card overflow-hidden relative">
      <button
        onClick={() => setAccordionOpen(!accordionOpen)}
        className="flex justify-between w-full text-left gap-5 items-center"
      >
        <div>
          <h1 className="font-bold text-lg">{post.title}</h1>
          <p className="text-sm text-gray-900">(Company Name)</p>
        </div>
        <p className="text-sm text-gray-900 bg-slate-200 p-1 rounded m-1">
          {post.jobtype}
        </p>
        <p className="text-sm text-gray-900 bg-slate-200 p-1 rounded m-1">
          From ${post.payrange[0]} - ${post.payrange[1]} a {post.payrange[2]}
        </p>
        <p className="text-sm text-gray-900 bg-slate-200 p-1 rounded m-1">
          {post.dispatchlocation}
        </p>
        {/* pay from database template */}
        <p></p>
        <svg
          className=" fill-gray-700 shrink-0 ml-8"
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
          {session?.user ? (
            <button onClick={handleApply} className="black_button w-32 mt-3">
              Apply
            </button>
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
            Authorization to work in the United States: {post.workauthorization}
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
  );
};

export default JobCard;
