"use client";

import React from "react";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { stringify } from "postcss";

const JobCard = ({ post, handleTagClick }) => {
  const [accordionOpen, setAccordionOpen] = useState(false);

  return (
    <div className="prompt_card overflow-hidden relative">
      <button
        onClick={() => setAccordionOpen(!accordionOpen)}
        className="flex justify-between w-full text-left gap-5 items-center"
      >
        <h1 className="font-bold text-lg">{post.title}</h1>
        <p>{post.jobtype}</p>
        {/* pay from database template */}
        <p>$750 to $1000 a week</p>
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
        <div className="overflow-hidden whitespace-pre-wrap">
          {post.description}
        </div>
      </div>
    </div>
  );
};

export default JobCard;
