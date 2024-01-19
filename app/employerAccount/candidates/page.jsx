import React from "react";

const Candidates = () => {
  const companyName = "White Sands Delivery Inc";

  return (
    <div>
      <div className="flex flex-row items-center justify-between p-2 mx-3 border-b-2 border-gray-500">
        <h1 className="font-bold text-2xl">Candidates</h1>
        <p className="">{companyName}</p>
      </div>

      <ul className="flex flex-row justify-between mx-3 p-2 border-b-2 border-gray-500">
        <li>Candidate</li>
        <li>Applied to</li>
        <li>Message</li>
        <li>Email</li>
        <li>Options</li>
      </ul>
    </div>
  );
};

export default Candidates;
