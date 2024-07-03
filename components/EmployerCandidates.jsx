import React from "react";
import MyCandidates from "./MyCandidates";

const EmployerCandidates = ({ account, jobs, handleDelete }) => {
  return (
    <section>
      <div>
        <div className="flex flex-row items-center justify-between p-2 mx-3 border-b-2 border-gray-500">
          <h1 className="font-bold text-2xl">Candidates</h1>
          <h1 className="font-bold text-2xl">{account.companyName}</h1>
        </div>
        <ul className="flex flex-row justify-between mx-3 p-2 border-b-2 border-gray-500">
          <li className="w-3/12 text-left font-semibold">Candidate</li>
          <li className="w-3/12 text-left font-semibold">Job Applied To</li>
          <li className="w-1/12 text-left font-semibold">Communication</li>
          <li className="w-1/12 text-center font-semibold">Status</li>
          <li className="w-2/12 text-left font-semibold"></li>
        </ul>
        <div>
          {jobs.map((jobs) => (
            <MyCandidates
              key={jobs._id}
              post={jobs}
              handleDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EmployerCandidates;
