"use client";

import React from "react";
import { useSession } from "next-auth/react";

const JobSeekerHome = (accountDetials) => {
  const { data: session } = useSession();

  return <div>{accountDetials.DOT}aaaaa</div>;
};

export default JobSeekerHome;
