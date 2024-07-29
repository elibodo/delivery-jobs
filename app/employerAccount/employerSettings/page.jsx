"use client";

import React from "react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import EmployerSettings from "@components/EmployerSettings";

const ESettings = ({ accountData }) => {
  return (
    <div>
      {accountData.map((account) => (
        <EmployerSettings key={account._id} account={account} />
      ))}
    </div>
  );
};

const EmployerAccountSettings = () => {
  const { data: session } = useSession();

  const [accountInfo, setAccountInfo] = useState([]);
  useEffect(() => {
    const fetchAccount = async () => {
      const response = await fetch(
        `/api/account/${session?.user?.email}/employer`,
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
        <h1 className="font-bold text-2xl">Settings</h1>
      </div>
      <ESettings accountData={accountInfo} />
    </div>
  );
};

export default EmployerAccountSettings;
