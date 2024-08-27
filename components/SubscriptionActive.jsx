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
    <div className="flex flex-col md:flex-row items-center justify-center my-8">
      <div className="mx-8 md:w-1/3 bg-gray-200 shadow-2xl border-4 text-center rounded-xl">
        <div>
          <div className="items-center text-center p-2">
            <p className="font-semibold text-xl text-orange-600">
              Current Plan
            </p>
            <h4 className="text-2xl font-bold mt-3">
              {dynamicJobSubTitle(user)}
            </h4>
            <p className="font-medium text-sm mt-4 text-orange-600">
              {dynamicJobDescription(user)}
            </p>
            <p className="font-medium text-sm mt-2">
              Post job openings for all job seekers to find.
            </p>
            <p className="font-medium text-sm mt-2">
              You can always update and change your subscription or cancel at
              anytime.
            </p>
          </div>
          <div className="flex flex-row items-center justify-center my-4 gap-1">
            <h1 className="text-3xl font-bold">{dynamicJobSubCost(user)}</h1>
            <span className="text-xs">a month</span>
          </div>
          <div className="flex justify-center my-4">
            <button onClick={handleSubscription} className="black_button">
              Change / Cancel
            </button>
          </div>
        </div>
      </div>
      <form className="mx-8 mt-8 md:mt-0 md:w-1/3 flex flex-col justify-center items-center w-auto">
        <p className="text-gray-600 text-base">
          To view your past purchases, download invoices, change your plan, or
          unsubscibe from a plan please select the Customer Portal to recieve an
          email link to get access to your account. From there you can edit all
          information related to the subscription.
        </p>
        <div className="justify-center flex my-4">
          <button onClick={handleSubscription} className="outline_button">
            Customer Portal
          </button>
        </div>
      </form>
    </div>
  );
};

export default SubscriptionActive;
