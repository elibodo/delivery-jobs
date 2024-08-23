"use client";

import React from "react";
import PricingCard from "@components/PricingCard";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import SubscriptionActive from "@components/SubscriptionActive";

const Billing = () => {
  const { data: session } = useSession();

  const [prices, setPrices] = useState([]);
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    fetchPrices();
    fetchAccount();
  }, []);

  const fetchAccount = async () => {
    const response = await fetch(
      `/api/account/${session?.user?.email}/employer`
    );
    const data = await response.json();
    setUserInfo(data);
  };

  const fetchPrices = async () => {
    const response = await fetch("/api/getproducts");
    const data = await response.json();
    setPrices(data);
  };

  return (
    <div>
      <div className="flex flex-row items-center justify-between p-2 mx-3 border-b-2 border-gray-500">
        <h1 className="font-bold text-2xl">Billing</h1>
      </div>
      {userInfo &&
        userInfo.map((data) => (
          <div key={data.id}>
            {data.Access === true ? (
              <SubscriptionActive user={data} />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 mb-10 mt-5">
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
