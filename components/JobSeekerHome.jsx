"use client";

import React from "react";
import { useSession } from "next-auth/react";

const JobSeekerHome = (accountDetails) => {
  const { data: session } = useSession();
  console.log("asdf" + JSON.stringify(accountDetails));

  return <div>{accountDetails.twikCard}</div>;
};

export default JobSeekerHome;
