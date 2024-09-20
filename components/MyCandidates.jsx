"use client";

import React from "react";
import { useState, useEffect } from "react";
import CandidateProfile from "./CandidateProfile";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const ApplicantInformation = ({ data, jobTitle, handleDelete, jobId }) => {
  const name = data.name;
  const email = data.email;
  const job = jobTitle;

  const router = useRouter();
  const { data: session } = useSession();
  const currentUser = session.user.id;

  //Click to copy email address
  const [copied, setCopied] = useState("");
  const handleCopy = () => {
    setCopied(data.email);
    navigator.clipboard.writeText(data.email);
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

  const createChat = async () => {
    const res = await fetch("/api/chats", {
      method: "POST",
      body: JSON.stringify({
        currentUserId: currentUser,
        member: email,
        jobId: jobId,
      }),
    });
    const chat = await res.json();

    if (res.ok) {
      router.push(`/employerAccount/employerMessaging/${chat._id}`);
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 justify-items-center">
        <button onClick={() => setViewCandidate(true)}>
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
        <button onClick={createChat}>
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
        <button onClick={handleCopy}>
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
        <button onClick={handleDelete}>
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
    </>
  );
};

const MyCandidates = ({ post, handleDelete }) => {
  const jobApplicants = post.applicants;

  const handleContacted = async (e, applicant) => {
    e.preventDefault();
    const { value } = e.target;
    try {
      await fetch("/api/candidate/contactedUpdate", {
        method: "PATCH",
        body: JSON.stringify({
          option: value,
          applicantEmail: applicant,
          jobId: post._id,
        }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatus = async (e, applicant) => {
    e.preventDefault();
    const { value } = e.target;
    try {
      await fetch("/api/candidate/statusUpdate", {
        method: "PATCH",
        body: JSON.stringify({
          option: value,
          applicantEmail: applicant,
          jobId: post._id,
        }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {jobApplicants.map((applicant) => (
        <tr key={applicant._id}>
          <td className="text-left py-1.5 px-4 border-b">
            <p className="font-semibold text-nowrap">{applicant.name}</p>
            <p className="text-nowrap">{applicant.email}</p>
          </td>
          <td className="text-left py-1.5 px-4 border-b">
            <p className="font-semibold text-nowrap">{post.title}</p>
            <p>Applied {applicant.dateOfApply}</p>
          </td>
          <td className="text-left py-1.5 px-4 border-b">
            <select
              defaultValue={applicant.contacted}
              onChange={(e) => handleContacted(e, applicant.email)}
            >
              <option value={""}></option>
              <option value={"Yes"}>Yes</option>
              <option value={"No"}>No</option>
            </select>
          </td>
          <td className="text-left py-1.5 px-4 border-b">
            <select
              defaultValue={applicant.status}
              onChange={(e) => handleStatus(e, applicant.email)}
            >
              <option value={""}></option>
              <option value={"Keep"}>Keep</option>
              <option value={"Maybe"}>Maybe</option>
              <option value={"Remove"}>Remove</option>
            </select>
          </td>
          <td className="py-1.5 px-4 border-b">
            <ApplicantInformation
              key={applicant._id}
              data={applicant}
              jobTitle={post.title}
              jobId={post._id}
              handleDelete={() =>
                handleDelete && handleDelete(applicant.email, post._id)
              }
            />
          </td>
        </tr>
      ))}
    </>
  );
};

export default MyCandidates;
