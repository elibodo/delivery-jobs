"use client";
import React from "react";
import { useState } from "react";

const JobForm = () => {
  return (
    <section className="flex flex-col items-center">
      <p className="description">
        Follow the prompts to create and post a new job
      </p>
      <form className="">
        {/* section 1 // // // // // // // // // // // // // // // // // // // // //*/}

        <div className="border-b-2 border-gray-500 pb-4">
          <p className="description">Basic information</p>
          {/* Title */}
          <label className="mt-4 flex flex-col items-start text-gray-900 font-semibold">
            Title
            <input
              className="mt-1 form_input"
              type="text"
              placeholder="Delivery Job"
              required
            ></input>
          </label>
          {/* Number of hires */}
          <label className="mt-4 flex flex-col text-gray-900 font-semibold">
            How many hires for this role?
            <div className="mt-1 flex flex-row items-center">
              <select className="form_input" required>
                <option selected>Choose an option</option>
                <option>One</option>
                <option>Multiple</option>
                <option>Continuously hiring</option>
              </select>
              <span className="mx-2">or</span>
              <input
                className="form_input"
                type="number"
                placeholder="Specific number"
                required
              ></input>
            </div>
          </label>
          {/* Dispatch location */}
          <label className="mt-4 flex flex-col items-start text-gray-900 font-semibold">
            Dispatch Location
            <input
              className="form_input"
              type="text"
              placeholder="Address"
              required
            ></input>
          </label>
          {/* Delivery Location */}
          <label className="mt-4 flex flex-col items-start text-gray-900 font-semibold">
            Delivery Location(s)
            <input
              className="form_input"
              type="text"
              placeholder="Address"
              required
            ></input>
          </label>
          {/* Work authorization */}
          <label className="mt-4 flex flex-col items-start text-gray-900 font-semibold">
            Does this person require authorization to work in the US?
            <div className="font-semibold text-gray-700">
              <input type="radio" name="authRadio" id="yes_auth" />
              <label for="yes_auth" className="ml-1">
                Yes
              </label>
              <input
                type="radio"
                name="authRadio"
                id="no_auth"
                className="ml-10"
              />
              <label for="no_auth" className="ml-1">
                No
              </label>
            </div>
          </label>
        </div>

        {/* section 2 // // // // // // // // // // // // // // // // // // // // //*/}

        <div className="border-b-2 border-gray-500 pb-4">
          <p className="description">Scheduling Information</p>
          {/* Relocate */}
          <label className="mt-4 flex flex-col items-start text-gray-900 font-semibold">
            Does this job require the person to relocate?
            <div className="font-semibold text-gray-700">
              <input type="radio" name="relocateRadio" id="yes_relocate" />
              <label for="yes_relocate" className="ml-1">
                Yes
              </label>
              <input
                type="radio"
                name="relocateRadio"
                id="no_relocate"
                className="ml-10"
              />
              <label for="no_relocate" className="ml-1">
                No
              </label>
            </div>
          </label>
          {/* Job type */}
          <label className="mt-4 flex flex-col items-start text-gray-900 font-semibold">
            What type of job is this?
            <div className="font-semibold text-gray-700">
              <input type="radio" name="job_type_radio" id="full_time" />
              <label for="full_time" className="ml-1">
                Full time
              </label>
              <input
                type="radio"
                name="job_type_radio"
                id="part_time"
                className="ml-10"
              />
              <label for="part_time" className="ml-1">
                Part time
              </label>
              <input
                type="radio"
                name="job_type_radio"
                id="weekends_only"
                className="ml-10"
              />
              <label for="weekends_only" className="ml-1">
                Weekends only
              </label>
            </div>
          </label>
          {/* Experience required */}
          <label className="mt-4 flex flex-col items-start text-gray-900 font-semibold">
            How much experience is required?
            <input
              className="form_input"
              type="text"
              placeholder="One year | No experience required"
              required
            ></input>
          </label>
          {/* Shift time */}
          <div className="flex flex-row">
            <label className="mt-4 flex flex-col text-gray-900 font-semibold">
              What time is the shift
              <div className="mt-1 flex flex-row items-center">
                <select className="form_input" required>
                  <option selected>Choose an option</option>
                  <option>Morning</option>
                  <option>Day</option>
                  <option>Night</option>
                </select>
                <span className="mx-2">or</span>
              </div>
            </label>
            <label className="mt-4 flex flex-col text-gray-900 font-semibold">
              Start time
              <div className="mt-1 flex flex-row items-center">
                <input
                  className="form_input max-w-32"
                  type="text"
                  placeholder="8 AM"
                  required
                ></input>
                <span className="mx-2">to</span>
              </div>
            </label>
            <label className="mt-4 flex flex-col text-gray-900 font-semibold">
              End time
              <div className="mt-1 flex flex-row items-center">
                <input
                  className="form_input max-w-32"
                  type="text"
                  placeholder="5 PM"
                  required
                ></input>
              </div>
            </label>
          </div>
        </div>

        {/* section 3 // // // // // // // // // // // // // // // // // // // // //*/}

        <div className="border-b-2 border-gray-500 pb-4">
          <p className="description">Compensation and Benefits</p>
          {/* Pay range */}
          <div className="flex flex-row">
            <label className="mt-4 flex flex-col text-gray-900 font-semibold">
              What is the pay range?
              <div className="mt-1 flex flex-row items-center">
                <input
                  className="form_input max-w-32"
                  type="number"
                  placeholder="Minimum"
                  required
                ></input>
                <span className="mx-2">to</span>
                <input
                  className="form_input max-w-32"
                  type="number"
                  placeholder="Maximum"
                  required
                ></input>
                <span className="mx-2">per</span>
                <select className="form_input" required>
                  <option>Hour</option>
                  <option>Day</option>
                  <option>Week</option>
                  <option>Month</option>
                  <option>Year</option>
                </select>
              </div>
            </label>
          </div>

          {/* Additional miles pay */}
          <label className="mt-4 flex flex-col text-gray-900 font-semibold">
            Is there additional pay for miles driven?
            <div className="mt-1 flex flex-row items-center">
              <input
                className="form_input max-w-32"
                type="number"
                placeholder="Cents"
                required
              ></input>
              <div className="flex flex-row">
                <span className="ml-2">cents</span>
                <span className="mr-2 ml-1">per</span>
              </div>
              <div className="form_input bg-white">Mile</div>
            </div>
          </label>

          {/* Benefits for the employee */}
          <label className="mt-4 flex flex-col text-gray-900 font-semibold">
            What benefits does your company offer? (Select all that apply)
            <div className="flex flex-col items-left text-gray-700">
              <label for="401k_check" className="">
                <input type="checkbox" id="401k_check" className="mr-2" />
                401K Matching
              </label>
              <label for="medical_check" className="">
                <input type="checkbox" id="medical_check" className="mr-2" />
                Medical Insurance
              </label>
              <label for="dental_check" className="">
                <input type="checkbox" id="dental_check" className="mr-2" />
                Dental Insurance
              </label>
              <label for="vision_check" className="">
                <input type="checkbox" id="vision_check" className="mr-2" />
                Vision Insurance
              </label>
              <label for="life_check" className="">
                <input type="checkbox" id="life_check" className="mr-2" />
                Life Insurance
              </label>
            </div>
          </label>
        </div>

        {/* section 4 // // // // // // // // // // // // // // // // // // // // //*/}

        <div className="border-b-2 border-gray-500 pb-4">
          <p className="description">Description</p>
          {/* description */}
          <label className="mt-4 flex flex-col text-gray-900 font-semibold">
            Add a description to your job listing
            <textarea
              placeholder="Write your description here..."
              className="resize-y flex rounded-lg min-h-60 w-[600px] mt-1 p-3 text-sm text-gray-700 outline-0"
            ></textarea>
          </label>
        </div>

        {/* section 5 // // // // // // // // // // // // // // // // // // // // //*/}
      </form>
    </section>
  );
};

export default JobForm;
