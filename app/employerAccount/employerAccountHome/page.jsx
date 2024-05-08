"use client";

import React from "react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import EmployerHome from "@components/EmployerHome";

const EmployerAccountHome = () => {
  const { data: session } = useSession;

  //getting jobs from user
  const [jobs, setJobs] = useState([]);
  const fetchPosts = async () => {
    const response = await fetch(`/api/users/${session?.user.id}/job`);
    const data = await response.json();

    if (session?.user.id) setJobs(data);
  };
  useEffect(() => {
    fetchPosts();
  }, []);

  //getting account from user
  const [accountInfo, setAccountInfo] = useState([]);
  useEffect(() => {
    const fetchAccount = async () => {
      const response = await fetch(`/api/users/${session?.user.email}/account`);
      const data = await response.json;

      if (session?.user.id) setAccountInfo(data);
    };
    fetchAccount();
  }, []);

  return (
    <EmployerHome
      asdf="asdf"
      userInformation={[accountInfo]}
      jobData={[jobs]}
    />
  );
};

export default EmployerAccountHome;
