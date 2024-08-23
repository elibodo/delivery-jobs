"use client";

import React from "react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import EmployerSettings from "@components/EmployerSettings";

const EmployerAccountSettings = () => {
  const { data: session } = useSession();
  const userEmail = session?.user?.email;

  const [accountInfo, setAccountInfo] = useState([]);

  useEffect(() => {
    fetchAccount();
  }, []);

  const fetchAccount = async () => {
    const response = await fetch(`/api/account/${userEmail}/employer`, {
      method: "GET",
    });
    const data = await response.json();
    setAccountInfo(data);
  };

  return (
    <div>
      <div className="flex flex-row items-center justify-between p-2 mx-3 border-b-2 border-gray-500">
        <h1 className="font-bold text-2xl">Settings</h1>
      </div>
      {accountInfo &&
        accountInfo.map((account) => (
          <EmployerSettings key={account._id} account={account} />
        ))}
    </div>
  );
};

export default EmployerAccountSettings;
