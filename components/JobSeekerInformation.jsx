import React, { useEffect } from "react";
import { useState } from "react";

const JobSeekerInformation = ({ account }) => {
  const licenseDate = new Date(account.licenseExpire).toLocaleDateString(
    "en-CA",
    {
      timeZone: "UTC",
    }
  );
  const dotDate = new Date(account.DOTExpire).toLocaleDateString("en-CA", {
    timeZone: "UTC",
  });
  const eduDate = new Date(account.educationDate).toLocaleDateString("en-CA", {
    timeZone: "UTC",
  });

  // Endorsements
  const endorsementCheck = (value) => {
    if (account.endorsements.includes(value)) {
      return true;
    } else {
      return false;
    }
  };

  // Certifications
  const handleCertificateAdd = () => {};
  const handleCertificateRemove = (index) => {};

  return (
    <div>
      {/* License, dot, cdl, additional, endorsements */}
      <form className="flex flex-row justify-center">
        <div className="w-1/3 mx-8">
          <div className="flex flex-col mb-4">
            {/* drivers license */}
            <p className="description text-center">Drivers License</p>
            <div className="mt-2 flex flex-col items-start">
              <label className="text-gray-900 font-semibold">
                License Class
              </label>
              <input
                defaultValue={account.licenseClass}
                type="text"
                className="form_input mt-1"
                required
              />
            </div>
            <div className="mt-4 flex flex-col items-start">
              <label className="text-gray-900 font-semibold">
                Issuing State
              </label>
              <select
                defaultValue={account.licenseState}
                type="text"
                className="form_input mt-1"
                required
              >
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
            <div className="mt-4 flex flex-col items-start border-b-2 border-gray-200">
              <label className="text-gray-900 font-semibold">
                License Expiration Date
              </label>
              <input
                defaultValue={licenseDate}
                type="date"
                className="form_input mt-1 mb-3"
                required
              />
            </div>
            {/* additional info */}
            <p className="description text-center">Additional Information</p>
            <div className="mt-4 flex flex-col items-start">
              <label className="text-gray-900 font-semibold">
                Car accident in the past 3 years?
              </label>
              <select
                defaultValue={account.carAccident}
                className="form_input mt-1"
                required
              >
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>
            <div className="mt-4 flex flex-col items-start">
              <label className="text-gray-900 font-semibold">
                Convicted of a DUI in the past 10 years?
              </label>
              <select
                defaultValue={account.DUI}
                className="form_input mt-1"
                required
              >
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>
            <div className="mt-4 flex flex-col items-start">
              <label className="text-gray-900 font-semibold">Age range</label>
              <select
                defaultValue={account.ageRange}
                className="form_input mt-1"
                required
              >
                <option>Under 18</option>
                <option>18-21</option>
                <option>Over 21</option>
              </select>
            </div>
            <p className="text-gray-600 text-base mt-4">
              Updating all of these settings can be done with the button below.
              Please Ensure that all information from each section is correct.{" "}
              {
                "(Drivers License, DOT Information, Additional Information, CDL Information, Endorsements)"
              }
            </p>
          </div>
        </div>

        <div className="w-1/3 mx-8">
          <div className="flex flex-col mb-4">
            {/* dot information */}
            <p className="description text-center">DOT Information</p>
            <div className="mt-2 flex flex-col items-start">
              <label className="text-gray-900 font-semibold">
                DOT Medical Card
              </label>
              <select
                defaultValue={account.DOT}
                type="text"
                className="form_input mt-1"
                required
              >
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>
            <div className="mt-4 flex flex-col items-start  border-b-2 border-gray-200">
              <label className="text-gray-900 font-semibold">
                DOT Expiration Date
              </label>
              <input
                defaultValue={dotDate}
                type="date"
                className="form_input mt-1 mb-3"
                required
              />
            </div>
            {/* cdl information */}
            <p className="description text-center">CDL Information</p>
            <div className="mt-4 flex flex-col items-start">
              <label className="text-gray-900 font-semibold">
                Commercial Drivers License
              </label>
              <select
                defaultValue={account.CDL}
                type="text"
                className="form_input mt-1"
                required
              >
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>
            <div className="mt-4 flex flex-col items-start">
              <label className="text-gray-900 font-semibold">Twik Card</label>
              <select
                defaultValue={account.twikCard}
                type="text"
                className="form_input mt-1"
                required
              >
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>
            <div className="mt-4 flex flex-col items-start">
              <label className="text-gray-900 font-semibold">CDL Options</label>
              <div className="flex flex-row w-full gap-2 border-b-2 border-gray-200">
                <select
                  defaultValue={account.CDLOption1}
                  type="text"
                  className="form_input mt-1 mb-3"
                  required
                >
                  <option>Interstate</option>
                  <option>Intrastate</option>
                </select>
                <select
                  defaultValue={account.CDLOption2}
                  type="text"
                  className="form_input mt-1 mb-3"
                  required
                >
                  <option>Excepted</option>
                  <option>Non-Excepted</option>
                </select>
              </div>
            </div>
            <p className="description text-center">Endorsements</p>
            <div className="mt-4 flex flex-col items-start">
              <label for="A-MTRCL Also">
                <input
                  name="endorsements"
                  type="checkbox"
                  id="A-MTRCL Also"
                  className="mr-1"
                  value={"A-MTRCL Also"}
                  defaultChecked={endorsementCheck("A-MTRCL Also")}
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
                  defaultChecked={endorsementCheck("H-HazMat")}
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
                  defaultChecked={endorsementCheck("N-Tanker")}
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
                  defaultChecked={endorsementCheck("O-MTRCL Only")}
                />
                O-MTRCL Only
              </label>
              <label for="P->15 Passengers">
                <input
                  name="endorsements"
                  type="checkbox"
                  id="P->15 Passengers"
                  className="mr-1"
                  value={"P->15 Passengers"}
                  defaultChecked={endorsementCheck("P->15 Passengers")}
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
                  defaultChecked={endorsementCheck("S-School Bus")}
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
                  defaultChecked={endorsementCheck("T-Dbl/Trpl Trailers")}
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
                  defaultChecked={endorsementCheck("X-HM+Tanker")}
                />
                X-HM+Tanker
              </label>
            </div>
          </div>
        </div>
      </form>
      <div className="flex flex-col items-center border-b-2 border-gray-300 mx-8">
        <button className="outline_button mb-4">Save Information</button>
      </div>
      <div className="flex flex-row justify-center">
        <div className="w-1/3 mx-8">
          <div className="flex flex-col mb-4">
            {/* Education */}
            <p className="description text-center">Education</p>
            <div className="mt-2 flex flex-col items-start">
              <label className="text-gray-900 font-semibold">
                Education Level
              </label>
              <select
                defaultValue={account.educationLevel}
                className="form_input mt-1"
                required
              >
                <option value="High School">High School</option>
                <option value="Associates">Associates</option>
                <option value="Bachelors">Bachelors</option>
                <option value="Masters">Masters</option>
                <option value="Doctorate">Doctorate</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="mt-4 flex flex-col items-start">
              <label className="text-gray-900 font-semibold">
                Date of Completion
              </label>
              <input
                defaultValue={eduDate}
                type="date"
                className="form_input mt-1"
                required
              />
            </div>
            <p className="text-gray-600 text-base mt-4">
              Please click the button below to update the education and
              certifications portion of the resume. Please ensure that all
              information from each section is correct. (Education,
              Certifications)
            </p>
          </div>
        </div>

        <div className="w-1/3 mx-8">
          <div className="flex flex-col mb-4">
            {/* Certificates */}
            <p className="description text-center">Certifications</p>
            <div className="mt-2 flex flex-col items-start">
              <label className="text-gray-900 font-semibold">
                Certificate Name
              </label>
              {account.certificates.map((cert, index) => (
                <div className="w-full">
                  <div
                    key={index}
                    className="flex flex-row items-center w-full gap-5"
                  >
                    <input
                      className="form_input mt-1"
                      type="text"
                      defaultValue={cert.certification}
                    />
                    <button className="black_button">Remove</button>
                  </div>
                  {account.certificates.length - 1 === index &&
                    account.certificates.length < 5 && (
                      <div className="flex mt-3 justify-center">
                        <button className="black_button">Add More</button>
                      </div>
                    )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center border-b-2 border-gray-300 mx-8">
        <button className="outline_button mb-4">Save Information</button>
      </div>
      <div className="flex flex-col items-center mx-8">
        <p className="description text-center">Work History</p>
      </div>

      {account.experienceArray.map((workdata, index) => (
        <div>
          <div key={index} className="flex flex-row justify-center">
            <div className="w-1/3 mx-8">
              <div className="flex flex-col mb-4">
                {/* Work Experience */}
                <div className="mt-2 flex flex-col items-start">
                  <label className="text-gray-900 font-semibold">Title</label>
                  <input
                    defaultValue={workdata.title}
                    className="form_input mt-1"
                    required
                  />
                </div>
                <div className="mt-1 flex flex-col items-start">
                  <label className="text-gray-900 font-semibold">
                    Company Name
                  </label>
                  <input
                    defaultValue={workdata.company}
                    type="text"
                    className="form_input mt-1"
                    required
                  />
                </div>
                <div className="mt-1 flex flex-col items-start">
                  <label className="text-gray-900 font-semibold">
                    Length (Years)
                  </label>
                  <input
                    defaultValue={workdata.length}
                    type="text"
                    className="form_input mt-1"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="w-1/3 mx-8">
              <div className="flex flex-col mb-4">
                {/* Work Experience */}
                <div className="mt-2 flex flex-col items-start">
                  <label className="text-gray-900 font-semibold">
                    Job Duties
                  </label>
                  <textarea
                    defaultValue={workdata.duties}
                    className="resize-y min-h-[150px] form_input mt-1 h-[150px]"
                    required
                  />
                </div>
                <div className="flex flex-row mt-3 justify-center gap-4">
                  <button className="black_button">Remove Job</button>
                  {account.experienceArray.length - 1 === index &&
                    account.experienceArray.length < 5 && (
                      <button className="black_button">Add More</button>
                    )}
                </div>
              </div>
            </div>
          </div>
          <div className="border-b-2 border-gray-200 mx-28 mb-4"></div>
        </div>
      ))}
      <div className="flex flex-col items-center mx-8">
        <button className="outline_button mb-4">Save Information</button>
      </div>
    </div>
  );
};

export default JobSeekerInformation;
