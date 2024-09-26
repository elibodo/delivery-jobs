"use client";

import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import "@styles/globals.css";
import { useRouter } from "next/navigation";

const signUp = (info) => {
  const [accountType, setAccountType] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          accountType,
          name,
          phoneNumber,
          email,
          password,

          licenseClass: jobSeekerData.licenseClass,
          licenseState: jobSeekerData.licenseState,
          licenseExpire: jobSeekerData.licenseExpire,
          DOT: jobSeekerData.DOT,
          DOTExpire: jobSeekerData.DOTExpire,
          endorsements: jobSeekerData.endorsements,
          CDL: jobSeekerData.CDL,
          twikCard: jobSeekerData.twikCard,
          CDLOption1: jobSeekerData.CDLOption1,
          CDLOption2: jobSeekerData.CDLOption2,
          workExperience: jobSeekerData.workExperience,
          experienceArray: jobSeekerData.experienceArray,
          educationLevel: jobSeekerData.educationLevel,
          educationDate: jobSeekerData.educationDate,
          certificates: jobSeekerData.certificates,
          carAccident: jobSeekerData.carAccident,
          DUI: jobSeekerData.DUI,
          ageRange: jobSeekerData.ageRange,
          city: jobSeekerData.city,
          state: jobSeekerData.state,
          zipCode: jobSeekerData.zipCode,

          companyName: employerData.companyName,
          companyWebsite: employerData.companyWebsite,
          streetAddress: employerData.streetAddress,
          City: employerData.City,
          State: employerData.State,
          ZipCode: employerData.ZipCode,
          Subscription: employerData.Subscription,
          CustomerId: employerData.CustomerId,
          Access: employerData.Access,
          JobLimit: employerData.JobLimit,
          MyJobs: employerData.MyJobs,
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

  const [jobSeekerData, setJobSeekerData] = useState({
    licenseClass: "",
    licenseState: "",
    licenseExpire: "",
    DOT: "",
    DOTExpire: "",
    endorsements: "",
    CDL: "",
    twikCard: "",
    CDLOption1: "",
    CDLOption2: "",
    workExperience: "",
    experienceArray: "",
    educationLevel: "",
    educationDate: "",
    certificates: "",
    carAccident: "",
    DUI: "",
    ageRange: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const [employerData, setEmployerData] = useState({
    companyName: "",
    companyWebsite: "",
    streetAddress: "",
    City: "",
    State: "",
    ZipCode: "",
    Subscription: "",
    CustomerId: "",
    Access: false,
    JobLimit: 0,
    MyJobs: 0,
  });

  //Show and hide the additional information for each account type
  const [jobSeekerInfo, setJobSeekerInfo] = useState(false);
  const [employerInfo, setEmployerInfo] = useState(false);

  const showJobSeekerInfo = () => {
    setAccountType("Job Seeker");
    setJobSeekerInfo(true);
    setEmployerInfo(false);
  };
  const showEmployerInfo = () => {
    setAccountType("Employer");
    setJobSeekerInfo(false);
    setEmployerInfo(true);
  };

  //Show and hide CDL options
  const [yesCDL, setYesCDL] = useState(false);
  const showCDL = () => {
    setJobSeekerData({ ...jobSeekerData, CDL: "Yes" });
    setYesCDL(true);
  };
  const hideCDL = () => {
    setJobSeekerData({ ...jobSeekerData, CDL: "No" });
    setYesCDL(false);
  };

  //Show and hide DOT options
  const [yesDOT, setYesDOT] = useState(false);
  const showDOT = () => {
    setJobSeekerData({ ...jobSeekerData, DOT: "Yes" });
    setYesDOT(true);
  };
  const hideDOT = () => {
    setJobSeekerData({ ...jobSeekerData, DOT: "No" });
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
    setJobSeekerData({ ...jobSeekerData, certificates: list });
  };
  const handleCertificateChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...certificationList];
    list[index][name] = value;
    setCertificationList(list);
    setJobSeekerData({ ...jobSeekerData, certificates: list });
  };

  //Show and hide work experience
  const [yesWorkExperience, setyesWorkExperience] = useState(false);
  const showWorkExperience = () => {
    setyesWorkExperience(true);
    setJobSeekerData({ ...jobSeekerData, workExperience: "Yes" });
  };
  const hideWorkExperience = () => {
    setyesWorkExperience(false);
    setJobSeekerData({ ...jobSeekerData, workExperience: "No" });
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
  const handleWorkRemove = (index) => {
    const list = [...workExperience];
    list.splice(index, 1);
    setWorkExperience(list);
    setJobSeekerData({ ...jobSeekerData, experienceArray: list });
  };
  const handleWorkChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...workExperience];
    list[index][name] = value;
    setWorkExperience(list);
    setJobSeekerData({ ...jobSeekerData, experienceArray: list });
  };

  //Array for all endorsements
  const [endorse, setEndorse] = useState([]);
  const allEndorsements = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setEndorse((nameOfEndorse) => [...nameOfEndorse, value]);
      console.log(endorse);
    } else {
      setEndorse((nameOfEndorse) =>
        nameOfEndorse.filter((specificEndorse) => specificEndorse !== value),
      );
    }
  };
  useEffect(() => {
    setJobSeekerData({ ...jobSeekerData, endorsements: endorse });
  }, [endorse]);

  return (
    <form
      onSubmit={handleSubmit}
      className="border-1 mt-4 flex flex-col content-center items-center justify-center rounded-xl bg-gray-100 p-5 md:w-[525px]"
    >
      <h1 className="mb-3 border-b-2 border-gray-300 pb-3 text-xl font-bold">
        Create an Account
      </h1>
      <div className="flex w-full flex-col">
        {/* Job Seeker or Employer */}
        <div className="flex flex-col items-center border-b-2 border-gray-300">
          <label className="mb-2 font-semibold text-gray-900">
            Are you a Job Seeker or an Employer?
          </label>
          <div className="flex flex-col">
            <label htmlFor="JobSeeker" className="font-semibold text-gray-700">
              <input
                required
                type="radio"
                id="JobSeeker"
                name="SeekerOrEmployer"
                className="mb-1"
                onChange={showJobSeekerInfo}
              />{" "}
              Job Seeker
            </label>
            <label htmlFor="Employer" className="font-semibold text-gray-700">
              <input
                required
                type="radio"
                id="Employer"
                name="SeekerOrEmployer"
                className="mb-3"
                onChange={showEmployerInfo}
              />{" "}
              Employer
            </label>
          </div>
        </div>

        {/* Name */}
        <div className="mx-5 mt-2 flex flex-col md:flex-row md:items-center md:justify-between">
          <label className="font-semibold text-gray-900">Full name:</label>
          <input
            required
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="rounded-lg p-2 text-sm text-gray-700 outline-0 md:w-64"
          />
        </div>
        {/* Phone Number */}
        <div className="mx-5 mt-2 flex flex-col md:flex-row md:items-center md:justify-between">
          <label className="font-semibold text-gray-900">Phone Number:</label>
          <input
            required
            onChange={(e) => setPhoneNumber(e.target.value)}
            type="text"
            className="rounded-lg p-2 text-sm text-gray-700 outline-0 md:w-64"
          />
        </div>
        {/* Email */}
        <div className="mx-5 mt-2 flex flex-col md:flex-row md:items-center md:justify-between">
          <label className="font-semibold text-gray-900">Email address:</label>
          <input
            required
            onChange={(e) => setEmail(e.target.value.toLowerCase())}
            type="email"
            className="rounded-lg p-2 text-sm text-gray-700 outline-0 md:w-64"
          />
        </div>
        {/* Password */}
        <div className="mx-5 mb-3 mt-2 flex flex-col md:flex-row md:items-center md:justify-between">
          <label className="font-semibold text-gray-900">Password:</label>
          <input
            required
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="rounded-lg p-2 text-sm text-gray-700 outline-0 md:w-64"
          />
        </div>

        {/* Job Seeker additional information */}
        {/* Job Seeker additional information */}
        {/* Job Seeker additional information */}
        {jobSeekerInfo && (
          <div>
            <div className="label_input_text mt-1 border-t-2 border-gray-300 pb-5 font-semibold">
              <h1 className="mt-5 text-lg text-gray-900">
                License Information
              </h1>
            </div>
            {/* Drivers License */}
            <div className="mx-5 mt-2 flex flex-col md:flex-row md:items-center md:justify-between">
              <label className="font-semibold text-gray-900">
                Class of Drivers License:
              </label>
              <input
                type="text"
                className="rounded-lg p-2 text-sm text-gray-700 outline-0"
                placeholder="A, B, C, D, or E"
                onChange={(e) =>
                  setJobSeekerData({
                    ...jobSeekerData,
                    licenseClass: e.target.value,
                  })
                }
                required
              />
            </div>
            {/* Issuing state */}
            <div className="mx-5 mt-2 flex flex-col md:flex-row md:items-center md:justify-between">
              <label className="font-semibold text-gray-900">
                Issuing State:
              </label>
              <select
                onChange={(e) =>
                  setJobSeekerData({
                    ...jobSeekerData,
                    licenseState: e.target.value,
                  })
                }
                required
                className="rounded-lg p-2 text-sm text-gray-700 outline-0"
              >
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
            <div className="mx-5 mt-2 flex flex-col md:flex-row md:items-center md:justify-between">
              <label className="font-semibold text-gray-900">
                Drivers License expiration date:
              </label>
              <input
                onChange={(e) =>
                  setJobSeekerData({
                    ...jobSeekerData,
                    licenseExpire: e.target.value,
                  })
                }
                required
                type="date"
                className="rounded-lg p-2 text-sm text-gray-700 outline-0"
              />
            </div>
            {/* DOT Option */}
            <div className="mx-5 mt-2 flex flex-col md:flex-row md:items-center md:justify-between">
              <label className="font-semibold text-gray-900">
                Do you have a DOT Medical card?
              </label>
              <div className="flex flex-row gap-8">
                <div>
                  <label
                    htmlFor="DOTYes"
                    className="font-semibold text-gray-900"
                  >
                    <input
                      type="radio"
                      id="DOTYes"
                      name="DOTOption"
                      className="rounded-lg p-2 text-sm text-gray-700 outline-0"
                      onClick={showDOT}
                      required
                    />{" "}
                    Yes
                  </label>
                </div>
                <div>
                  <label
                    htmlFor="DOTNo"
                    className="font-semibold text-gray-900"
                  >
                    <input
                      type="radio"
                      id="DOTNo"
                      name="DOTOption"
                      className="rounded-lg p-2 text-sm text-gray-700 outline-0"
                      onClick={hideDOT}
                      required
                    />{" "}
                    No
                  </label>
                </div>
              </div>
            </div>
            {/* DOT additional information */}
            {yesDOT && (
              <div className="mx-5 mt-2 flex flex-col md:flex-row md:items-center md:justify-between">
                <label className="font-semibold text-gray-900">
                  DOT expiration date:
                </label>
                <input
                  onChange={(e) =>
                    setJobSeekerData({
                      ...jobSeekerData,
                      DOTExpire: e.target.value,
                    })
                  }
                  required
                  type="date"
                  className="rounded-lg p-2 text-sm text-gray-700 outline-0"
                />
              </div>
            )}
            {/* Endorsements */}
            <div className="mx-5 mt-2 flex flex-col">
              <label className="font-semibold text-gray-900">
                Select any Endorsements that you hold:
              </label>
            </div>
            <div className="mb-3 flex flex-col md:mx-16 md:flex-row md:items-center md:justify-between">
              <div className="mx-5 flex flex-col">
                <label for="A-MTRCL Also">
                  <input
                    name="endorsements"
                    type="checkbox"
                    id="A-MTRCL Also"
                    className="mr-1"
                    value={"A-MTRCL Also"}
                    onChange={allEndorsements}
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
                    onChange={allEndorsements}
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
                    onChange={allEndorsements}
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
                    onChange={allEndorsements}
                  />
                  O-MTRCL Only
                </label>
              </div>
              <div className="mx-5 flex flex-col">
                <label for="P->15 Passengers">
                  <input
                    name="endorsements"
                    type="checkbox"
                    id="P->15 Passengers"
                    className="mr-1"
                    value={"P->15 Passengers"}
                    onChange={allEndorsements}
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
                    onChange={allEndorsements}
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
                    onChange={allEndorsements}
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
                    onChange={allEndorsements}
                  />
                  X-HM+Tanker
                </label>
              </div>
            </div>

            {/* CDL Page */}
            {/* CDL Page */}
            {/* CDL Page */}
            <div className="label_input_text mt-1 border-t-2 border-gray-300 pb-5 font-semibold">
              <h1 className="mt-5 text-lg text-gray-900">CDL Information</h1>
            </div>
            {/* CDL option */}
            <div className="mx-5 mb-2 mt-2 flex flex-col md:flex-row md:items-center md:justify-between">
              <label className="font-semibold text-gray-900">
                Do you have a CDL?
              </label>
              <div className="flex flex-row gap-8">
                <div>
                  <label
                    htmlFor="CDLYes"
                    className="font-semibold text-gray-900"
                  >
                    <input
                      type="radio"
                      id="CDLYes"
                      name="CDLOption"
                      className="rounded-lg p-2 text-sm text-gray-700 outline-0"
                      onClick={showCDL}
                      required
                    />{" "}
                    Yes
                  </label>
                </div>
                <div>
                  <label
                    htmlFor="CDLNo"
                    className="font-semibold text-gray-900"
                  >
                    <input
                      type="radio"
                      id="CDLNo"
                      name="CDLOption"
                      className="rounded-lg p-2 text-sm text-gray-700 outline-0"
                      onClick={hideCDL}
                      required
                    />{" "}
                    No
                  </label>
                </div>
              </div>
            </div>
            {/* CDL Additional information */}
            {yesCDL && (
              <div>
                {/* TWIK Card */}
                <div className="mx-5 mt-2 flex flex-col md:flex-row md:items-center md:justify-between">
                  <label className="font-semibold text-gray-900">
                    Do you have a TWIK card?
                  </label>
                  <div className="flex flex-row gap-8">
                    <div>
                      <label
                        htmlFor="TWIKYes"
                        className="font-semibold text-gray-900"
                      >
                        <input
                          onChange={(e) =>
                            setJobSeekerData({
                              ...jobSeekerData,
                              twikCard: "Yes",
                            })
                          }
                          type="radio"
                          id="TWIKYes"
                          name="TWIKCard"
                          required
                          className="rounded-lg p-2 text-sm text-gray-700 outline-0"
                        />{" "}
                        Yes
                      </label>
                    </div>
                    <div>
                      <label
                        htmlFor="TWIKNo"
                        className="font-semibold text-gray-900"
                      >
                        <input
                          onChange={(e) =>
                            setJobSeekerData({
                              ...jobSeekerData,
                              twikCard: "No",
                            })
                          }
                          type="radio"
                          id="TWIKNo"
                          name="TWIKCard"
                          required
                          className="rounded-lg p-2 text-sm text-gray-700 outline-0"
                        />{" "}
                        No
                      </label>
                    </div>
                  </div>
                </div>
                {/* Intra and excepted */}
                <div className="mx-5 mb-3 mt-2 flex flex-col md:flex-row md:items-center md:justify-between">
                  <label className="font-semibold text-gray-900">
                    Make a selection:
                  </label>
                  <div className="flex flex-row gap-5">
                    <select
                      onChange={(e) =>
                        setJobSeekerData({
                          ...jobSeekerData,
                          CDLOption1: e.target.value,
                        })
                      }
                      required
                      className="rounded-lg p-2 text-sm text-gray-700 outline-0"
                    >
                      <option value={""} disabled selected hidden></option>
                      <option value={"Interstate"}>Interstate</option>
                      <option value={"Intrastate"}>Intrastate</option>
                    </select>
                    <select
                      onChange={(e) =>
                        setJobSeekerData({
                          ...jobSeekerData,
                          CDLOption2: e.target.value,
                        })
                      }
                      required
                      className="rounded-lg p-2 text-sm text-gray-700 outline-0"
                    >
                      <option value={""} disabled selected hidden></option>
                      <option value={"Excepted"}>Excepted</option>
                      <option value={"Non-excepted"}>Non-excepted</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Work Experience */}
            {/* Work Experience */}
            {/* Work Experience */}
            <div className="label_input_text mt-1 border-t-2 border-gray-300 pb-5 font-semibold">
              <h1 className="mt-5 text-lg text-gray-900">Work Experience</h1>
            </div>
            {/* Work experience question */}
            <div className="mx-5 mb-2 mt-2 flex flex-col md:flex-row md:items-center md:justify-between">
              <label className="font-semibold text-gray-900">
                Do you have relevant work experience?
              </label>
              <div className="flex flex-row gap-8">
                <div>
                  <label
                    htmlFor="YesExperience"
                    className="font-semibold text-gray-900"
                  >
                    <input
                      type="radio"
                      id="YesExperience"
                      name="ExperienceOption"
                      className="rounded-lg p-2 text-sm text-gray-700 outline-0"
                      onClick={showWorkExperience}
                      required
                    />{" "}
                    Yes
                  </label>
                </div>
                <div>
                  <label
                    htmlFor="NoExperience"
                    className="font-semibold text-gray-900"
                  >
                    <input
                      type="radio"
                      id="NoExperience"
                      name="ExperienceOption"
                      className="rounded-lg p-2 text-sm text-gray-700 outline-0"
                      onClick={hideWorkExperience}
                      required
                    />{" "}
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
                    <div className="mx-5 mt-2 flex flex-col md:flex-row md:items-center md:justify-between">
                      <label className="font-semibold text-gray-900">
                        Title:
                      </label>
                      <input
                        value={workdata.title}
                        id="title"
                        name="title"
                        type="text"
                        className="rounded-lg p-2 text-sm text-gray-700 outline-0"
                        onChange={(e) => handleWorkChange(e, index)}
                        required
                      />
                    </div>
                    <div className="mx-5 mt-2 flex flex-col md:flex-row md:items-center md:justify-between">
                      <label className="font-semibold text-gray-900">
                        Company Name:
                      </label>
                      <input
                        value={workdata.company}
                        id="company"
                        name="company"
                        type="text"
                        className="rounded-lg p-2 text-sm text-gray-700 outline-0"
                        onChange={(e) => handleWorkChange(e, index)}
                        required
                      />
                    </div>
                    <div className="mx-5 mt-2 flex flex-col md:flex-row md:items-center md:justify-between">
                      <label className="font-semibold text-gray-900">
                        Length (years):
                      </label>
                      <input
                        value={workdata.length}
                        id="length"
                        name="length"
                        type="Number"
                        className="rounded-lg p-2 text-sm text-gray-700 outline-0"
                        onChange={(e) => handleWorkChange(e, index)}
                        required
                      />
                    </div>
                    <div className="mx-5 mt-2 flex flex-col md:flex-row md:items-center md:justify-between">
                      <label className="font-semibold text-gray-900">
                        Job Duties:
                      </label>
                      <textarea
                        value={workdata.duties}
                        name="duties"
                        placeholder="Write your job duties here..."
                        className="max-h-[250px] min-h-[150px] min-w-[250px] resize-y rounded-lg p-2 text-sm text-gray-700 outline-0"
                        onChange={(e) => handleWorkChange(e, index)}
                        required
                      />
                    </div>
                    <div className="label_input_text mx-5 mt-2">
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
                          onClick={(e) => handleWorkRemove(index)}
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
            <div className="label_input_text mt-1 border-t-2 border-gray-300 pb-5 font-semibold">
              <h1 className="mt-5 text-lg text-gray-900">Education</h1>
            </div>
            {/* Education */}
            <div className="mx-5 mt-2 flex flex-col md:flex-row md:items-center md:justify-between">
              <label className="font-semibold text-gray-900">
                What is your highest level of education?
              </label>
              <select
                onChange={(e) =>
                  setJobSeekerData({
                    ...jobSeekerData,
                    educationLevel: e.target.value,
                  })
                }
                required
                className="rounded-lg p-2 text-sm text-gray-700 outline-0"
              >
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
            <div className="mx-5 mt-2 flex flex-col md:flex-row md:items-center md:justify-between">
              <label className="font-semibold text-gray-900">
                When was this completed?
              </label>
              <input
                onChange={(e) =>
                  setJobSeekerData({
                    ...jobSeekerData,
                    educationDate: e.target.value,
                  })
                }
                required
                type="date"
                className="rounded-lg p-2 text-sm text-gray-700 outline-0"
              />
            </div>
            {/* Certifications */}
            <div className="mx-5 my-2 flex flex-col">
              <label className="font-semibold text-gray-900">
                Add any certifications that you hold
              </label>
            </div>
            {certificationList.map((singleCertification, index) => (
              <div key={index}>
                <div className="mx-5 flex flex-col">
                  <input
                    name="certification"
                    id="certification"
                    value={singleCertification.certification}
                    onChange={(e) => handleCertificateChange(e, index)}
                    type="text"
                    className="rounded-lg p-2 text-sm text-gray-700 outline-0"
                  />
                </div>
                <div className="label_input_text mx-5">
                  {certificationList.length - 1 === index && index != 0 && (
                    <button
                      onClick={() => handleCertificateRemove(index)}
                      className="black_button mt-2"
                    >
                      Remove
                    </button>
                  )}
                  {certificationList.length - 1 === index &&
                    certificationList.length < 5 && (
                      <button
                        onClick={handleCertificateAdd}
                        className="black_button mt-2"
                      >
                        Add More
                      </button>
                    )}
                </div>
              </div>
            ))}

            {/* Additional Information */}
            {/* Additional Information */}
            {/* Additional Information */}
            <div className="label_input_text mt-1 border-t-2 border-gray-300 pb-5 font-semibold">
              <h1 className="mt-5 text-lg text-gray-900">
                Additional Information
              </h1>
            </div>
            {/* Prompt */}
            <div className="mx-5 mt-2 flex flex-col">
              <label className="font-semibold text-gray-900">
                Have you been...
              </label>
            </div>
            {/* Accident information */}
            <div className="mx-5 mt-2 flex flex-col md:flex-row md:items-center md:justify-between">
              <label className="font-semibold text-gray-900">
                ..in a car accident the past 3 years?
              </label>
              <div className="flex flex-row gap-8">
                <div>
                  <label
                    htmlFor="AccidentYes"
                    className="font-semibold text-gray-900"
                  >
                    <input
                      onChange={(e) =>
                        setJobSeekerData({
                          ...jobSeekerData,
                          carAccident: "Yes",
                        })
                      }
                      type="radio"
                      id="AccidentYes"
                      name="AccidentQuestion"
                      required
                      className="rounded-lg p-2 text-sm text-gray-700 outline-0"
                    />{" "}
                    Yes
                  </label>
                </div>
                <div>
                  <label
                    htmlFor="AccidentNo"
                    className="font-semibold text-gray-900"
                  >
                    <input
                      onChange={(e) =>
                        setJobSeekerData({
                          ...jobSeekerData,
                          carAccident: "No",
                        })
                      }
                      type="radio"
                      id="AccidentNo"
                      name="AccidentQuestion"
                      required
                      className="rounded-lg p-2 text-sm text-gray-700 outline-0"
                    />{" "}
                    No
                  </label>
                </div>
              </div>
            </div>
            {/* DUI information */}
            <div className="mx-5 mt-2 flex flex-col md:flex-row md:items-center md:justify-between">
              <label className="font-semibold text-gray-900">
                ..convicted of a DUI in the past 10 years?
              </label>
              <div className="flex flex-row gap-8">
                <div>
                  <label
                    htmlFor="DUIYes"
                    className="font-semibold text-gray-900"
                  >
                    <input
                      onChange={(e) =>
                        setJobSeekerData({
                          ...jobSeekerData,
                          DUI: "Yes",
                        })
                      }
                      required
                      type="radio"
                      id="DUIYes"
                      name="DUIQuestion"
                      className="rounded-lg p-2 text-sm text-gray-700 outline-0"
                    />{" "}
                    Yes
                  </label>
                </div>
                <div>
                  <label
                    htmlFor="DUINo"
                    className="font-semibold text-gray-900"
                  >
                    <input
                      onChange={(e) =>
                        setJobSeekerData({
                          ...jobSeekerData,
                          DUI: "No",
                        })
                      }
                      required
                      type="radio"
                      id="DUINo"
                      name="DUIQuestion"
                      className="rounded-lg p-2 text-sm text-gray-700 outline-0"
                    />{" "}
                    No
                  </label>
                </div>
              </div>
            </div>
            {/* Age information */}
            <div className="mx-5 mt-2 flex flex-col md:flex-row md:items-center md:justify-between">
              <label className="font-semibold text-gray-900">
                Your age range:
              </label>
              <div className="flex flex-row gap-8">
                <div className="flex flex-col md:flex-row">
                  <input
                    onChange={(e) =>
                      setJobSeekerData({
                        ...jobSeekerData,
                        ageRange: "Under 18",
                      })
                    }
                    required
                    type="radio"
                    id="Under18"
                    name="AgeRange"
                    className="mt-2 rounded-lg p-2 text-sm text-gray-700 outline-0 md:mr-1 md:mt-0"
                  />
                  <label
                    htmlFor="Under18"
                    className="font-semibold text-gray-900"
                  >
                    {" "}
                    Under 18
                  </label>
                </div>
                <div className="flex flex-col md:flex-row">
                  <input
                    onChange={(e) =>
                      setJobSeekerData({
                        ...jobSeekerData,
                        ageRange: "18-21",
                      })
                    }
                    required
                    type="radio"
                    id="18-21"
                    name="AgeRange"
                    className="mt-2 rounded-lg p-2 text-sm text-gray-700 outline-0 md:mr-1 md:mt-0"
                  />
                  <label
                    htmlFor="18-21"
                    className="font-semibold text-gray-900"
                  >
                    {" "}
                    18 - 21
                  </label>
                </div>
                <div className="flex flex-col md:flex-row">
                  <input
                    onChange={(e) =>
                      setJobSeekerData({
                        ...jobSeekerData,
                        ageRange: "Over 21",
                      })
                    }
                    required
                    type="radio"
                    id="Over21"
                    name="AgeRange"
                    className="mt-2 rounded-lg p-2 text-sm text-gray-700 outline-0 md:mr-1 md:mt-0"
                  />
                  <label
                    htmlFor="Over21"
                    className="font-semibold text-gray-900"
                  >
                    {" "}
                    Over 21
                  </label>
                </div>
              </div>
            </div>
            <div className="mx-5 mt-2 flex flex-col md:flex-row md:items-center md:justify-between">
              {/* City */}
              <div className="mt-2 flex flex-col">
                <label className="font-semibold text-gray-900">City:</label>
                <input
                  onChange={(e) =>
                    setJobSeekerData({
                      ...jobSeekerData,
                      city: e.target.value,
                    })
                  }
                  required
                  type="text"
                  className="rounded-lg p-2 text-sm text-gray-700 outline-0 md:w-28"
                />
              </div>
              {/* State */}
              <div className="mt-2 flex flex-col">
                <label className="font-semibold text-gray-900">State:</label>
                <select
                  onChange={(e) =>
                    setJobSeekerData({
                      ...jobSeekerData,
                      state: e.target.value,
                    })
                  }
                  required
                  className="rounded-lg p-2 text-sm text-gray-700 outline-0 md:w-36"
                >
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
              <div className="mt-2 flex flex-col">
                <label className="font-semibold text-gray-900">Zip Code:</label>
                <input
                  onChange={(e) =>
                    setJobSeekerData({
                      ...jobSeekerData,
                      zipCode: e.target.value,
                    })
                  }
                  required
                  type="text"
                  className="rounded-lg p-2 text-sm text-gray-700 outline-0 md:w-28"
                />
              </div>
            </div>
          </div>
        )}

        {/* Employer additional information */}
        {employerInfo && (
          <div>
            {/* Title */}
            <div className="label_input_text mt-1 border-t-2 border-gray-300 pb-5 font-semibold">
              <h1 className="mt-5 text-lg text-gray-900">
                Additional Information for Employers
              </h1>
            </div>
            {/* Company Name */}
            <div className="mx-5 mt-2 flex flex-col md:flex-row md:items-center md:justify-between">
              <label className="font-semibold text-gray-900">
                Company Name:
              </label>
              <input
                onChange={(e) =>
                  setEmployerData({
                    ...employerData,
                    companyName: e.target.value,
                  })
                }
                required
                type="text"
                className="rounded-lg p-2 text-sm text-gray-700 outline-0 md:w-64"
              />
            </div>
            {/* Company Website */}
            <div className="mx-5 mt-2 flex flex-col md:flex-row md:items-center md:justify-between">
              <label className="font-semibold text-gray-900">
                Company Website:
              </label>
              <input
                onChange={(e) =>
                  setEmployerData({
                    ...employerData,
                    companyWebsite: e.target.value,
                  })
                }
                type="text"
                className="rounded-lg p-2 text-sm text-gray-700 outline-0 md:w-64"
              />
            </div>
            {/* Full Address */}
            <div className="mx-5 mt-2 flex flex-col md:flex-row md:items-center md:justify-between">
              <label className="font-semibold text-gray-900">
                Street Address:
              </label>
              <input
                onChange={(e) =>
                  setEmployerData({
                    ...employerData,
                    streetAddress: e.target.value,
                  })
                }
                required
                type="text"
                className="rounded-lg p-2 text-sm text-gray-700 outline-0 md:w-64"
              />
            </div>
            {/*City, State, and Zip code */}
            <div className="mx-5 mt-2 flex flex-col md:flex-row md:items-center md:justify-between">
              {/* City */}
              <div className="flex flex-col">
                <label className="font-semibold text-gray-900">City:</label>
                <input
                  onChange={(e) =>
                    setEmployerData({
                      ...employerData,
                      City: e.target.value,
                    })
                  }
                  required
                  type="text"
                  className="rounded-lg p-2 text-sm text-gray-700 outline-0 md:w-28"
                />
              </div>
              {/* State */}
              <div className="flex flex-col">
                <label className="font-semibold text-gray-900">State:</label>
                <select
                  onChange={(e) =>
                    setEmployerData({
                      ...employerData,
                      State: e.target.value,
                    })
                  }
                  required
                  className="rounded-lg p-2 text-sm text-gray-700 outline-0 md:w-36"
                >
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
              <div className="flex flex-col">
                <label className="font-semibold text-gray-900">Zip Code:</label>
                <input
                  onChange={(e) =>
                    setEmployerData({
                      ...employerData,
                      ZipCode: e.target.value,
                    })
                  }
                  required
                  type="text"
                  className="rounded-lg p-2 text-sm text-gray-700 outline-0 md:w-28"
                />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="mb-3 mt-5 flex flex-row gap-2">
        <input type="checkbox" required />
        <label className="font-semibold text-gray-900">
          I have read and agree to the{" "}
          <a href={"/termsAndConditions"} target="_blank" className="underline">
            Terms and Conditions
          </a>
        </label>
      </div>

      <div className="flex flex-col">
        <button className="black_button mb-3">Create Account</button>
        <Link href={"/logIn"}>
          Already have an Account?{" "}
          <span className="mb-3 font-semibold underline">Click Here</span>
        </Link>
        {error && (
          <div className="mt-2 w-fit rounded-md bg-red-500 px-3 py-1 text-sm text-white">
            {error}
          </div>
        )}
      </div>
    </form>
  );
};

export default signUp;
