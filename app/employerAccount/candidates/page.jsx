"use client";

import EmployerCandidates from "@components/EmployerCandidates";
import React from "react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

const ECandidates = ({ accountData, jobData }) => {
  const [data, setData] = useState([]);
  const handleDelete = async (app, id) => {
    const jobID = id;
    const candidate = app;

    const hasConfirmed = confirm(
      "Are you sure you want to permanently delete this candidate",
    );
    if (hasConfirmed) {
      try {
        const res = await fetch(`/api/candidate/${jobID}`, {
          method: "POST",
          body: JSON.stringify({
            candidate: candidate,
          }),
        });
        if (res.ok) {
          jobData.forEach((element) => {
            if (element._id === jobID) {
              let candidates = element.applicants;
              let index = candidates.findIndex(
                (obj) => obj.email === candidate,
              );
              if (index !== -1) {
                candidates.splice(index, 1);
              }
              element.applicants = candidates;
            }
            setData([jobData]);
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      {accountData.map((account) => (
        <EmployerCandidates
          key={account._id}
          account={account}
          jobs={jobData}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
};

const Candidates = () => {
  const { data: session } = useSession();

  const [accountInfo, setAccountInfo] = useState([]);
  const [accountJobs, setAccountJobs] = useState([]);

  useEffect(() => {
    const fetchAccount = async () => {
      const response = await fetch(
        `/api/account/${session?.user?.email}/employer`,
      );
      const data = await response.json();
      setAccountInfo(data);
    };
    const fetchJobs = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/jobs`);
      const data = await response.json();
      setAccountJobs(data);
    };
    if (session?.user.email) {
      fetchAccount();
      fetchJobs();
    }
  }, []);

  return <ECandidates accountData={accountInfo} jobData={accountJobs} />;
};

export default Candidates;
