import React from "react";

const JobSeekerJobPage = ({ jobs }) => {
  return (
    <div className="flex flex-col mx-8 my-5 pb-3 border-b-2 border-gray-300">
      <div className="flex flex-row items-center">
        <p className="text-lg font-semibold">{jobs.title}</p>
        <p className="text-base ml-8">{jobs.companyName}</p>
      </div>
      <p className="text-sm ml-3 mt-3 text-gray-700 whitespace-pre-wrap">
        {jobs.description}
      </p>
    </div>
  );
};

export default JobSeekerJobPage;
