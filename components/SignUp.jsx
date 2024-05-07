"use client";

import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import "@styles/globals.css";
import { useRouter } from "next/navigation";

const signUp = () => {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError("All fields are necessary");
      return;
    }
    try {
      const res = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          company,
          email,
          password,
        }),
      });
      if (res.ok) {
        const form = e.target;
        form.reset();
        router.push("/logIn");
      } else {
        setError("User already exists.");
        console.log("User already exists.");
      }
    } catch (error) {
      console.log("Error during registration: ", error);
    }
  };

  //Show and hide the additional information for each account type
  const [jobSeekerInfo, setJobSeekerInfo] = useState(false);
  const [employerInfo, setEmployerInfo] = useState(false);

  const showJobSeekerInfo = () => {
    setJobSeekerInfo(true);
    setEmployerInfo(false);
  };
  const showEmployerInfo = () => {
    setJobSeekerInfo(false);
    setEmployerInfo(true);
  };

  //Show and hide CDL options
  const [yesCDL, setYesCDL] = useState(false);
  const showCDL = () => {
    setYesCDL(true);
  };
  const hideCDL = () => {
    setYesCDL(false);
  };

  //Show and hide DOT options
  const [yesDOT, setYesDOT] = useState(false);
  const showDOT = () => {
    setYesDOT(true);
  };
  const hideDOT = () => {
    setYesDOT(false);
  };

  //Add and remove certifications
  const [certificationList, setCertificationList] = useState([
    { certification: "" },
  ]);
  const handleCertificateAdd = () => {
    setCertificationList([...certificationList, { certification: "" }]);
  };
  const handleCertificateRemove = (index) => {
    const list = [...certificationList];
    list.splice(index, 1);
    setCertificationList(list);
  };
  const handleCertificateChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...certificationList];
    list[index][name] = value;
    setCertificationList(list);
  };

  //Show and hide work experience
  const [yesWorkExperience, setyesWorkExperience] = useState(false);
  const showWorkExperience = () => {
    setyesWorkExperience(true);
  };
  const hideWorkExperience = () => {
    setyesWorkExperience(false);
  };

  //Add and remove work experience
  const [workExperience, setWorkExperience] = useState([
    { title: "", company: "", length: "", duties: "" },
  ]);
  const handleWorkAdd = () => {
    setWorkExperience([
      ...workExperience,
      { title: "", company: "", length: "", duties: "" },
    ]);
  };
  const handleWorkRemove = (e, index) => {
    const list = [...workExperience];
    list.splice(index, 1);
    setWorkExperience(list);
  };
  const handleWorkChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...workExperience];
    list[index][name] = value;
    setWorkExperience(list);
  };

  return (
    <form className="flex flex-col justify-center content-center items-center bg-gray-50 border-black border-2 p-5 rounded-xl">
      <h1 className="text-2xl font-bold">Create an Account</h1>
      <div className="flex flex-col justify-between border border-black m-3 p-4 rounded-xl bg-white">
        {/* Job Seeker or Employer */}
        <div className="label_input_text mt-1 border-b-2 pb-5 border-gray-500">
          <label className="mr-10 text-gray-900 font-semibold mb-3">
            Are you a Job Seeker or an Employer?
          </label>
          <div>
            <label htmlFor="JobSeeker" className="font-semibold text-gray-700">
              <input
                type="radio"
                id="JobSeeker"
                name="SeekerOrEmployer"
                required
                className="mb-3"
                onChange={showJobSeekerInfo}
              />
              Job Seeker
            </label>
          </div>
          <div>
            <label
              htmlFor="Employer"
              className="font-semibold text-gray-700 ml-5"
            >
              <input
                type="radio"
                id="Employer"
                name="SeekerOrEmployer"
                required
                className="mb-3"
                onChange={showEmployerInfo}
              />
              Employer
            </label>
          </div>
        </div>

        {/* Name */}
        <div className="label_input_text mt-2 mx-5">
          <label className="mr-5 text-gray-900 font-semibold">Full name:</label>
          <input type="text" className="input_style" />
        </div>
        {/* Phone Number */}
        <div className="label_input_text mt-1 mx-5">
          <label className="mr-5 text-gray-900 font-semibold">
            Phone Number:
          </label>
          <input type="text" className="input_style" />
        </div>
        {/* Email */}
        <div className="label_input_text mt-1 mx-5">
          <label className="mr-5 text-gray-900 font-semibold">
            Email address:
          </label>
          <input type="email" className="input_style" />
        </div>
        {/* Password */}
        <div className="label_input_text mt-1 mb-2 mx-5">
          <label className="mr-5 text-gray-900 font-semibold">Password:</label>
          <input type="password" className="input_style" />
        </div>

        {/* Job Seeker additional information */}
        {/* Job Seeker additional information */}
        {/* Job Seeker additional information */}
        {jobSeekerInfo && (
          <div>
            <div className="label_input_text mt-1 border-t-2 pb-5 border-gray-500 font-semibold">
              <h1 className="mt-3 font-bold">License Information</h1>
            </div>
            {/* Drivers License */}
            <div className="label_input_text mt-1 mx-5">
              <label className="mr-5 text-gray-900 font-semibold">
                Class of Drivers License:
              </label>
              <input
                type="text"
                className="input_style"
                placeholder="A, B, C, D, or E"
                max={1}
              />
            </div>
            {/* Issuing state */}
            <div className="label_input_text mt-1 mx-5">
              <label className="mr-5 text-gray-900 font-semibold">
                Issuing State:
              </label>
              <select className="p-1 border border-black rounded-lg bg-gray-50">
                <option value={""} disabled selected hidden></option>
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="DE">Delaware</option>
                <option value="DC">District Of Columbia</option>
                <option value="FL">Florida</option>
                <option value="GA">Georgia</option>
                <option value="HI">Hawaii</option>
                <option value="ID">Idaho</option>
                <option value="IL">Illinois</option>
                <option value="IN">Indiana</option>
                <option value="IA">Iowa</option>
                <option value="KS">Kansas</option>
                <option value="KY">Kentucky</option>
                <option value="LA">Louisiana</option>
                <option value="ME">Maine</option>
                <option value="MD">Maryland</option>
                <option value="MA">Massachusetts</option>
                <option value="MI">Michigan</option>
                <option value="MN">Minnesota</option>
                <option value="MS">Mississippi</option>
                <option value="MO">Missouri</option>
                <option value="MT">Montana</option>
                <option value="NE">Nebraska</option>
                <option value="NV">Nevada</option>
                <option value="NH">New Hampshire</option>
                <option value="NJ">New Jersey</option>
                <option value="NM">New Mexico</option>
                <option value="NY">New York</option>
                <option value="NC">North Carolina</option>
                <option value="ND">North Dakota</option>
                <option value="OH">Ohio</option>
                <option value="OK">Oklahoma</option>
                <option value="OR">Oregon</option>
                <option value="PA">Pennsylvania</option>
                <option value="RI">Rhode Island</option>
                <option value="SC">South Carolina</option>
                <option value="SD">South Dakota</option>
                <option value="TN">Tennessee</option>
                <option value="TX">Texas</option>
                <option value="UT">Utah</option>
                <option value="VT">Vermont</option>
                <option value="VA">Virginia</option>
                <option value="WA">Washington</option>
                <option value="WV">West Virginia</option>
                <option value="WI">Wisconsin</option>
                <option value="WY">Wyoming</option>
              </select>
            </div>
            {/* License expiration */}
            <div className="label_input_text mt-1 mx-5">
              <label className="mr-5 text-gray-900 font-semibold">
                Drivers License expiration date:
              </label>
              <input type="date" className="input_style" />
            </div>
            {/* DOT Option */}
            <div className="label_input_text mt-1 mx-5">
              <label className="mr-10 text-gray-900 font-semibold">
                Do you have a DOT Medical card?
              </label>
              <div className="flex flex-row">
                <div>
                  <label
                    htmlFor="DOTYes"
                    className="font-semibold text-gray-700"
                  >
                    <input
                      type="radio"
                      id="DOTYes"
                      name="DOTOption"
                      required
                      className="ml-7"
                      onClick={showDOT}
                    />
                    Yes
                  </label>
                </div>
                <div>
                  <label
                    htmlFor="DOTNo"
                    className="font-semibold text-gray-700"
                  >
                    <input
                      type="radio"
                      id="DOTNo"
                      name="DOTOption"
                      required
                      className="ml-5"
                      onClick={hideDOT}
                    />
                    No
                  </label>
                </div>
              </div>
            </div>
            {/* DOT additional information */}
            {yesDOT && (
              <div className="label_input_text mt-1 mx-5">
                <label className="mr-5 text-gray-900 font-semibold">
                  DOT expiration date:
                </label>
                <input type="date" className="input_style" />
              </div>
            )}
            {/* Endorsements */}
            <div className="label_input_text mt-1 mx-5">
              <label className="mr-5 text-gray-900 font-semibold">
                Select any Endorsements that you hold:
              </label>
            </div>
            <div className="flex flex-row label_input_text mx-24">
              <div className="flex flex-col">
                <label for="A-MTRCL Also">
                  <input
                    name="endorsements"
                    type="checkbox"
                    id="A-MTRCL Also"
                    className="mr-1"
                    value={"A-MTRCL Also"}
                  />
                  A-MTRCL Also
                </label>
                <label for="H-HazMat">
                  <input
                    name="endorsements"
                    type="checkbox"
                    id="H-HazMat"
                    className="mr-1"
                    value={"H-HazMat"}
                  />
                  H-HazMat
                </label>
                <label for="N-Tanker">
                  <input
                    name="endorsements"
                    type="checkbox"
                    id="N-Tanker"
                    className="mr-1"
                    value={"N-Tanker"}
                  />
                  N-Tanker
                </label>
                <label for="O-MTRCL Only">
                  <input
                    name="endorsements"
                    type="checkbox"
                    id="O-MTRCL Only"
                    className="mr-1"
                    value={"O-MTRCL Only"}
                  />
                  O-MTRCL Only
                </label>
              </div>
              <div className="flex flex-col">
                <label for="P->15 Passengers">
                  <input
                    name="endorsements"
                    type="checkbox"
                    id="P->15 Passengers"
                    className="mr-1"
                    value={"P->15 Passengers"}
                  />
                  {"P->15 Passengers"}
                </label>
                <label for="S-School Bus">
                  <input
                    name="endorsements"
                    type="checkbox"
                    id="S-School Bus"
                    className="mr-1"
                    value={"S-School Bus"}
                  />
                  S-School Bus
                </label>
                <label for="T-Dbl/Trpl Trailers">
                  <input
                    name="endorsements"
                    type="checkbox"
                    id="T-Dbl/Trpl Trailers"
                    className="mr-1"
                    value={"T-Dbl/Trpl Trailers"}
                  />
                  T-Dbl/Trpl Trailers
                </label>
                <label for="X-HM+Tanker">
                  <input
                    name="endorsements"
                    type="checkbox"
                    id="X-HM+Tanker"
                    className="mr-1"
                    value={"X-HM+Tanker"}
                  />
                  X-HM+Tanker
                </label>
              </div>
            </div>

            {/* CDL Page */}
            {/* CDL Page */}
            {/* CDL Page */}
            <div className="label_input_text mt-1 border-t-2 pb-5 border-gray-500 font-semibold">
              <h1 className="mt-3 font-bold">CDL Information</h1>
            </div>
            {/* CDL option */}
            <div className="label_input_text mt-1 mx-5">
              <label className="mr-10 text-gray-900 font-semibold">
                Do you have a CDL?
              </label>
              <div className="flex flex-row">
                <div>
                  <label
                    htmlFor="CDLYes"
                    className="font-semibold text-gray-700"
                  >
                    <input
                      type="radio"
                      id="CDLYes"
                      name="CDLOption"
                      required
                      className=""
                      onClick={showCDL}
                    />
                    Yes
                  </label>
                </div>
                <div>
                  <label
                    htmlFor="CDLNo"
                    className="font-semibold text-gray-700"
                  >
                    <input
                      type="radio"
                      id="CDLNo"
                      name="CDLOption"
                      required
                      className="ml-5"
                      onClick={hideCDL}
                    />
                    No
                  </label>
                </div>
              </div>
            </div>
            {/* CDL Additional information */}
            {yesCDL && (
              <div>
                {/* TWIK Card */}
                <div className="label_input_text mx-5 mt-1">
                  <label className="mr-10 text-gray-900 font-semibold">
                    Do you have a TWIK card?
                  </label>
                  <div className="flex flex-row">
                    <div>
                      <label
                        htmlFor="TWIKYes"
                        className="font-semibold text-gray-700"
                      >
                        <input
                          type="radio"
                          id="TWIKYes"
                          name="TWIKCard"
                          className=""
                        />
                        Yes
                      </label>
                    </div>
                    <div>
                      <label
                        htmlFor="TWIKNo"
                        className="font-semibold text-gray-700"
                      >
                        <input
                          type="radio"
                          id="TWIKNo"
                          name="TWIKCard"
                          className="ml-5"
                        />
                        No
                      </label>
                    </div>
                  </div>
                </div>
                {/* Intra and excepted */}
                <div className="label_input_text mt-1 mx-5">
                  <label className="mr-5 text-gray-900 font-semibold">
                    Make a selection:
                  </label>
                  <select className="p-1 border border-black rounded-lg bg-gray-50 w-28">
                    <option value={""} disabled selected hidden></option>
                    <option value="Interstate">Interstate</option>
                    <option value="Intrastate">Intrastate</option>
                  </select>
                  <select className="p-1 border border-black rounded-lg bg-gray-50 w-36">
                    <option value={""} disabled selected hidden></option>
                    <option value="Excepted">Excepted</option>
                    <option value="Non-excepted">Non-excepted</option>
                  </select>
                </div>
              </div>
            )}

            {/* Work Experience */}
            {/* Work Experience */}
            {/* Work Experience */}
            <div className="label_input_text mt-1 border-t-2 pb-5 border-gray-500 font-semibold">
              <h1 className="mt-3 font-bold">Work Experience</h1>
            </div>
            {/* Work experience question */}
            <div className="label_input_text mt-1 mx-5">
              <label className="mr-10 text-gray-900 font-semibold">
                Do you have any relevant work experience?
              </label>
              <div className="flex flex-row">
                <div>
                  <label
                    htmlFor="YesExperience"
                    className="font-semibold text-gray-700"
                  >
                    <input
                      type="radio"
                      id="YesExperience"
                      name="ExperienceOption"
                      required
                      className=""
                      onClick={showWorkExperience}
                    />
                    Yes
                  </label>
                </div>
                <div>
                  <label
                    htmlFor="NoExperience"
                    className="font-semibold text-gray-700"
                  >
                    <input
                      type="radio"
                      id="NoExperience"
                      name="ExperienceOption"
                      required
                      className="ml-5"
                      onClick={hideWorkExperience}
                    />
                    No
                  </label>
                </div>
              </div>
            </div>
            {yesWorkExperience && (
              <div>
                {workExperience.map((workdata, index) => (
                  //Add work experience
                  <div key={index}>
                    <div className="label_input_text mt-1 mx-5">
                      <label className="mr-5 text-gray-900 font-semibold">
                        Title:
                      </label>
                      <input
                        value={workdata.title}
                        id="title"
                        name="title"
                        type="text"
                        className="input_style"
                        onChange={(e) => handleWorkChange(e, index)}
                      />
                    </div>
                    <div className="label_input_text mt-1 mx-5">
                      <label className="mr-5 text-gray-900 font-semibold">
                        Company Name:
                      </label>
                      <input
                        value={workdata.company}
                        id="company"
                        name="company"
                        type="text"
                        className="input_style"
                        onChange={(e) => handleWorkChange(e, index)}
                      />
                    </div>
                    <div className="label_input_text mt-1 mx-5">
                      <label className="mr-5 text-gray-900 font-semibold">
                        Length (years)
                      </label>
                      <input
                        value={workdata.length}
                        id="length"
                        name="length"
                        type="Number"
                        className="input_style"
                        onChange={(e) => handleWorkChange(e, index)}
                      />
                    </div>
                    <div className="label_input_text mt-1 mx-5">
                      <label className=" text-gray-900 font-semibold">
                        Job Duties
                      </label>
                      <textarea
                        value={workdata.duties}
                        name="duties"
                        placeholder="Write your job duties here..."
                        className="resize-none flex rounded-lg w-[275px] h-[150px] mt-1 p-3 text-sm text-gray-900 border-2"
                        onChange={(e) => handleWorkChange(e, index)}
                      />
                    </div>
                    <div className="label_input_text mt-1 mx-5">
                      {workExperience.length - 1 === index &&
                        workExperience.length < 5 && (
                          <button
                            onClick={handleWorkAdd}
                            className="black_button"
                          >
                            Add More
                          </button>
                        )}
                      {workExperience.length - 1 === index && index != 0 && (
                        <button
                          onClick={handleWorkRemove}
                          className="black_button"
                        >
                          Remove Previous
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Education Information */}
            {/* Education Information */}
            {/* Education Information */}
            <div className="label_input_text mt-1 border-t-2 pb-5 border-gray-500 font-semibold">
              <h1 className="mt-3 font-bold">Education</h1>
            </div>
            {/* Education */}
            <div className="label_input_text mt-1 mx-5">
              <label className="mr-5 text-gray-900 font-semibold">
                What is your highest level of education?
              </label>
              <select className="p-1 border border-black rounded-lg bg-gray-50">
                <option value={""} disabled selected hidden></option>
                <option value="High School">High School</option>
                <option value="Associates">Associates</option>
                <option value="Bachelors">Bachelors</option>
                <option value="Masters">Masters</option>
                <option value="Doctorate">Doctorate</option>
                <option value="Other">Other</option>
              </select>
            </div>
            {/* Completion date */}
            <div className="label_input_text mt-1 mx-5">
              <label className="mr-5 text-gray-900 font-semibold">
                When was this completed?
              </label>
              <input type="date" className="input_style" />
            </div>
            {/* Certifications */}
            <div className="label_input_text mt-1 mx-5">
              <label className="mr-5 text-gray-900 font-semibold">
                Add any certifications that you hold
              </label>
            </div>
            {certificationList.map((singleCertification, index) => (
              <div key={index}>
                <div className="label_input_text mt-1 mx-5">
                  <input
                    name="certification"
                    id="certification"
                    value={singleCertification.certification}
                    onChange={(e) => handleCertificateChange(e, index)}
                    type="text"
                    className="input_style w-4/6"
                  />
                  {certificationList.length - 1 === index && index != 0 && (
                    <button
                      onClick={() => handleCertificateRemove(index)}
                      className="black_button"
                    >
                      Remove
                    </button>
                  )}
                </div>
                {certificationList.length - 1 === index &&
                  certificationList.length < 5 && (
                    <div className="label_input_text mt-1 mx-5">
                      <button
                        onClick={handleCertificateAdd}
                        className="black_button"
                      >
                        Add More
                      </button>
                    </div>
                  )}
              </div>
            ))}

            {/* Additional Information */}
            {/* Additional Information */}
            {/* Additional Information */}
            <div className="label_input_text mt-1 border-t-2 pb-5 border-gray-500 font-semibold">
              <h1 className="mt-3 font-bold">Additional Information</h1>
            </div>
            {/* Prompt */}
            <div className="label_input_text mt-1 mx-5 items-start">
              <label className=" text-gray-900 font-semibold">
                Have you been...
              </label>
            </div>
            {/* Accident information */}
            <div className="label_input_text mt-1 mx-5 items-start">
              <label className=" text-gray-900 font-semibold">
                ..in a car accident the past 3 years?
              </label>
              <div className="flex flex-row">
                <div>
                  <label
                    htmlFor="AccidentYes"
                    className="font-semibold text-gray-700"
                  >
                    <input
                      type="radio"
                      id="AccidentYes"
                      name="AccidentQuestion"
                      className=""
                    />
                    Yes
                  </label>
                </div>
                <div>
                  <label
                    htmlFor="AccidentNo"
                    className="font-semibold text-gray-700"
                  >
                    <input
                      type="radio"
                      id="AccidentNo"
                      name="AccidentQuestion"
                      className="ml-5"
                    />
                    No
                  </label>
                </div>
              </div>
            </div>
            {/* DUI information */}
            <div className="label_input_text mt-1 mx-5 items-start">
              <label className=" text-gray-900 font-semibold">
                ..convicted of a DUI in the past 10 years?
              </label>
              <div className="flex flex-row">
                <div>
                  <label
                    htmlFor="DUIYes"
                    className="font-semibold text-gray-700"
                  >
                    <input
                      type="radio"
                      id="DUIYes"
                      name="DUIQuestion"
                      className=""
                    />
                    Yes
                  </label>
                </div>
                <div>
                  <label
                    htmlFor="DUINo"
                    className="font-semibold text-gray-700"
                  >
                    <input
                      type="radio"
                      id="DUINo"
                      name="DUIQuestion"
                      className="ml-5"
                    />
                    No
                  </label>
                </div>
              </div>
            </div>
            {/* Age information */}
            <div className="label_input_text mt-1 mx-5 items-start">
              <label className=" text-gray-900 font-semibold">
                Your age range:
              </label>
              <div className="flex flex-row">
                <div>
                  <label
                    htmlFor="Under18"
                    className="font-semibold text-gray-700"
                  >
                    <input
                      type="radio"
                      id="Under18"
                      name="AgeRange"
                      className=""
                    />
                    Under 18
                  </label>
                </div>
                <div>
                  <label
                    htmlFor="18-21"
                    className="font-semibold text-gray-700"
                  >
                    <input
                      type="radio"
                      id="18-21"
                      name="AgeRange"
                      className="ml-5"
                    />
                    18 - 21
                  </label>
                </div>
                <div>
                  <label
                    htmlFor="Over21"
                    className="font-semibold text-gray-700"
                  >
                    <input
                      type="radio"
                      id="Over21"
                      name="AgeRange"
                      className="ml-5"
                    />
                    Over 21
                  </label>
                </div>
              </div>
            </div>
            <div className="label_input_text mt-1 mx-5">
              {/* City */}
              <div className="flex flex-col label_input_text">
                <label className="text-gray-900 font-semibold">City:</label>
                <input
                  type="text"
                  className="p-1 border border-black rounded-lg bg-gray-50 w-32"
                />
              </div>
              {/* State */}
              <div className="flex flex-col label_input_text">
                <label className="text-gray-900 font-semibold">State:</label>
                <select className="p-1 border border-black rounded-lg bg-gray-50 w-36">
                  <option value={""} disabled selected hidden></option>
                  <option value="AL">Alabama</option>
                  <option value="AK">Alaska</option>
                  <option value="AZ">Arizona</option>
                  <option value="AR">Arkansas</option>
                  <option value="CA">California</option>
                  <option value="CO">Colorado</option>
                  <option value="CT">Connecticut</option>
                  <option value="DE">Delaware</option>
                  <option value="DC">District Of Columbia</option>
                  <option value="FL">Florida</option>
                  <option value="GA">Georgia</option>
                  <option value="HI">Hawaii</option>
                  <option value="ID">Idaho</option>
                  <option value="IL">Illinois</option>
                  <option value="IN">Indiana</option>
                  <option value="IA">Iowa</option>
                  <option value="KS">Kansas</option>
                  <option value="KY">Kentucky</option>
                  <option value="LA">Louisiana</option>
                  <option value="ME">Maine</option>
                  <option value="MD">Maryland</option>
                  <option value="MA">Massachusetts</option>
                  <option value="MI">Michigan</option>
                  <option value="MN">Minnesota</option>
                  <option value="MS">Mississippi</option>
                  <option value="MO">Missouri</option>
                  <option value="MT">Montana</option>
                  <option value="NE">Nebraska</option>
                  <option value="NV">Nevada</option>
                  <option value="NH">New Hampshire</option>
                  <option value="NJ">New Jersey</option>
                  <option value="NM">New Mexico</option>
                  <option value="NY">New York</option>
                  <option value="NC">North Carolina</option>
                  <option value="ND">North Dakota</option>
                  <option value="OH">Ohio</option>
                  <option value="OK">Oklahoma</option>
                  <option value="OR">Oregon</option>
                  <option value="PA">Pennsylvania</option>
                  <option value="RI">Rhode Island</option>
                  <option value="SC">South Carolina</option>
                  <option value="SD">South Dakota</option>
                  <option value="TN">Tennessee</option>
                  <option value="TX">Texas</option>
                  <option value="UT">Utah</option>
                  <option value="VT">Vermont</option>
                  <option value="VA">Virginia</option>
                  <option value="WA">Washington</option>
                  <option value="WV">West Virginia</option>
                  <option value="WI">Wisconsin</option>
                  <option value="WY">Wyoming</option>
                </select>
              </div>
              {/* Zip code */}
              <div className="flex flex-col label_input_text">
                <label className="text-gray-900 font-semibold">Zip Code:</label>
                <input
                  type="text"
                  className="p-1 border border-black rounded-lg bg-gray-50 w-32"
                />
              </div>
            </div>
          </div>
        )}

        {/* Employer additional information */}
        {employerInfo && (
          <div>
            {/* Title */}
            <div className="label_input_text mt-1 border-t-2 pb-5 border-gray-500 font-semibold">
              <h1 className="mt-3">Additional Information for Employers</h1>
            </div>
            {/* Company Name */}
            <div className="label_input_text mt-1 mb-2 mx-5">
              <label className="mr-5 text-gray-900 font-semibold">
                Company Name:
              </label>
              <input type="text" className="input_style w-64" />
            </div>
            {/* Full Address */}
            <div className="label_input_text mt-1 mb-2 mx-5">
              <label className="mr-5 text-gray-900 font-semibold">
                Street Address:
              </label>
              <input type="text" className="input_style w-64" />
            </div>
            {/*City, State, and Zip code */}
            <div className="label_input_text mt-1 mb-2 mx-5">
              {/* City */}
              <div className="flex flex-col label_input_text">
                <label className="text-gray-900 font-semibold">City:</label>
                <input
                  type="text"
                  className="p-1 border border-black rounded-lg bg-gray-50 w-32"
                />
              </div>
              {/* State */}
              <div className="flex flex-col label_input_text">
                <label className="text-gray-900 font-semibold">State:</label>
                <select className="p-1 border border-black rounded-lg bg-gray-50 w-36">
                  <option value={""} disabled selected hidden></option>
                  <option value="AL">Alabama</option>
                  <option value="AK">Alaska</option>
                  <option value="AZ">Arizona</option>
                  <option value="AR">Arkansas</option>
                  <option value="CA">California</option>
                  <option value="CO">Colorado</option>
                  <option value="CT">Connecticut</option>
                  <option value="DE">Delaware</option>
                  <option value="DC">District Of Columbia</option>
                  <option value="FL">Florida</option>
                  <option value="GA">Georgia</option>
                  <option value="HI">Hawaii</option>
                  <option value="ID">Idaho</option>
                  <option value="IL">Illinois</option>
                  <option value="IN">Indiana</option>
                  <option value="IA">Iowa</option>
                  <option value="KS">Kansas</option>
                  <option value="KY">Kentucky</option>
                  <option value="LA">Louisiana</option>
                  <option value="ME">Maine</option>
                  <option value="MD">Maryland</option>
                  <option value="MA">Massachusetts</option>
                  <option value="MI">Michigan</option>
                  <option value="MN">Minnesota</option>
                  <option value="MS">Mississippi</option>
                  <option value="MO">Missouri</option>
                  <option value="MT">Montana</option>
                  <option value="NE">Nebraska</option>
                  <option value="NV">Nevada</option>
                  <option value="NH">New Hampshire</option>
                  <option value="NJ">New Jersey</option>
                  <option value="NM">New Mexico</option>
                  <option value="NY">New York</option>
                  <option value="NC">North Carolina</option>
                  <option value="ND">North Dakota</option>
                  <option value="OH">Ohio</option>
                  <option value="OK">Oklahoma</option>
                  <option value="OR">Oregon</option>
                  <option value="PA">Pennsylvania</option>
                  <option value="RI">Rhode Island</option>
                  <option value="SC">South Carolina</option>
                  <option value="SD">South Dakota</option>
                  <option value="TN">Tennessee</option>
                  <option value="TX">Texas</option>
                  <option value="UT">Utah</option>
                  <option value="VT">Vermont</option>
                  <option value="VA">Virginia</option>
                  <option value="WA">Washington</option>
                  <option value="WV">West Virginia</option>
                  <option value="WI">Wisconsin</option>
                  <option value="WY">Wyoming</option>
                </select>
              </div>
              {/* Zip code */}
              <div className="flex flex-col label_input_text">
                <label className="text-gray-900 font-semibold">Zip Code:</label>
                <input
                  type="text"
                  className="p-1 border border-black rounded-lg bg-gray-50 w-32"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col">
        <button className="black_button mb-3">Create Account</button>
        <Link href={"/logIn"}>
          Already have an Account?{" "}
          <span className="underline font-semibold mb-3">Click Here</span>
        </Link>
        {error && (
          <div className="bg-red-500 text-white w-fit py-1 px-3 rounded-md text-sm mt-2">
            {error}
          </div>
        )}
      </div>
    </form>
  );
};

export default signUp;
