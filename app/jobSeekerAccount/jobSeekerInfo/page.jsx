"use client";

import React from "react";
import JobSeekerInformation from "@components/JobSeekerInformation";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

const JSInformation = ({ accountData }) => {
  return (
    <div>
      {accountData.map((account) => (
        <JobSeekerInformation key={account._id} account={account} />
      ))}
    </div>
  );
};

const JobSeekerInfo = () => {
  const { data: session } = useSession();

  const [accountInfo, setAccountInfo] = useState([]);
  useEffect(() => {
    const fetchAccount = async () => {
      const response = await fetch(
        `/api/account/${session?.user?.email}/jobseeker`,
        { method: "GET" }
      );
      const data = await response.json();
      setAccountInfo(data);
    };
    if (session?.user.email) fetchAccount();
  }, []);
  return (
    <div>
      <div className="flex flex-row items-center justify-between p-2 mx-3 border-b-2 border-gray-500">
        <h1 className="font-bold text-2xl">Resume Information</h1>
      </div>
      <JSInformation accountData={accountInfo} />
    </div>
  );
};

export default JobSeekerInfo;
