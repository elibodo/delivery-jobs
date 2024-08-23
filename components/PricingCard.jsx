"use client";

import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

const PricingCard = ({ price }) => {
  const dynamicJobPosts = (price) => {
    if (price.nickname === "Up To Two Jobs") {
      return (
        <p className="font-medium text-sm mt-4 text-orange-600">
          Have access to two job posts.
        </p>
      );
    } else if (price.nickname === "Up To Five Jobs") {
      return (
        <p className="font-medium text-sm mt-4 text-orange-600">
          Have access to five job posts.
        </p>
      );
    } else if (price.nickname === "Unlimited Jobs") {
      return (
        <p className="font-medium text-sm mt-4 text-orange-600">
          Have access to unlimited job posts.
        </p>
      );
    }
  };

  const { data: session } = useSession();

  const handleSubscription = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/payment", {
      body: JSON.stringify({
        priceId: price.id,
        user: session?.user?.email,
        id: session?.user?.id,
      }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    window.location.assign(data);
  };

  return (
    <div className="bg-gray-200 shadow-2xl border-4 text-center mx-10 mt-5 rounded-xl">
      <div>
        <div className="items-center text-center p-2">
          <h4 className="text-2xl font-bold">{price.nickname}</h4>
          {dynamicJobPosts(price)}
          <p className="font-medium text-sm mt-2">
            Post job openings for all job seekers to find.
          </p>
          <p className="font-medium text-sm mt-2">
            You can always update and change your subscription or cancel at
            anytime.
          </p>
        </div>
        <div className="flex flex-row items-center justify-center my-4 gap-1">
          <h1 className="text-3xl font-bold">
            {(price.unit_amount / 100).toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </h1>
          <span className="text-xs">a month</span>
        </div>
        <div className="flex justify-center my-4">
          <button onClick={handleSubscription} className="black_button">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default PricingCard;
