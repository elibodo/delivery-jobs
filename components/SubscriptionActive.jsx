import React from "react";

const SubscriptionActive = ({ user }) => {
  const dynamicJobSubTitle = (user) => {
    if (user.Subscription === "prod_QhkhnlumnEXxmK") {
      return <>Up To Two Jobs</>;
    } else if (user.Subscription === "prod_QhkhCfbfaSCQnT") {
      return <>Up To Five Jobs</>;
    } else if (user.Subscription === "prod_QhkhzAomag0BYl") {
      return <>Unlimited Jobs</>;
    } else {
      return <>0</>;
    }
  };

  const dynamicJobDescription = (user) => {
    if (user.Subscription === "prod_QhkhnlumnEXxmK") {
      return <>Have access to two job posts.</>;
    } else if (user.Subscription === "prod_QhkhCfbfaSCQnT") {
      return <>Have access to five job posts.</>;
    } else if (user.Subscription === "prod_QhkhzAomag0BYl") {
      return <>Have access to unlimited job posts.</>;
    } else {
      return <></>;
    }
  };

  const dynamicJobSubCost = (user) => {
    if (user.Subscription === "prod_QhkhnlumnEXxmK") {
      return <>$2.00</>;
    } else if (user.Subscription === "prod_QhkhCfbfaSCQnT") {
      return <>$4.00</>;
    } else if (user.Subscription === "prod_QhkhzAomag0BYl") {
      return <>$10.00</>;
    } else {
      return <></>;
    }
  };

  const handleSubscription = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/customerPortal", {
      body: JSON.stringify({
        customer: user.CustomerId,
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
    <div className="my-8 flex flex-col items-center justify-center md:flex-row">
      <div className="mx-8 rounded-xl border-4 bg-gray-200 text-center shadow-2xl md:w-1/3">
        <div>
          <div className="items-center p-2 text-center">
            <p className="text-xl font-semibold text-orange-600">
              Current Plan
            </p>
            <h4 className="mt-3 text-2xl font-bold">
              {dynamicJobSubTitle(user)}
            </h4>
            <p className="mt-4 text-sm font-medium text-orange-600">
              {dynamicJobDescription(user)}
            </p>
            <p className="mt-2 text-sm font-medium">
              Post job openings for all job seekers to find.
            </p>
            <p className="mt-2 text-sm font-medium">
              You can always update and change your subscription or cancel at
              anytime.
            </p>
          </div>
          <div className="my-4 flex flex-row items-center justify-center gap-1">
            <h1 className="text-3xl font-bold">{dynamicJobSubCost(user)}</h1>
            <span className="text-xs">a month</span>
          </div>
          <div className="my-4 flex justify-center">
            <button onClick={handleSubscription} className="black_button">
              Change / Cancel
            </button>
          </div>
        </div>
      </div>
      <form className="mx-8 mt-8 flex w-auto flex-col items-center justify-center md:mt-0 md:w-1/3">
        <p className="text-base text-gray-600">
          To view your past purchases, download invoices, change your plan, or
          unsubscibe from a plan please select the Customer Portal to recieve an
          email link to get access to your account. From there you can edit all
          information related to the subscription.
        </p>
        <div className="my-4 flex justify-center">
          <button onClick={handleSubscription} className="outline_button">
            Customer Portal
          </button>
        </div>
      </form>
    </div>
  );
};

export default SubscriptionActive;
