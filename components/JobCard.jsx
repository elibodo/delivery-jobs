"use client";

import React from "react";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const JobCard = ({ post, handleTagClick }) => {
  return (
    <div className="prompt_card">
      <div className="flex text-left  items-start gap-5 mb-5">
        <h1 className="font-bold">{post.title}</h1>
        <p>{post.dispatchlocation}</p>
        <p>{post.jobtype}</p>
        <p>{post.benefits}</p>
      </div>
      <div className="flex flex-col">
        {/* <p>Relocation? {post.relocate}</p> */}
      </div>
    </div>
  );
};

export default JobCard;
