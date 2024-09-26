"use client";

import React from "react";
import PricingCard from "@components/PricingCard";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import SubscriptionActive from "@components/SubscriptionActive";
import LoadingSpinner from "@components/LoadingSpinner";

const Billing = () => {
  const { data: session } = useSession();
  const currentUser = session?.user;
  const [loading, setLoading] = useState(true);

  const [prices, setPrices] = useState([]);
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    fetchPrices();
    fetchAccount();
  }, [currentUser]);

  const fetchAccount = async () => {
    const response = await fetch(
      `/api/account/${session?.user?.email}/employer`,
    );
    const data = await response.json();
    setUserInfo(data);
    setLoading(false);
  };

  const fetchPrices = async () => {
    const response = await fetch("/api/getproducts");
    const data = await response.json();
    setPrices(data);
  };

  return loading ? (
    <LoadingSpinner />
  ) : (
    <div>
      <div className="mx-3 flex flex-row items-center justify-between border-b-2 border-gray-500 p-2">
        <h1 className="text-2xl font-bold">Billing</h1>
      </div>
      {userInfo &&
        userInfo.map((data) => (
          <div key={data.id}>
            {data.Access === true ? (
              <SubscriptionActive user={data} />
            ) : (
              <div className="mb-10 mt-5 grid grid-cols-1 md:grid-cols-3">
                {prices &&
                  prices.map((price) => (
                    <PricingCard price={price} key={price.product} />
                  ))}
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

export default Billing;
