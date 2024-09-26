import React, { useState, useRef } from "react";

const JobSeekerJobPage = ({ jobs }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef(null); // Reference to the description element

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  // Safely access the payrange array
  const payrange = jobs?.payrange || ["", "", ""]; // Default value if undefined

  if (jobs === "Job Has Been Removed" || !jobs) {
    return null; // Return null if job has been removed or jobs is undefined
  }

  return (
    // The whole card is now a button
    <div
      onClick={toggleDescription}
      className="mx-2 mb-4 flex cursor-pointer flex-col rounded-xl border-b-2 border-gray-300 p-4 transition-all duration-300 ease-in-out hover:shadow-lg"
    >
      {/* Job Title and Company Name */}
      <div className="flex flex-row items-center justify-between">
        <p className="text-xl font-semibold text-orange-600">{jobs.title}</p>
        <p className="ml-8 text-base text-gray-800">{jobs.companyName}</p>
      </div>

      {/* Job Type, Salary Range, Location */}
      <p className="ml-3 mt-2 text-sm text-gray-600">{jobs.jobtype}</p>
      <p className="ml-3 mt-2 text-sm text-gray-600">
        From <span className="font-semibold">${payrange[0]}</span> -{" "}
        <span className="font-semibold">${payrange[1]}</span> a{" "}
        <span className="text-orange-600">{payrange[2]}</span>
      </p>
      <p className="ml-3 mt-2 text-sm text-gray-600">
        Dispatch Location:{" "}
        <span className="text-orange-600">{jobs.dispatchlocation}</span>
      </p>

      {/* Expandable Job Description */}
      <div
        ref={contentRef}
        className={`transition-max-height ml-3 mt-3 overflow-hidden whitespace-pre-wrap text-sm text-gray-700 duration-500 ease-in-out ${
          isExpanded ? "max-h-[1000px]" : "max-h-6"
        }`}
      >
        {jobs.description}

        {/* Additional Information */}
        {isExpanded && (
          <div className="ml-3 mt-4">
            <p className="mb-2 text-lg font-semibold text-orange-600">
              Additional Information:
            </p>
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
        )}
      </div>

      {/* Dynamic "Read More" or "Read Less" text */}
      <p className="ml-3 mt-2 text-orange-600 hover:underline focus:outline-none">
        {isExpanded ? "Read Less" : "Click Anywhere To Read More"}
      </p>
    </div>
  );
};

export default JobSeekerJobPage;
