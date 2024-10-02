"use client";

import React from "react";
import { useSession } from "next-auth/react";

const PricingCard = ({ price }) => {
  const dynamicJobPosts = (price) => {
    if (price.nickname === "Up To Two Jobs") {
      return (
        <p className="mt-4 text-sm font-medium text-orange-600">
          Have access to two job posts.
        </p>
      );
    } else if (price.nickname === "Up To Five Jobs") {
      return (
        <p className="mt-4 text-sm font-medium text-orange-600">
          Have access to five job posts.
        </p>
      );
    } else if (price.nickname === "Up To Ten Jobs") {
      return (
        <p className="mt-4 text-sm font-medium text-orange-600">
          Have access to ten job posts.
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
    <div className="mx-10 my-5 rounded-xl border-4 bg-gray-200 text-center shadow-2xl">
      <div>
        <div className="items-center p-2 text-center">
          <h4 className="text-2xl font-bold">{price.nickname}</h4>
          {dynamicJobPosts(price)}
          <p className="mt-2 text-sm font-medium">
            Post job openings for all job seekers to find.
          </p>
          <p className="mt-2 text-sm font-medium">
            You can always update and change your subscription or cancel at
            anytime.
          </p>
        </div>
        {price.unit_amount === 14999 ? (
          <div>
            <div className="mt-4 flex flex-row items-center justify-center gap-1">
              <h1 className="space-x-2 text-3xl font-bold line-through">
                {(price.unit_amount / 100).toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </h1>
              <span className="text-xs">a month</span>
            </div>
            <p className="font-semibold text-orange-600">100% OFF</p>
          </div>
        ) : (
          <div className="my-4 flex flex-row items-center justify-center gap-1">
            <h1 className="text-3xl font-bold">
              {(price.unit_amount / 100).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </h1>
            <span className="text-xs">a month</span>
          </div>
        )}
        <div className="my-4 flex justify-center">
          <button onClick={handleSubscription} className="black_button">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default PricingCard;
