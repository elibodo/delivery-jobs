"use client";

import React from "react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import EmployerHome from "@components/EmployerHome";

const EAccountData = ({ data }) => {
  return (
    <div>
      {data.map((account) => (
        <EmployerHome key={account._id} account={account} />
      ))}
    </div>
  );
};

const EmployerAccountHome = () => {
  const { data: session } = useSession();

  const [accountInfo, setAccountInfo] = useState([]);
  useEffect(() => {
    const fetchAccount = async () => {
      const response = await fetch(
        `/api/account/${session?.user?.email}/employer`
      );
      const data = await response.json();
      setAccountInfo(data);
    };
    if (session?.user.email) fetchAccount();
  }, []);

  //getting jobs from user
  //const [jobs, setJobs] = useState([]);
  //const fetchPosts = async () => {
  //  const response = await fetch(`/api/users/${session?.user.id}/job`);
  //  const data = await response.json();
  //
  //  if (session?.user.id) setJobs(data);
  //};
  //useEffect(() => {
  //  fetchPosts();
  //}, []);

  return <EAccountData data={accountInfo} />;
};

export default EmployerAccountHome;
