import React from "react";

const MyJobs = () => {
  const companyName = "White Sands Delivery Inc";

  return (
    <div>
      <div className="flex flex-row items-center justify-between p-2 mx-3 border-b-2 border-gray-500">
        <h1 className="font-bold text-2xl">My Jobs</h1>
        <p className="">{companyName}</p>
      </div>

      <ul className="flex flex-row justify-between mx-3 p-2 border-b-2 border-gray-500">
        <li>Job Title</li>
        <li>Location</li>
        <li>Applicants</li>
        <li>Cost</li>
        <li>Date</li>
        <li>Status</li>
        <li>Actions</li>
      </ul>
    </div>
  );
};

export default MyJobs;
