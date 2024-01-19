import React from "react";

const EmployerAccountHome = () => {
  const companyName = "White Sands Delivery Inc";
  const companyLocation = "Palmetto, Fl";
  const companyEmail = "whitesandsdeliveryinc@gmail.com";

  return (
    <div className="flex flex-row items-center justify-between p-2 mx-3 border-b-2 border-gray-500">
      <h1 className="font-bold text-2xl">{companyName}</h1>
      <div className="flex flex-col">
        <p>{companyLocation}</p>
        <p>{companyEmail}</p>
      </div>
    </div>
  );
};

export default EmployerAccountHome;
