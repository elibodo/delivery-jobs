"use client";

import React, { Fragment, useState } from "react";
import JobSeekerModal from "@components/JobSeekerModal";

const JobSeekerAccount = () => {
  const name = "Eli Bodovinitz";
  const email = "ebodovinitz@gmail.com";
  const phoneNumber = "7634898813";

  const [settings, setSettings] = useState(false);
  const [licenseInfo, setLicenseInfo] = useState(false);
  const [experience, setExperience] = useState(false);
  const [education, setEducation] = useState(false);

  return (
    <Fragment>
      <div className="w-3/5 p-10 bg-gray-100 border-2 border-black rounded-2xl">
        <div className="flex flex-row justify-between items-center">
          <h1 className="font-bold text-3xl">{name}</h1>
        </div>
        <div className="flex flex-row justify-between mt-10">
          <h2>("email")</h2>
          <label for="resume" className="outline_button w-44 h-9">
            Upload your resume{" "}
            <input
              type="file"
              id="resume"
              name="resume"
              accept=".doc, .docx, .pdf"
              title="resume"
              hidden
            />
          </label>
        </div>
        <div className="flex flex-row justify-between mt-4">
          <h2>("phoneNumber")</h2>
          <button
            className="outline_button w-32 h-9"
            onClick={() => setSettings(true)}
          >
            Settings
          </button>
        </div>
        <div className="flex flex-row justify-between mt-4">
          <h2>License Information</h2>
          <button
            className="outline_button w-32 h-9"
            onClick={() => setLicenseInfo(true)}
          >
            Add / Edit
          </button>
        </div>
        <div className="flex flex-row justify-between mt-4">
          <h2>Work Experience</h2>
          <button
            className="outline_button w-32 h-9"
            onClick={() => setExperience(true)}
          >
            Add / Edit
          </button>
        </div>
        <div className="flex flex-row justify-between mt-4">
          <h2>Education</h2>
          <button
            className="outline_button w-32 h-9"
            onClick={() => setEducation(true)}
          >
            Add / Edit
          </button>
        </div>
      </div>

      {/* Settings */}
      <JobSeekerModal isVisible={settings} onClose={() => setSettings(false)}>
        <div className="flex flex-row px-8 pt-5">
          <h1 className="font-bold text-lg mb-3">Settings</h1>
        </div>
        <div className="px-8 flex flex-row items-center justify-between">
          <div className="flex flex-col">
            <label className="text-gray-900 font-semibold">
              Name
              <input
                type="text"
                className="form_input2 mt-2"
                placeholder={name}
              ></input>
            </label>
            <label className="text-gray-900 font-semibold mt-5">
              Phone Number
              <input
                type="text"
                className="form_input2 mt-2"
                placeholder={phoneNumber}
              ></input>
            </label>
          </div>
        </div>
      </JobSeekerModal>

      {/* License Information */}
      <JobSeekerModal
        isVisible={licenseInfo}
        onClose={() => setLicenseInfo(false)}
      >
        <div className="flex flex-row px-8 pt-5">
          <h1 className="font-bold text-lg mb-3">License Information</h1>
        </div>
        <div className=" px-8 flex flex-row items-center justify-between">
          <div className="flex flex-col">
            <label className="text-gray-900 font-semibold">
              Class of License
              <select className="form_input2 mt-2">
                <option value={""} disabled selected hidden>
                  Choose an Option
                </option>
                <option value={"Class A"}>Class A</option>
                <option value={"Class B"}>Class B</option>
                <option value={"Class C"}>Class C</option>
                <option value={"Class D"}>Class D</option>
                <option value={"Class E"}>Class E</option>
              </select>
            </label>
            <label className="text-gray-900 font-semibold mt-5">
              CDL Only
              <select className="form_input2 mt-2">
                <option value={""} disabled selected hidden>
                  Choose an Option
                </option>
                <option value={"Nonexcepted"}>Nonexcepted</option>
                <option value={"Excepted"}>Excepted</option>
                <option value={"Intrastate"}>Intrastate</option>
                <option value={"Interstate"}>Interstate</option>
                <option value={"None Apply"}>None Apply</option>
              </select>
            </label>
          </div>
          <div className="flex flex-col justify-evenly">
            <label className="text-gray-900 font-semibold">
              Issuing State
              <input
                type="text"
                className="form_input2 mt-2"
                placeholder="Florida"
              ></input>
            </label>
            <label className="text-gray-900 font-semibold mt-5">
              Expiration Date
              <input type="date" className="form_input2 mt-2"></input>
            </label>
          </div>
        </div>
      </JobSeekerModal>

      {/* Experience */}
      <JobSeekerModal
        isVisible={experience}
        onClose={() => setExperience(false)}
      >
        <div className="flex flex-row px-8 pt-5">
          <h1 className="font-bold text-lg mb-3">
            Work Experence (Two most recent jobs)
          </h1>
        </div>
        <div className="px-8 flex flex-row items-center justify-between">
          <div className="flex flex-col">
            <label className="text-gray-900 font-semibold">
              Title
              <input
                type="text"
                className="form_input2 mt-2"
                placeholder="Delivery Driver"
              ></input>
            </label>
            <label className="text-gray-900 font-semibold mt-5">
              Length
              <input
                type="text"
                className="form_input2 mt-2"
                placeholder="3 Years"
              ></input>
            </label>
          </div>
          <div className="flex flex-col justify-evenly">
            <label className="mt-5 text-gray-900 font-semibold">
              Job Duties
              <textarea
                placeholder="Write your job duties here..."
                className=" resize-none flex rounded-lg w-[275px] h-[150px] mt-2 p-3 text-sm text-gray-700 outline-0"
              ></textarea>
            </label>
          </div>
        </div>
        <div className=" px-8 flex flex-row items-center justify-between">
          <div className="flex flex-col">
            <label className="text-gray-900 font-semibold">
              Title
              <input
                type="text"
                className="form_input2 mt-2"
                placeholder="Delivery Driver"
              ></input>
            </label>
            <label className="text-gray-900 font-semibold mt-5">
              Length
              <input
                type="text"
                className="form_input2 mt-2"
                placeholder="3 Years"
              ></input>
            </label>
          </div>
          <div className="flex flex-col justify-evenly">
            <label className="mt-5 text-gray-900 font-semibold">
              Job Duties
              <textarea
                placeholder="Write your job duties here..."
                className=" resize-none flex rounded-lg w-[275px] h-[150px] mt-2 p-3 text-sm text-gray-700 outline-0"
              ></textarea>
            </label>
          </div>
        </div>
      </JobSeekerModal>

      {/* Education */}
      <JobSeekerModal isVisible={education} onClose={() => setEducation(false)}>
        <div className="flex flex-row px-8 pt-5">
          <h1 className="font-bold text-lg mb-3">Education</h1>
        </div>
        <div className=" px-8 flex flex-row items-center justify-between">
          <div className="flex flex-col">
            <label className="text-gray-900 font-semibold">
              Highest level of Education
              <select className="form_input2 mt-2">
                <option value={""} disabled selected hidden>
                  Choose an Option
                </option>
                <option value={"High School Diploma"}>
                  High School Diploma
                </option>
                <option value={"Associates"}>Associates</option>
                <option value={"Bachelors"}>Bachelors</option>
                <option value={"Masters"}>Masters</option>
                <option value={"Doctorate"}>Doctorate</option>
              </select>
            </label>
            <label className="text-gray-900 font-semibold mt-5">
              Certificates
              <input
                type="text"
                className="form_input2 mt-2"
                placeholder="Hazmat"
              ></input>
            </label>
            <label className="text-gray-900 font-semibold mt-5">
              Do you have a DOT medical card?
              <select className="form_input2 mt-2">
                <option value={""} disabled selected hidden>
                  Choose an Option
                </option>
                <option value={"Yes"}>Yes</option>
                <option value={"No"}>No</option>
              </select>
            </label>
          </div>
          <div className="flex flex-col justify-evenly">
            <label className="text-gray-900 font-semibold">
              Date Completed
              <input type="date" className="form_input2 mt-2"></input>
            </label>
            <label className="text-gray-900 font-semibold mt-5">
              Endorsements
              <input
                type="text"
                className="form_input2 mt-2"
                placeholder="Hazmat"
              ></input>
            </label>
            <label className="text-gray-900 font-semibold mt-5">
              Expiration Date
              <input type="date" className="form_input2 mt-2"></input>
            </label>
          </div>
        </div>
      </JobSeekerModal>
    </Fragment>
  );
};

export default JobSeekerAccount;
