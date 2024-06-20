"use client";

import EmployerCandidates from "@components/EmployerCandidates";
import React from "react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

const ECandidates = ({ accountData, jobData }) => {
  return (
    <div>
      {accountData.map((account) => (
        <EmployerCandidates
          key={account._id}
          account={account}
          jobs={jobData}
        />
      ))}
    </div>
  );
};

const Candidates = () => {
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
    };
    if (session?.user.id) fetchJobs();
  }, []);

  return <ECandidates accountData={accountInfo} jobData={accountJobs} />;
};

export default Candidates;
