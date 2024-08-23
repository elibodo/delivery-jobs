import React from "react";
import { useState, useEffect } from "react";
import CandidateProfile from "./CandidateProfile";
import Pagination from "./Pagination";

const ApplicantInformation = ({ data, jobTitle, handleDelete }) => {
  const name = data;
  const email = data;
  const job = jobTitle;
  //Click to copy email address
  const [copied, setCopied] = useState("");
  const handleCopy = () => {
    setCopied(data);
    navigator.clipboard.writeText(data);
    setTimeout(() => setCopied(false), 3000);
  };

  //modal
  const [viewCandidate, setViewCandidate] = useState(false);
  const [applicantAccount, setApplicantAccount] = useState([]);
  useEffect(() => {
    const fetchAccount = async () => {
      const response = await fetch(`/api/account/${email}/jobseeker`);
      const data = await response.json();
      setApplicantAccount(data);
    };
    if (!viewCandidate) fetchAccount();
  }, []);

  return (
    <div className="flex flex-row justify-between items-center mx-3 my-1 p-1 border-b-2 border-gray-200">
      <p className="text-left w-3/12">{data}</p>
      <p className="text-left w-3/12">{jobTitle}</p>
      <select className="text-left w-1/12">
        <option value={""} selected></option>
        <option>Yes</option>
        <option>No</option>
      </select>
      <select className="text-left w-1/12">
        <option value={""} selected></option>
        <option>Keep</option>
        <option>Maybe</option>
        <option>Remove</option>
      </select>
      <div className="text-right w-2/12 space-x-3">
        {/* View profile */}
        <button className="has-tooltip" onClick={() => setViewCandidate(true)}>
          <span className="tooltip rounded shadow-lg p-1 bg-gray-500 text-black -mt-8">
            View candidate resume
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="size-5"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-5.5-2.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM10 12a5.99 5.99 0 0 0-4.793 2.39A6.483 6.483 0 0 0 10 16.5a6.483 6.483 0 0 0 4.793-2.11A5.99 5.99 0 0 0 10 12Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        {/* Message */}
        <button className="has-tooltip">
          <span className="tooltip rounded shadow-lg p-1 bg-gray-500 text-black -mt-8">
            Message Candidate
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="size-5"
          >
            <path
              fillRule="evenodd"
              d="M10 3c-4.31 0-8 3.033-8 7 0 2.024.978 3.825 2.499 5.085a3.478 3.478 0 0 1-.522 1.756.75.75 0 0 0 .584 1.143 5.976 5.976 0 0 0 3.936-1.108c.487.082.99.124 1.503.124 4.31 0 8-3.033 8-7s-3.69-7-8-7Zm0 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm-2-1a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm5 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        {/* Copy email */}
        <button className="has-tooltip" onClick={handleCopy}>
          <span className="tooltip rounded shadow-lg p-1 bg-gray-500 text-black -mt-8">
            Copy Candidates Email
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="size-5"
          >
            <path
              fillRule="evenodd"
              d="M5.404 14.596A6.5 6.5 0 1 1 16.5 10a1.25 1.25 0 0 1-2.5 0 4 4 0 1 0-.571 2.06A2.75 2.75 0 0 0 18 10a8 8 0 1 0-2.343 5.657.75.75 0 0 0-1.06-1.06 6.5 6.5 0 0 1-9.193 0ZM10 7.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        {/* Delete candidate */}
        <button onClick={handleDelete} className="has-tooltip">
          <span className="tooltip rounded shadow-lg p-1 bg-gray-500 text-black -mt-8">
            Delete Candidate
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="size-5"
          >
            <path
              fillRule="evenodd"
              d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      {applicantAccount.map((account) => (
        <CandidateProfile
          key={account._id}
          isVisible={viewCandidate}
          onClose={() => setViewCandidate(false)}
          name={name}
          email={email}
          job={job}
          account={account}
        />
      ))}
    </div>
  );
};

const MyCandidates = ({ post, handleDelete }) => {
  const jobApplicants = post.applicants;
  return (
    <div>
      <div>
        {jobApplicants.map((element) => (
          <ApplicantInformation
            data={element}
            jobTitle={post.title}
            handleDelete={() => handleDelete && handleDelete(element, post._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default MyCandidates;
