"use client";

import React, { useEffect, useState } from "react";
import JobSeekerHome from "@components/JobSeekerHome";
import { useSession } from "next-auth/react";
import LoadingSpinner from "@components/LoadingSpinner";

const JobSeekerResume = () => {
  const { data: session } = useSession();
  const currentUser = session?.user;
  const [loading, setLoading] = useState(true);

  const [accountInfo, setAccountInfo] = useState([]);
  useEffect(() => {
    const fetchAccount = async () => {
      const response = await fetch(
        `/api/account/${session?.user?.email}/jobseeker`,
      );
      const data = await response.json();
      setAccountInfo(data);
      setLoading(false);
    };
    if (session?.user.email) fetchAccount();
  }, [currentUser]);

  return loading ? (
    <LoadingSpinner />
  ) : (
    <>
      {accountInfo.map((account) => (
        <JobSeekerHome key={account._id} account={account} />
      ))}
    </>
  );
};

export default JobSeekerResume;
