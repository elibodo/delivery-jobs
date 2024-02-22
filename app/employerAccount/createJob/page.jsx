"use client";
import React from "react";
import JobForm from "@components/JobForm";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const CreateJob = () => {
  const companyName = "White Sands Delivery Inc";

  const router = useRouter();
  const { data: session } = useSession();

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    title: "",
    description: "",
    dispatchlocation: "",
    deliverylocation: "",
  });

  const createJob = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("/api/job/new", {
        method: "POST",
        body: JSON.stringify({
          title: post.title,
          userId: session?.user.id,
          description: post.description,
          dispatchlocation: post.dispatchlocation,
          deliverylocation: post.deliverylocation,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div className="flex flex-row items-center justify-between p-2 mx-3 border-b-2 border-gray-500">
        <h1 className="font-bold text-2xl">Create Job</h1>
        <p className="">{companyName}</p>
      </div>
      <JobForm
        type="Create"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handlesubmit={createJob}
      />
    </div>
  );
};

export default CreateJob;
