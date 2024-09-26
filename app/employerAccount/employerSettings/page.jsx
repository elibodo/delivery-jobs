"use client";

import React from "react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import EmployerSettings from "@components/EmployerSettings";
import LoadingSpinner from "@components/LoadingSpinner";

const EmployerAccountSettings = () => {
  const { data: session } = useSession();
  const userEmail = session?.user?.email;
  const currentUser = session?.user;
  const [loading, setLoading] = useState(true);

  const [accountInfo, setAccountInfo] = useState([]);

  useEffect(() => {
    fetchAccount();
  }, [currentUser]);

  const fetchAccount = async () => {
    const response = await fetch(`/api/account/${userEmail}/employer`, {
      method: "GET",
    });
    const data = await response.json();
    setAccountInfo(data);
    setLoading(false);
  };

  return loading ? (
    <LoadingSpinner />
  ) : (
    <div>
      <div className="mx-3 flex flex-row items-center justify-between border-b-2 border-gray-500 p-2">
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>
      {accountInfo.map((account) => (
        <EmployerSettings key={account._id} account={account} />
      ))}
    </div>
  );
};

export default EmployerAccountSettings;
