import React from "react";
import MyCandidates from "./MyCandidates";

const EmployerCandidates = ({ account, jobs, handleDelete }) => {
  return (
    <section>
      {/* <div className="flex flex-row items-center justify-between p-2 mx-3 border-b-2 border-gray-500">
        <h1 className="font-bold text-2xl">Candidates</h1>
        <h1 className="font-bold text-xl hidden md:flex">
          {account.companyName}
        </h1>
      </div> */}
      <div className="container mx-auto rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead>
              <tr className=" text-lg">
                <th className="py-2 px-4 border-b-2 border-black">Candidate</th>
                <th className="py-2 px-4 border-b-2 border-black">Job</th>
                <th className="py-2 px-4 border-b-2 border-black">Contacted</th>
                <th className="py-2 px-4 border-b-2 border-black">Status</th>
                <th className="py-2 px-4 border-b-2 border-black">Options</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((jobs) => (
                <MyCandidates
                  key={jobs._id}
                  post={jobs}
                  handleDelete={handleDelete}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default EmployerCandidates;
