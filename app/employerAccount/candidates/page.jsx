"use client";

import EmployerCandidates from "@components/EmployerCandidates";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const ECandidates = ({ data }) => {
  console.log(data);
  return (
    <div>
      {data.map((users) => (
        <EmployerCandidates key={users._id} jobs={jobs} />
      ))}
    </div>
  );
};

const Candidates = () => {
  const { data: session } = useSession();

  //console.log(session?.user.id);
  //const [jobData, setJobData] = useState([]);
  //useEffect(() => {
  //  const fetchJobData = async () => {
  //    const response = await fetch(`/api/user/${session?.user.id}/jobs`);
  //    const data = await response.json();
  //    setJobData(data);
  //  };
  //  if (session?.user.id) fetchJobData();
  //}, [session?.user.id]);
  return <EmployerCandidates data={"jobData"} />;
};

export default Candidates;
