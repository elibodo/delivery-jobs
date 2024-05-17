import React from "react";

const EmployerHome = ({ account }) => {
  return (
    <section>
      <div className="flex flex-row items-center justify-between p-2 mx-3 border-b-2 border-gray-500">
        <h1 className="font-bold text-2xl">{account.companyName}</h1>
        <div className="flex flex-col">
          <p>{account.streetAddress}</p>
          <p>
            {account.City}, {account.State} {account.ZipCode}
          </p>
        </div>
      </div>
    </section>
  );
};

export default EmployerHome;
