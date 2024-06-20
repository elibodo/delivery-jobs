import React from "react";

const CandidateProfile = ({
  isVisible,
  onClose,
  name,
  email,
  job,
  account,
}) => {
  if (!isVisible) return null;
  return (
    <div className="absolute overscroll-none overflow-auto inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <div className="w-[750px]] h-svh">
        <div className="bg-gray-100 p-2 rounded">
          {/* test */}
          <div className="flex flex-col w-full p-5 rounded-lg">
            <div className="flex flex-row items-center content-between justify-between">
              <h1 className="text-3xl font-bold">{name}</h1>
              <div className="flex flex-col items-end">
                <h2 className="text-base font-semibold">{email}</h2>
                <h2 className="text-base font-semibold">
                  {account.city}, {account.state}
                </h2>
                <h2 className="text-base font-semibold">{account.zipCode}</h2>
              </div>
            </div>
            <div className="flex flex-row gap-10 mt-5 mb-2">
              <div className="flex flex-col mx-5">
                <h3 className="font-bold">License Information</h3>
                <p>
                  License Class:{" "}
                  <span className="font-bold capitalize">
                    {account.licenseClass}
                  </span>
                </p>
                <p>
                  Issuing State:{" "}
                  <span className="font-bold">{account.licenseState}</span>
                </p>
                <p>
                  Expires:{" "}
                  <span className="font-bold">{account.licenseExpire}</span>
                </p>
              </div>
              <div className="flex flex-col mx-5">
                <h3 className="font-bold">CDL Information</h3>
                <p>
                  CDL: <span className="font-bold">{account.CDL}</span>
                </p>
                <p>
                  Twik Card:{" "}
                  <span className="font-bold">{account.twikCard}</span>
                </p>
                <p>
                  Options:{" "}
                  <span className="font-bold">
                    {account.CDLOption1} {account.CDLOption2}
                  </span>
                </p>
              </div>
            </div>
            <div className="flex flex-row gap-10 mt-8 mb-2">
              <div className="flex flex-col mx-5">
                <h3 className="font-bold">DOT Information</h3>
                <p>
                  DOT Medical Card:{" "}
                  <span className="font-bold">{account.DOT}</span>
                </p>
                <p>
                  Expires:{" "}
                  <span className="font-bold">{account.DOTExpire}</span>
                </p>
              </div>
              <div className="flex flex-col mx-5">
                <h3 className="font-bold">Endorsements</h3>
                <p>
                  <span className="font-bold text-balance">{}</span>
                </p>
              </div>
            </div>
            <div className="flex flex-row gap-10 mt-8 mb-2">
              <div className="flex flex-col mx-5">
                <h3 className="font-bold">Education</h3>
                <p>
                  Highest Level of Education:{" "}
                  <span className="font-bold">{account.educationLevel}</span>
                </p>
                <p>
                  Date Completed:{" "}
                  <span className="font-bold">{account.educationDate}</span>
                </p>
                <p>Certificates: </p>
              </div>
            </div>
            <div className="flex flex-row gap-10 mt-8 mb-2">
              <div className="flex flex-col mx-5">
                <h3 className="font-bold">Work History</h3>
                <p>
                  Title:{" "}
                  <span className="font-bold">
                    {account.experienceArray[0].title}
                  </span>
                </p>
                <p>
                  Company:{" "}
                  <span className="font-bold">
                    {account.experienceArray[0].company}
                  </span>
                </p>
                <p>
                  Lenth:{" "}
                  <span className="font-bold">
                    {account.experienceArray[0].length}
                  </span>
                  {" year(s)"}
                </p>
              </div>
              <div className="flex flex-col mx-5 max-w-72">
                <p>Job Duties: </p>
                <p className="font-bold text-wrap">
                  {account.experienceArray[0].duties}
                </p>
              </div>
            </div>
            <div className="flex flex-row gap-10 mt-8 mb-2">
              <div className="flex flex-col mx-5">
                <h3 className="font-bold">Additional Information</h3>
                <p>
                  Recent car accident:{" "}
                  <span className="font-bold">{account.carAccident}</span>
                </p>
                <p>
                  Recent DUI: <span className="font-bold">{account.DUI}</span>
                </p>
                <p>
                  Age Range:{" "}
                  <span className="font-bold">{account.ageRange}</span>
                </p>
              </div>
            </div>
          </div>
          {/* test */}
          <div className="flex flex-row justify-center p-2">
            <button className="black_button" onClick={() => onClose()}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateProfile;
