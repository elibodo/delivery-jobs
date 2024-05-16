"use client";

import React, { useEffect, useState } from "react";
import JobSeekerHome from "@components/JobSeekerHome";
import { useSession } from "next-auth/react";

const JSAccountData = ({ data }) => {
  return (
    <div>
      {data.map((account) => (
        <JobSeekerHome key={account._id} account={account} />
      ))}
    </div>
  );
};

const JobSeekerAccount = () => {
  const { data: session } = useSession();

  const [accountInfo, setAccountInfo] = useState([]);
  useEffect(() => {
    const fetchAccount = async () => {
      const response = await fetch(
        `/api/account/${session?.user?.email}/jobseeker`
      );
      const data = await response.json();
      setAccountInfo(data);
    };
    if (session?.user.email) fetchAccount();
  }, []);

  return <JSAccountData data={accountInfo} />;
};

export default JobSeekerAccount;
