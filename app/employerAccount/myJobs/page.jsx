"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import MyJobCard from "@components/MyJobCard";

import React from "react";

const MyJobs = () => {
  const companyName = "White Sands Delivery Inc";

  const { data: session } = useSession();
  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();

      setMyPosts(data);
    };

    if (session?.user.id) fetchPosts();
  }, [session?.user.id]);

  const handleEdit = () => {};

  const handleDelete = async () => {};

  return (
    <MyJobCard
      name="Eli"
      desc="asdfasdf"
      data={[myPosts]}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyJobs;
