"use client";

import React from "react";
import JobSeekerInformation from "@components/JobSeekerInformation";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

const JobSeekerInfo = () => {
  const { data: session } = useSession();

  const [accountInfo, setAccountInfo] = useState([]);
  useEffect(() => {
    const fetchAccount = async () => {
      const response = await fetch(
        `/api/account/${session?.user?.email}/jobseeker`,
        { method: "GET" },
      );
      const data = await response.json();
      setAccountInfo(data);
    };
    if (session?.user.email) fetchAccount();
  }, []);
  return (
    <div>
      <div className="mx-3 flex flex-row items-center justify-between border-b-2 border-gray-500 p-2">
        <h1 className="text-2xl font-bold">Resume Information</h1>
      </div>
      {accountInfo.map((account) => (
        <JobSeekerInformation key={account._id} account={account} />
      ))}
    </div>
  );
};

export default JobSeekerInfo;
