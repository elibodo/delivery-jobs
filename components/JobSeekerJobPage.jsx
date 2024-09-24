import React from "react";

const JobSeekerJobPage = ({ jobs }) => {
  return (
    <div className="mx-8 my-5 flex flex-col border-b-2 border-gray-300 pb-3">
      <div className="flex flex-row items-center">
        <p className="text-lg font-semibold">{jobs.title}</p>
        <p className="ml-8 text-base">{jobs.companyName}</p>
      </div>
      <p className="ml-3 mt-3 whitespace-pre-wrap text-sm text-gray-700">
        {jobs.description}
      </p>
    </div>
  );
};

export default JobSeekerJobPage;
