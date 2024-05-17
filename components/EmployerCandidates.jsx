import React from "react";

const EmployerCandidates = ({ jobs }) => {
  return (
    <section>
      <div>
        <div className="flex flex-row items-center justify-between p-2 mx-3 border-b-2 border-gray-500">
          <h1 className="font-bold text-2xl">Candidates</h1>
        </div>

        <ul className="flex flex-row justify-between mx-3 p-2 border-b-2 border-gray-500">
          <li className="w-2/12 text-center">Candidate</li>
          <li className="w-4/12 text-center">Job Applied To</li>
          <li className="w-2/12 text-center">Message</li>
          <li className="w-3/12 text-center">Email</li>
          <li className="w-1/12 text-center">Options</li>
        </ul>
      </div>
    </section>
  );
};

export default EmployerCandidates;
