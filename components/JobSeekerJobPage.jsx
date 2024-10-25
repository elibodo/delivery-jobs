import React, { useState, useRef } from "react";

const JobSeekerJobPage = ({ jobs }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef(null);

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  // Safely access the payrange array
  const payrange = jobs?.payrange || ["", "", ""];
  const additionalpay = jobs?.additionalpay || ["", ""];

  if (jobs === "Job Has Been Removed" || !jobs) {
    return null;
  }

  return (
    <div
      onClick={toggleDescription}
      className="mx-2 my-4 flex cursor-pointer flex-col rounded-lg bg-gray-200 p-4 shadow-lg"
    >
      {/* Job Title and Company Name */}
      <div className="flex flex-row items-center justify-between">
        <p className="text-xl font-semibold">{jobs.title}</p>
        <p className="ml-8 text-base text-gray-800">{jobs.companyName}</p>
      </div>

      {/* Job Type, Salary Range, Location */}
      <p className="ml-3 mt-2 text-sm text-gray-600">{jobs.jobtype}</p>
      <p className="ml-3 mt-2 text-sm text-gray-600">
        From <span className="font-semibold">${payrange[0]}</span> -{" "}
        <span className="font-semibold">${payrange[1]}</span> a{" "}
        <span className="">{payrange[2]}</span>
      </p>
      <p className="ml-3 mt-2 text-sm text-gray-600">
        <strong>Dispatch Location:</strong> {jobs.dispatchlocation}
      </p>

      {/* Expandable Job Description */}
      <div
        ref={contentRef}
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isExpanded ? "max-h-[2500px]" : "max-h-0"
        }`}
        style={{ transitionProperty: "max-height" }}
      >
        <div
          className="prose prose-sm whitespace-pre-line break-words pb-4 text-sm prose-h1:pb-1 prose-h1:pt-2 prose-h1:text-base prose-h1:font-semibold prose-p:my-0 prose-p:py-0 prose-p:text-sm prose-li:my-0 prose-li:py-0 md:ml-6"
          dangerouslySetInnerHTML={{ __html: jobs.description }}
        />
        {/* Additional Information */}
        <div className="ml-3 mt-4">
          <p className="mb-2 text-lg font-semibold text-orange-600">
            Additional Information:
          </p>
          {jobs.additionalpay &&
            jobs.additionalpay[0] &&
            jobs.additionalpay[1] && (
              <p className="mt-1 text-sm text-gray-600">
                <strong>Additional Pay:</strong> ${jobs.additionalpay[0]} per{" "}
                {jobs.additionalpay[1]}
              </p>
            )}
          <p className="mt-1 text-sm text-gray-600">
            <strong>Delivery Locations:</strong> {jobs.deliverylocation}
          </p>
          <p className="mt-1 text-sm text-gray-600">
            <strong>Experience Required:</strong> {jobs.experiencerequired}
          </p>
          <p className="mt-1 text-sm text-gray-600">
            <strong>Operating Days:</strong>{" "}
            {jobs.workdays?.join(", ") || "N/A"}
          </p>
          <p className="mt-1 text-sm text-gray-600">
            <strong>Company Benefits:</strong>{" "}
            {jobs.benefits?.join(", ") || "N/A"}
          </p>
          <p className="mt-1 text-sm text-gray-600">
            <strong>Position Type:</strong> {jobs.jobformat}
          </p>
          <p className="mt-1 text-sm text-gray-600">
            <strong>US Work Authorization:</strong> {jobs.workauthorization}
          </p>
          <p className="mt-1 text-sm text-gray-600">
            <strong>Drug Test:</strong> {jobs.drugtest}
          </p>
          <p className="mt-1 text-sm text-gray-600">
            <strong>Background Check:</strong> {jobs.backgroundcheck}
          </p>
          <p className="mt-1 text-sm text-gray-600">
            <strong>DOT Medical Card:</strong> {jobs.dotcard}
          </p>
        </div>
      </div>

      {/* Dynamic "Read More" or "Read Less" text */}
      <p className="ml-3 mt-2 text-orange-600 hover:underline focus:outline-none">
        {isExpanded ? "Read Less" : "Click Anywhere To Read More"}
      </p>
    </div>
  );
};

export default JobSeekerJobPage;
