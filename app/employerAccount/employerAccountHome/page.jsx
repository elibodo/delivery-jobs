"use client";

import React from "react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import EmployerHome from "@components/EmployerHome";
import Footer from "@components/Footer";

const EAccountData = ({ accountData, jobData }) => {
  return (
    <div>
      {accountData.map((account) => (
        <EmployerHome key={account._id} account={account} jobs={jobData} />
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

  const [accountJobs, setAccountJobs] = useState([]);
  useEffect(() => {
    const fetchJobs = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/jobs`);
      const data = await response.json();
      setAccountJobs(data);
      console.log(JSON.stringify(accountJobs));
    };
    if (session?.user.id) fetchJobs();
  }, []);

  return <EAccountData accountData={accountInfo} jobData={accountJobs} />;
};

export default EmployerAccountHome;
