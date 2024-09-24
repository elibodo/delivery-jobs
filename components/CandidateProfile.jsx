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
  const myEndorsements = account.endorsements;
  let theEndorsements = myEndorsements.join(", ");

  const lisenseDate = new Date(account.licenseExpire).toLocaleDateString(
    "en-US",
    { timeZone: "UTC" },
  );
  const dotDate = new Date(account.DOTExpire).toLocaleDateString("en-US", {
    timeZone: "UTC",
  });
  const eduDate = new Date(account.educationDate).toLocaleDateString("en-US", {
    timeZone: "UTC",
  });
  const certs = account.certificates;
  const work = account.experienceArray;

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 top-0 z-30 flex items-center justify-center overflow-y-auto bg-black bg-opacity-25 backdrop-blur-sm">
        <div className="m-auto flex w-full flex-col gap-6 bg-gray-100 p-6 md:w-[700px] [&>*]:mx-auto">
          <div className="flex w-full flex-col p-5">
            {/* Top of resume */}

            <div className="mt-3 flex flex-col items-center justify-between border-b-2 border-gray-500 pb-3 md:flex-row">
              <h1 className="text-2xl font-semibold md:ml-5">
                {account.email}
              </h1>
              <h2 className="text-base font-medium">
                {account.city}, {account.state}
              </h2>
              <h2 className="text-base font-medium">{account.zipCode}</h2>
            </div>

            {/* liscense and dot section */}
            <div className="flex flex-col">
              <div className="flex flex-col md:flex-row">
                <div className="mx-4 md:w-1/3">
                  <p className="mt-5 text-xl text-gray-600">
                    License Information
                  </p>
                  <div className="ml-2">
                    <p className="mt-3 text-gray-800">
                      License Class:{" "}
                      <span className="font-semibold">
                        {account.licenseClass}
                      </span>
                    </p>
                    <p className="mt-1 text-gray-800">
                      License Expire:{" "}
                      <span className="font-semibold">{lisenseDate}</span>
                    </p>
                    <p className="mt-1 text-gray-800">
                      Issuing State:{" "}
                      <span className="font-semibold">
                        {account.licenseState}
                      </span>
                    </p>
                  </div>
                </div>
                {account.DOT === "Yes" ? (
                  <div className="mx-4 md:w-1/3">
                    <p className="mt-5 text-xl text-gray-600">
                      DOT Information
                    </p>
                    <div className="ml-2">
                      <p className="mt-3 text-gray-800">
                        DOT Medical Card:{" "}
                        <span className="font-semibold">{account.DOT}</span>
                      </p>
                      <p className="mt-1 text-gray-800">
                        DOT Expire:{" "}
                        <span className="font-semibold">{dotDate}</span>
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="mx-4 md:w-1/3"></div>
                )}
                {/* cdl */}
                {account.CDL === "Yes" ? (
                  <div className="mx-4 md:w-1/3">
                    <p className="mt-5 text-xl text-gray-600">
                      CDL Information
                    </p>
                    <div className="ml-2">
                      <p className="mt-3 text-gray-800">
                        CDL:{" "}
                        <span className="font-semibold">{account.CDL}</span>
                      </p>
                      <p className="mt-1 text-gray-800">
                        Twik Card:{" "}
                        <span className="font-semibold">
                          {account.twikCard}
                        </span>
                      </p>
                      <p className="mt-1 text-gray-800">
                        Options:{" "}
                        <span className="font-semibold">
                          {account.CDLOption1} {account.CDLOption2}
                        </span>
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="mx-4 md:w-1/3"></div>
                )}
              </div>
              <div className="flex flex-col md:flex-row">
                <div className="mx-4 md:w-1/3">
                  <p className="mt-5 text-xl text-gray-600">Education</p>
                  <div className="ml-2 mt-1">
                    <p className="mt-3 text-gray-800">
                      Highest Level:{" "}
                      <span className="font-semibold">
                        {account.educationLevel}
                      </span>
                    </p>
                    <p className="mt-1 text-gray-800">
                      Date Completed:{" "}
                      <span className="font-semibold">{eduDate}</span>
                    </p>
                  </div>
                </div>

                {certs != "" ? (
                  <div className="mx-4 md:w-1/3">
                    <p className="mb-3 mt-5 text-xl text-gray-600">
                      Certifications{" "}
                    </p>
                    <div className="ml-2 mt-1">
                      {certs.map((cert) => (
                        <p key={cert._id} className="font-semibold">
                          {cert.certification}
                        </p>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="mx-4 md:w-1/3"></div>
                )}
                {theEndorsements === "" ? (
                  <div className="mx-4 md:w-1/3"></div>
                ) : (
                  <div className="mx-4 md:w-1/3">
                    <p className="mt-5 text-xl text-gray-600">Endorsements</p>
                    <div className="ml-2">
                      <p className="mt-3 font-semibold">{theEndorsements}</p>
                    </div>
                  </div>
                )}
              </div>
              {work != "" ? (
                <div className="flex flex-row">
                  <div className="mx-4">
                    <p className="mb-3 mt-5 text-xl text-gray-600">
                      Work History
                    </p>
                    <div className="ml-2 mt-3">
                      {work.map((work) => (
                        <div
                          key={work._id}
                          className="mt-3 border-b-2 border-gray-300 pb-3"
                        >
                          <p className="text-lg font-semibold">{work.title}</p>
                          <p className="mx-2 mt-1 text-gray-800">
                            <span className="font-semibold">
                              {work.company}
                              {" : "}
                            </span>

                            {work.length}
                            {" year(s)"}
                          </p>
                          <p className="mx-2 mt-1 text-gray-800">
                            {work.duties}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <></>
              )}

              <div className="flex flex-row">
                <div className="mx-4 md:w-1/3">
                  <p className="mt-5 text-xl text-gray-600">
                    Additional Information
                  </p>
                  <div className="ml-2 mt-1">
                    <p className="mt-3 text-gray-800">
                      Recent Car Accident:{" "}
                      <span className="font-semibold">
                        {account.carAccident}
                      </span>
                    </p>
                    <p className="mt-1 text-gray-800">
                      Recent DUI:{" "}
                      <span className="font-semibold">{account.DUI}</span>
                    </p>
                    <p className="mt-1 text-gray-800">
                      Age Range:{" "}
                      <span className="font-semibold">{account.ageRange}</span>
                    </p>
                  </div>
                </div>
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
    </>
  );
};

export default CandidateProfile;
