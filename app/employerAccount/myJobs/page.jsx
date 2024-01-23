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
        <li className="w-3/12 text-center">Job Title</li>
        <li className="w-2/12 text-center">Location</li>
        <li className="w-3/12 text-center">Applicants</li>
        <li className="w-1/12 text-center">Cost</li>
        <li className="w-1/12 text-center">Date</li>
        <li className="w-1/12 text-center">Status</li>
        <li className="w-1/12 text-center">Actions</li>
      </ul>
    </div>
  );
};

export default MyJobs;
