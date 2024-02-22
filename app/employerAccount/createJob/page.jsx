"use client";
import React from "react";
import JobForm from "@components/JobForm";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const CreateJob = () => {
  const companyName = "White Sands Delivery Inc";
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    title: "",
    hires: "",
  });

  const createJob = async (e) => {};

  return (
    <div>
      <div className="flex flex-row items-center justify-between p-2 mx-3 border-b-2 border-gray-500">
        <h1 className="font-bold text-2xl">Create Job</h1>
        <p className="">{companyName}</p>
      </div>
      <JobForm />
    </div>
  );
};

export default CreateJob;
