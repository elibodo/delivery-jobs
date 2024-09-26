"use client";

import { useSession } from "next-auth/react";
import React, { Fragment, useEffect, useState } from "react";

const JobSeekerHome = ({ account }) => {
  const { data: session } = useSession();

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
    <div className="flex w-full flex-col p-5">
      {/* Top of resume */}
      <h1 className="ml-5 text-3xl font-semibold">{session.user.name}</h1>
      <div className="mt-3 flex flex-col justify-between border-b-2 border-gray-500 pb-3 md:flex-row">
        <div className="ml-5 flex flex-col">
          <h2 className="text-base font-medium">{account.email}</h2>
          <h2 className="text-base font-medium">{session.user.phoneNumber}</h2>
        </div>
        <div className="ml-5 mt-2 flex flex-col md:ml-0 md:mr-5 md:mt-0">
          <h2 className="text-base font-medium">
            {account.city}, {account.state}
          </h2>
          <h2 className="text-base font-medium">{account.zipCode}</h2>
        </div>
      </div>

      {/* liscense and dot section */}
      <div className="flex flex-col">
        <div className="flex flex-col md:flex-row">
          <div className="mx-4 md:w-1/3">
            <p className="mt-5 text-xl text-gray-600">License Information</p>
            <div className="ml-2">
              <p className="mt-3 text-gray-800">
                License Class:{" "}
                <span className="font-semibold">{account.licenseClass}</span>
              </p>
              <p className="mt-1 text-gray-800">
                License Expire:{" "}
                <span className="font-semibold">{lisenseDate}</span>
              </p>
              <p className="mt-1 text-gray-800">
                Issuing State:{" "}
                <span className="font-semibold">{account.licenseState}</span>
              </p>
            </div>
          </div>
          {account.DOT === "Yes" ? (
            <div className="mx-4 md:w-1/3">
              <p className="mt-5 text-xl text-gray-600">DOT Information</p>
              <div className="ml-2">
                <p className="mt-3 text-gray-800">
                  DOT Medical Card:{" "}
                  <span className="font-semibold">{account.DOT}</span>
                </p>
                <p className="mt-1 text-gray-800">
                  DOT Expire: <span className="font-semibold">{dotDate}</span>
                </p>
              </div>
            </div>
          ) : (
            <div className="mx-4 md:w-1/3"></div>
          )}
          {/* cdl */}
          {account.CDL === "Yes" ? (
            <div className="mx-4 md:w-1/3">
              <p className="mt-5 text-xl text-gray-600">CDL Information</p>
              <div className="ml-2">
                <p className="mt-3 text-gray-800">
                  CDL: <span className="font-semibold">{account.CDL}</span>
                </p>
                <p className="mt-1 text-gray-800">
                  Twik Card:{" "}
                  <span className="font-semibold">{account.twikCard}</span>
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
        {/* Education, endorsements, and certificates */}
        <div className="flex flex-col md:flex-row">
          <div className="mx-4 md:w-1/3">
            <p className="mt-5 text-xl text-gray-600 md:mt-10">Education</p>
            <div className="ml-2 mt-1">
              <p className="mt-3 text-gray-800">
                Highest Level:{" "}
                <span className="font-semibold">{account.educationLevel}</span>
              </p>
              <p className="mt-1 text-gray-800">
                Date Completed: <span className="font-semibold">{eduDate}</span>
              </p>
            </div>
          </div>
          {certs != "" ? (
            <div className="mx-4 md:w-1/3">
              <p className="mb-3 mt-5 text-xl text-gray-600 md:mt-10">
                Certifications:{" "}
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
              <p className="mt-5 text-xl text-gray-600 md:mt-10">
                Endorsements
              </p>
              <div className="ml-2">
                <p className="mt-3 font-semibold">{theEndorsements}</p>
              </div>
            </div>
          )}
        </div>
        {/* Work experience */}
        {work != "" ? (
          <div className="flex flex-row">
            <div className="mx-4">
              <p className="mb-3 mt-5 text-xl text-gray-600 md:mt-10">
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
                    <p className="mx-2 mt-1 text-gray-800">{work.duties}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}

        {/* additional information */}
        <div className="flex flex-row">
          <div className="mx-4 md:w-1/3">
            <p className="mt-5 text-xl text-gray-600 md:mt-10">
              Additional Information
            </p>
            <div className="ml-2 mt-1">
              <p className="mt-3 text-gray-800">
                Recent Car Accident:{" "}
                <span className="font-semibold">{account.carAccident}</span>
              </p>
              <p className="mt-1 text-gray-800">
                Recent DUI: <span className="font-semibold">{account.DUI}</span>
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
  );
};

export default JobSeekerHome;
