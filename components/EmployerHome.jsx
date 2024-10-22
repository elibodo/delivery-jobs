import React from "react";
import JobCard from "./JobCard";

const EmployerHome = ({ account, jobs, handleDelete }) => {
  return (
    <section>
      <div className="mx-2 flex flex-row items-center justify-between border-b-2 border-gray-500 p-2">
        <h1 className="text-xl font-bold md:text-2xl">{account.companyName}</h1>
        <div className="flex flex-col">
          <p className="hidden md:flex">{account.streetAddress}</p>
          <p className="hidden md:flex">
            {account.City}, {account.State} {account.ZipCode}
          </p>
        </div>
      </div>
      <div className="my-5 flex flex-col items-center justify-center space-y-5">
        {jobs.length !== 0 ? (
          <>
            {jobs.map((jobs) => (
              <div key={jobs._id} className="mx-2 flex flex-row gap-5">
                <JobCard
                  key={jobs._id}
                  post={jobs}
                  handleDelete={() => handleDelete && handleDelete(jobs)}
                />
              </div>
            ))}
          </>
        ) : (
          <p className="description mx-4 mb-4">
            Navigate to the Create Job page to create a Job.
          </p>
        )}
      </div>
    </section>
  );
};

export default EmployerHome;
