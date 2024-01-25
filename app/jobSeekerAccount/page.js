import React from "react";
import Link from "next/link";

const JobSeekerAccount = () => {
  const name = "Eli Bodovinitz";
  const email = "ebodovinitz@gmail.com";
  const phoneNumber = "7634898813";

  return (
    <div className="w-1/2 p-5 bg-gray-100 border-2 border-black rounded">
      <div className="flex flex-row justify-between items-center">
        <h1 className="font-bold text-3xl">{name}</h1>
        <div className="flex flex-row">
          <Link className="outline_button mr-3" href={"/"}>
            Messaging
          </Link>
          <Link className="outline_button" href={"/"}>
            Settings
          </Link>
        </div>
      </div>
      <div className="flex flex-row items-center mt-10 justify-center">
        <div>
          <h2>{email}</h2>
          <h2>{phoneNumber}</h2>
        </div>
        <label for="resume" className="outline_button cursor-pointer ml-10">
          Upload your resume{" "}
        </label>
        <input
          type="file"
          id="resume"
          name="resume"
          accept=".doc, .docx, .pdf"
          title="resume"
          hidden
        />
      </div>
    </div>
  );
};

export default JobSeekerAccount;
