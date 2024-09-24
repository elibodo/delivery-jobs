"use client";

import React from "react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import JobSeekerJobPage from "@components/JobSeekerJobPage";

const JobsAppliedTo = ({ JobID }) => {
  const [jobData, setJobData] = useState([]);
  useEffect(() => {
    const fetchJob = async () => {
      const response = await fetch(`/api/job/${JobID}/`, { method: "GET" });
      const data = await response.json();
      setJobData(data);
    };
    fetchJob();
  }, []);
  return <JobSeekerJobPage jobs={jobData} />;
};

const JobSeekerApplications = ({ accountData }) => {
  return (
    <div>
      {accountData.map((account) => (
        <div key={account._id}>
          {account.applications != "" ? (
            <div>
              {account.applications.map((apps) => (
                <JobsAppliedTo JobID={apps} />
              ))}
            </div>
          ) : (
            <p className="description flex justify-center">
              Please apply to jobs to view them on this page.
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

const JobSeekerJobs = () => {
  const { data: session } = useSession();

  const [accountInfo, setAccountInfo] = useState([]);
  useEffect(() => {
    const fetchAccount = async () => {
      const response = await fetch(
        `/api/account/${session?.user?.email}/jobseeker`,
      );
      const data = await response.json();
      setAccountInfo(data);
    };
    if (session?.user.email) fetchAccount();
  }, []);

  return (
    <div>
      <div className="mx-3 flex flex-row items-center justify-between border-b-2 border-gray-500 p-2">
        <h1 className="text-2xl font-bold">Jobs Applied To</h1>
      </div>
      <JobSeekerApplications accountData={accountInfo} />
    </div>
  );
};

export default JobSeekerJobs;
