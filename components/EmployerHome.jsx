import React from "react";
import JobCard from "./JobCard";

const EmployerHome = ({ userInformation, jobData, asdf }) => {
  return (
    <section>
      <div className="flex flex-row items-center justify-between p-2 mx-3 border-b-2 border-gray-500">
        <h1 className="font-bold text-2xl">aasdf</h1>
        <div className="flex flex-col">
          <p>{asdf}</p>
          <p>qwer</p>
        </div>
      </div>
      {/* <div className="mt-16 prompt_layout">
        {jobData.map((post) => (
          <JobCard key={post._id} post={post} />
        ))}
      </div> */}
    </section>
  );
};

export default EmployerHome;
