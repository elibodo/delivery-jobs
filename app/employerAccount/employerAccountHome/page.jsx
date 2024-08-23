"use client";

import React from "react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import EmployerHome from "@components/EmployerHome";

const EAccountData = ({ accountData, jobData, handleDelete }) => {
  return (
    <div>
      {accountData.map((account) => (
        <EmployerHome
          key={account._id}
          account={account}
          jobs={jobData}
          handleDelete={handleDelete}
        />
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
    };
    if (session?.user.id) fetchJobs();
  }, []);

  const handleDelete = async (job) => {
    const jobID = job._id;
    const hasConfirmed = confirm(
      "Are you sure you want to permanently delete this job?"
    );
    if (hasConfirmed) {
      try {
        await fetch(`/api/job/${jobID}`, {
          method: "DELETE",
          body: JSON.stringify({
            employerEmail: session?.user?.email,
          }),
        });
        const filteredJobs = accountJobs.filter((item) => item._id !== jobID);
        setAccountJobs(filteredJobs);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <EAccountData
      accountData={accountInfo}
      jobData={accountJobs}
      handleDelete={handleDelete}
    />
  );
};

export default EmployerAccountHome;
