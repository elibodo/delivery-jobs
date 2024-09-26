import Link from "next/link";
import { useEffect, useState } from "react";

const JobForm = ({
  account,
  type,
  post,
  setPost,
  submitting,
  handlesubmit,
}) => {
  //Array for days of the week
  const [operatingdays, setdays] = useState([]);
  const daysoftheweek = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setdays((nameofday) => [...nameofday, value]);
    } else {
      setdays((nameofday) =>
        nameofday.filter((specificday) => specificday !== value),
      );
    }
  };
  useEffect(() => {
    setPost({ ...post, workdays: operatingdays });
  }, [operatingdays]);

  //Array for company benefits
  const [employeebenefits, setbenefits] = useState([]);
  const companybenefits = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setbenefits((benefitname) => [...benefitname, value]);
    } else {
      setbenefits((benefitname) =>
        benefitname.filter((specificbenefit) => specificbenefit !== value),
      );
    }
  };
  useEffect(() => {
    setPost({ ...post, benefits: employeebenefits });
  }, [employeebenefits]);

  //Clearing textbox for number of hires and setting the number of hires
  const [hiresinput, sethiresinput] = useState("");
  const [hireslist, sethireslist] = useState("");

  const clearhireslist = (event) => {
    const { value } = event.target;
    sethiresinput(value);
    sethireslist("");
  };

  const clearhirestext = (event) => {
    const { value } = event.target;
    sethireslist(value);
    sethiresinput("");
  };

  useEffect(() => {
    if (hiresinput === "") {
      setPost({ ...post, numOfHires: hireslist });
    } else if (hireslist === "") {
      setPost({ ...post, numOfHires: hiresinput });
    } else {
      setPost({ ...post, numOfHires: "" });
    }
  }, [hiresinput, hireslist]);

  //Array for pay range
  const [payrange, setpayrange] = useState(["", "", ""]);
  const rangeofpay = (index, payvalue) => {
    const myarray = [...payrange];
    myarray[index] = payvalue.target.value;
    setpayrange(myarray);
  };
  useEffect(() => {
    setPost({ ...post, payrange: payrange });
  }, [payrange]);

  const [message, setMessage] = useState("");

  useEffect(() => {
    let totalJobs = account.MyJobs + 1;
    if (totalJobs <= account.JobLimit && account.JobLimit !== 0) {
      setMessage("");
    } else if (account.JobLimit === 0) {
      setMessage(
        "You do not currently have a subscription to be able to post a job. Navigate to the billing page and purchase a subscription.",
      );
    } else {
      setMessage(
        "You do not currently have a subscription that can handle the amount of jobs that you want to post. Navigate to the billing page to purchase a higher tier subscription.",
      );
    }
  }, []);

  const dynamicSubmitButton = () => {
    if (message === "") {
      return (
        <button
          type="submit"
          disabled={submitting}
          className="black_button mb-5 mt-5"
          onClick={(e) => {
            setPost({ ...post, companyName: account.companyName });
          }}
        >
          {submitting ? `${type}ing...` : type}
        </button>
      );
    } else if (
      message ===
      "You do not currently have a subscription to be able to post a job. Navigate to the billing page and purchase a subscription."
    ) {
      return (
        <button
          type="submit"
          disabled
          className="black_button_disabled mb-5 mt-5"
          onClick={(e) => {
            setPost({ ...post, companyName: account.companyName });
          }}
        >
          {submitting ? `${type}ing...` : type}
        </button>
      );
    } else {
      return (
        <button
          type="submit"
          disabled
          className="black_button_disabled mb-5 mt-5"
          onClick={(e) => {
            setPost({ ...post, companyName: account.companyName });
          }}
        >
          {submitting ? `${type}ing...` : type}
        </button>
      );
    }
  };

  return (
    <section className="flex flex-col items-center">
      <p className="description mx-2">
        Follow the prompts to create and post a new job
      </p>
      {message && (
        <p className="mx-2 mt-2 rounded-md bg-red-500 px-3 py-2 text-sm text-white md:mx-16">
          {message}
        </p>
      )}
      <form onSubmit={handlesubmit} className="mx-2">
        {/* section 1 // // // // // // // // // // // // // // // // // // // // //*/}

        <div className="border-b-2 border-gray-300 pb-4">
          <p className="description">Basic information</p>
          {/* Title */}
          <label className="mt-4 flex flex-col font-semibold text-gray-900">
            Title
            <input
              type="text"
              value={post.title}
              onChange={(e) => {
                setPost({ ...post, title: e.target.value });
              }}
              placeholder="Delivery Job"
              required
              className="mt-1 rounded-lg p-2 text-sm text-gray-700 outline-0 md:p-3"
            ></input>
          </label>
          {/* Number of hires */}
          <label className="mt-4 flex flex-col font-semibold text-gray-900">
            How many hires for this role?
            <div className="mx-5 mt-1 flex flex-col md:flex-row md:items-center">
              <select
                className="mt-1 rounded-lg p-2 text-sm text-gray-700 outline-0 md:p-3"
                id="numOfHiresdropdown"
                name="numOfHires"
                onChange={clearhirestext}
                value={hireslist}
              >
                <option value={""} disabled selected hidden>
                  Choose an Option
                </option>
                <option value={"One"}>One</option>
                <option value={"Multipe"}>Multiple</option>
                <option value={"Continously hiring"}>
                  Continuously hiring
                </option>
              </select>
              <span className="mx-2">or</span>
              <input
                name="numOfHires"
                id="hire_id"
                className="mt-1 rounded-lg p-2 text-sm text-gray-700 outline-0 md:p-3"
                type="number"
                min={1}
                placeholder="Specific number"
                onChange={clearhireslist}
                value={hiresinput}
              />
            </div>
          </label>
          {/* Dispatch location */}
          <label className="has-tooltip mt-4 flex flex-col items-start font-semibold text-gray-900">
            Dispatch Location
            <span className="tooltip mx-3 -mt-28 rounded bg-gray-400 p-1 text-black opacity-90 shadow-lg md:-mt-14">
              The dispatch location will be used to determine distance for the
              candidates. Please enter a full address, a city and state, or a
              zip code.
            </span>
            <input
              type="text"
              value={post.dispatchlocation}
              onChange={(e) => {
                setPost({ ...post, dispatchlocation: e.target.value });
              }}
              placeholder="City, State"
              required
              className="mt-1 rounded-lg p-2 text-sm text-gray-700 outline-0 md:p-3"
            ></input>
          </label>
          {/* Delivery Location */}
          <label className="mt-4 flex flex-col items-start font-semibold text-gray-900">
            Delivery Location(s)
            <input
              className="mt-1 rounded-lg p-2 text-sm text-gray-700 outline-0 md:p-3"
              type="text"
              placeholder="City, State"
              value={post.deliverylocation}
              onChange={(e) => {
                setPost({ ...post, deliverylocation: e.target.value });
              }}
              required
            ></input>
          </label>
          {/* Work authorization */}
          <label className="mt-4 flex flex-col font-semibold text-gray-900">
            Does this person require authorization to work in the US?
            <div className="font-semibold text-gray-700">
              <label htmlFor="yes_auth">
                <input
                  type="radio"
                  name="authRadio"
                  id="yes_auth"
                  className="mr-1"
                  required
                  value={"Yes"}
                  onClick={(e) => {
                    setPost({ ...post, workauthorization: e.target.value });
                  }}
                />
                Yes
              </label>
              <label htmlFor="no_auth">
                <input
                  type="radio"
                  name="authRadio"
                  id="no_auth"
                  required
                  className="ml-8 mr-1"
                  value={"No"}
                  onClick={(e) => {
                    setPost({ ...post, workauthorization: e.target.value });
                  }}
                />
                No
              </label>
            </div>
          </label>
        </div>

        {/* section 2 // // // // // // // // // // // // // // // // // // // // //*/}

        <div className="border-b-2 border-gray-300 pb-4">
          <p className="description">Scheduling Information</p>
          {/* Job type */}
          <label className="mt-4 flex flex-col items-start font-semibold text-gray-900">
            What type of job is this?
            <div className="font-semibold text-gray-700">
              <label htmlFor="full_time">
                <input
                  required
                  type="radio"
                  name="job_type_radio"
                  id="full_time"
                  className="mr-1"
                  value={"Full Time"}
                  onClick={(e) => {
                    setPost({ ...post, jobtype: e.target.value });
                  }}
                />
                Full time
              </label>
              <label htmlFor="part_time">
                <input
                  required
                  type="radio"
                  name="job_type_radio"
                  id="part_time"
                  className="ml-5 mr-1"
                  value={"Part Time"}
                  onClick={(e) => {
                    setPost({ ...post, jobtype: e.target.value });
                  }}
                />
                Part time
              </label>
              <label htmlFor="seasonal">
                <input
                  required
                  type="radio"
                  name="job_type_radio"
                  id="seasonal"
                  className="ml-5 mr-1"
                  value={"Seasonal"}
                  onClick={(e) => {
                    setPost({ ...post, jobtype: e.target.value });
                  }}
                />
                Seasonal
              </label>
            </div>
          </label>

          {/* Contract or W2 */}
          <label className="mt-4 flex flex-col items-start font-semibold text-gray-900">
            Is this job contract or W2?
            <div className="font-semibold text-gray-700">
              <label htmlFor="w2">
                <input
                  required
                  type="radio"
                  name="w2_contract_radio"
                  id="w2"
                  className="mr-1"
                  value={"W2"}
                  onClick={(e) => {
                    setPost({ ...post, jobformat: e.target.value });
                  }}
                />
                W2
              </label>
              <label htmlFor="contract">
                <input
                  required
                  type="radio"
                  name="w2_contract_radio"
                  id="contract"
                  className="ml-8 mr-1"
                  value={"Contract"}
                  onClick={(e) => {
                    setPost({ ...post, jobformat: e.target.value });
                  }}
                />
                Contract
              </label>
            </div>
          </label>

          {/* Experience required */}
          <label className="mt-4 flex flex-col items-start font-semibold text-gray-900">
            How much experience is required?
            <div className="mt-1 flex flex-row items-center">
              <select
                required
                className="mt-1 rounded-lg p-2 text-sm text-gray-700 outline-0 md:p-3"
                onClick={(e) => {
                  setPost({ ...post, experiencerequired: e.target.value });
                }}
              >
                <option value={""} disabled selected hidden>
                  Choose an Option
                </option>
                <option value={"Less than 1 year"}>Less than 1 year</option>
                <option value={"1 - 2 years"}>1 - 2 years</option>
                <option value={"2 - 5 years"}>2 - 5 years</option>
                <option value={"More than 5 years"}>More than 5 years</option>
              </select>
            </div>
          </label>

          {/* Type of shift */}
          <label className="mt-4 flex flex-col items-start font-semibold text-gray-900">
            What type of shift is this?
            <div className="font-semibold text-gray-700">
              <label htmlFor="local">
                <input
                  required
                  type="radio"
                  name="type_of_shift_radio"
                  id="local"
                  className="mr-1"
                  value={"Local"}
                  onClick={(e) => {
                    setPost({ ...post, shifttype: e.target.value });
                  }}
                />
                Local
              </label>
              <label htmlFor="over_the_road">
                <input
                  required
                  type="radio"
                  name="type_of_shift_radio"
                  id="over_the_road"
                  className="ml-8 mr-1"
                  value={"Over the road"}
                  onClick={(e) => {
                    setPost({ ...post, shifttype: e.target.value });
                  }}
                />
                Over the road
              </label>
            </div>
          </label>

          {/* Days the job operates */}
          <label className="mt-4 flex flex-col font-semibold text-gray-900">
            What days does this job operate? (Select all that apply)
            <div className="items-left flex flex-col text-gray-700">
              <label htmlFor="sunday">
                <input
                  name="daysofoperation"
                  type="checkbox"
                  id="sunday"
                  className="mr-2"
                  value={"Sunday"}
                  onChange={daysoftheweek}
                />
                Sunday
              </label>
              <label htmlFor="monday">
                <input
                  name="daysofoperation"
                  type="checkbox"
                  id="monday"
                  className="mr-2"
                  value={"Monday"}
                  onChange={daysoftheweek}
                />
                Monday
              </label>
              <label htmlFor="tuesday">
                <input
                  name="daysofoperation"
                  type="checkbox"
                  id="tuesday"
                  className="mr-2"
                  value={"Tuesday"}
                  onChange={daysoftheweek}
                />
                Tuesday
              </label>
              <label htmlFor="wednesday">
                <input
                  name="daysofoperation"
                  type="checkbox"
                  id="wednesday"
                  className="mr-2"
                  value={"Wednesday"}
                  onChange={daysoftheweek}
                />
                Wednesday
              </label>
              <label htmlFor="thursday">
                <input
                  name="daysofoperation"
                  type="checkbox"
                  id="thursday"
                  className="mr-2"
                  value={"Thursday"}
                  onChange={daysoftheweek}
                />
                Thursday
              </label>
              <label htmlFor="friday">
                <input
                  name="daysofoperation"
                  type="checkbox"
                  id="friday"
                  className="mr-2"
                  value={"Friday"}
                  onChange={daysoftheweek}
                />
                Friday
              </label>
              <label htmlFor="saturday">
                <input
                  name="daysofoperation"
                  type="checkbox"
                  id="saturday"
                  className="mr-2"
                  value={"Saturday"}
                  onChange={daysoftheweek}
                />
                Saturday
              </label>
            </div>
          </label>
        </div>

        {/* section 3 // // // // // // // // // // // // // // // // // // // // //*/}

        <div className="border-b-2 border-gray-300 pb-4">
          <p className="description">Compensation and Benefits</p>
          {/* Pay range */}
          <div className="flex flex-row">
            <label className="mt-4 flex flex-col font-semibold text-gray-900">
              What is the pay range?
              <div className="mx-5 mt-1 flex flex-col md:flex-row md:items-center">
                <input
                  required
                  className="mt-1 rounded-lg p-2 text-sm text-gray-700 outline-0 md:p-3"
                  type="number"
                  placeholder="Minimum"
                  min={0}
                  value={payrange[0]}
                  onChange={(e) => rangeofpay(0, e)}
                ></input>
                <span className="mx-2">to</span>
                <input
                  required
                  className="mt-1 rounded-lg p-2 text-sm text-gray-700 outline-0 md:p-3"
                  type="number"
                  placeholder="Maximum"
                  min={0}
                  value={payrange[1]}
                  onChange={(e) => rangeofpay(1, e)}
                ></input>
                <span className="mx-2">per</span>
                <select
                  required
                  className="mt-1 rounded-lg p-2 text-sm text-gray-700 outline-0 md:p-3"
                  value={payrange[2]}
                  onChange={(e) => rangeofpay(2, e)}
                >
                  <option value={""} disabled selected hidden>
                    Choose an Option
                  </option>
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
          <label className="mt-4 flex flex-col font-semibold text-gray-900">
            Is there additional pay for miles driven?
            <div className="mt-1 flex flex-row items-center">
              <input
                className="rounded-lg p-2 text-sm text-gray-700 outline-0 md:p-3"
                type="number"
                min={0}
                value={post.additionalpay}
                onChange={(e) => {
                  setPost({ ...post, additionalpay: e.target.value });
                }}
              ></input>
              <p className="ml-2 font-semibold text-gray-900">Cents Per Mile</p>
            </div>
          </label>

          {/* Benefits for the employee */}
          <label className="mt-4 flex flex-col font-semibold text-gray-900">
            What benefits does your company offer? (Select all that apply)
            <div className="mt-1 flex flex-col md:flex-row md:gap-20">
              <div className="items-left flex flex-col text-gray-700">
                <label htmlFor="health_insurance">
                  <input
                    type="checkbox"
                    id="health_insurance"
                    className="mr-2"
                    value={"Health Insurance"}
                    onChange={companybenefits}
                  />
                  Health Insurance
                </label>
                <label htmlFor="dental_insurance">
                  <input
                    type="checkbox"
                    id="dental_insurance"
                    className="mr-2"
                    value={"Dental Insurance"}
                    onChange={companybenefits}
                  />
                  Dental Insurance
                </label>
                <label htmlFor="vision_insurance">
                  <input
                    type="checkbox"
                    id="vision_insurance"
                    className="mr-2"
                    value={"Vision Insurance"}
                    onChange={companybenefits}
                  />
                  Vision Insurance
                </label>
                <label htmlFor="paid_time_off">
                  <input
                    type="checkbox"
                    id="paid_time_off"
                    className="mr-2"
                    value={"Paid Time Off"}
                    onChange={companybenefits}
                  />
                  Paid Time Off
                </label>
                <label htmlFor="paid_training">
                  <input
                    type="checkbox"
                    id="paid_training"
                    className="mr-2"
                    value={"Paid Training"}
                    onChange={companybenefits}
                  />
                  Paid Training
                </label>
                <label htmlFor="paid_sick_time">
                  <input
                    type="checkbox"
                    id="paid_sick_time"
                    className="mr-2"
                    value={"Paid Sick Time"}
                    onChange={companybenefits}
                  />
                  Paid Sick Time
                </label>
                <label htmlFor="fuel_discount">
                  <input
                    type="checkbox"
                    id="fuel_discount"
                    className="mr-2"
                    value={"Fuel Discount"}
                    onChange={companybenefits}
                  />
                  Fuel Discount
                </label>
                <label htmlFor="pet_insurance">
                  <input
                    type="checkbox"
                    id="pet_insurance"
                    className="mr-2"
                    value={"Pet Insurance"}
                    onChange={companybenefits}
                  />
                  Pet Insurance
                </label>
                <label htmlFor="company_vehicle">
                  <input
                    type="checkbox"
                    id="company_vehicle"
                    className="mr-2"
                    value={"Company Vehicle"}
                    onChange={companybenefits}
                  />
                  Company Vehicle
                </label>
                <label htmlFor="profit_sharing">
                  <input
                    type="checkbox"
                    id="profit_sharing"
                    className="mr-2"
                    value={"Profit Sharing"}
                    onChange={companybenefits}
                  />
                  Profit Sharing
                </label>
              </div>
              <div className="items-left flex flex-col text-gray-700">
                <label htmlFor="parental_leave">
                  <input
                    type="checkbox"
                    id="parental_leave"
                    className="mr-2"
                    value={"Parental Leave"}
                    onChange={companybenefits}
                  />
                  Parental Leave
                </label>
                <label htmlFor="401k">
                  <input
                    type="checkbox"
                    id="401k"
                    className="mr-2"
                    value={"401K"}
                    onChange={companybenefits}
                  />
                  401K
                </label>
                <label htmlFor="401k_matching">
                  <input
                    type="checkbox"
                    id="401k_matching"
                    className="mr-2"
                    value={"401K Matching"}
                    onChange={companybenefits}
                  />
                  401K Matching
                </label>
                <label htmlFor="life_insurance">
                  <input
                    type="checkbox"
                    id="life_insurance"
                    className="mr-2"
                    value={"Life Insurance"}
                    onChange={companybenefits}
                  />
                  Life Insurance
                </label>
                <label htmlFor="referral_program">
                  <input
                    type="checkbox"
                    id="referral_program"
                    className="mr-2"
                    value={"Referral Program"}
                    onChange={companybenefits}
                  />
                  Referral Program
                </label>
                <label htmlFor="relocation_assistance">
                  <input
                    type="checkbox"
                    id="relocation_assistance"
                    className="mr-2"
                    value={"Relocation Assistance"}
                    onChange={companybenefits}
                  />
                  Relocation Assistance
                </label>
                <label htmlFor="tuition_reimbursement">
                  <input
                    type="checkbox"
                    id="tuition_reimbursement"
                    className="mr-2"
                    value={"Tuition Reimbursement"}
                    onChange={companybenefits}
                  />
                  Tuition Reimbursement
                </label>
                <label htmlFor="mileage_reimbursement">
                  <input
                    type="checkbox"
                    id="mileage_reimbursement"
                    className="mr-2"
                    value={"Mileage Reimbursement"}
                    onChange={companybenefits}
                  />
                  Mileage Reimbursement
                </label>

                <label htmlFor="other">
                  <input
                    type="checkbox"
                    id="other"
                    className="mr-2"
                    value={"Other"}
                    onChange={companybenefits}
                  />
                  Other
                </label>
                <label htmlFor="none">
                  <input
                    type="checkbox"
                    id="none"
                    className="mr-2"
                    value={"None"}
                    onChange={companybenefits}
                  />
                  None
                </label>
              </div>
            </div>
          </label>
        </div>

        {/* section 4 // // // // // // // // // // // // // // // // // // // // //*/}

        <div className="border-b-2 border-gray-300 pb-4">
          <p className="description">Description</p>
          {/* description */}
          <label className="mt-4 flex flex-col font-semibold text-gray-900">
            Add a description to your job listing
            <textarea
              required
              value={post.description}
              onChange={(e) =>
                setPost({ ...post, description: e.target.value })
              }
              placeholder="Write your description here..."
              className="mt-1 max-h-[350px] min-h-[150px] min-w-[250px] resize-y rounded-lg p-2 text-sm text-gray-700 outline-0 md:p-3"
            ></textarea>
          </label>
        </div>

        {/* section 5 // // // // // // // // // // // // // // // // // // // // //*/}

        <div className="border-b-2 border-gray-300 pb-4">
          <p className="description">Additional Information</p>
          {/* resume preference */}
          {/* <label className="mt-4 flex flex-col text-gray-900 font-semibold">
            Will applicants be required to include a resume?
            <div className="font-semibold text-gray-700">
              <label htmlFor="yes_resume">
                <input
                  required
                  type="radio"
                  name="resume_radio"
                  id="yes_resume"
                  className="  mr-1"
                  value={"Yes"}
                  onChange={(e) => setPost({ ...post, resume: e.target.value })}
                />
                Yes
              </label>
              <label htmlFor="no_resume">
                <input
                  required
                  type="radio"
                  name="resume_radio"
                  id="no_resume"
                  className="ml-10 mr-1"
                  value={"No"}
                  onChange={(e) => setPost({ ...post, resume: e.target.value })}
                />
                No
              </label>
              <label htmlFor="optional_resume">
                <input
                  required
                  type="radio"
                  name="resume_radio"
                  id="optional_resume"
                  className="ml-10 mr-1"
                  value={"Optional"}
                  onChange={(e) => setPost({ ...post, resume: e.target.value })}
                />
                Optional
              </label>
            </div>
          </label> */}
          {/* drug test */}
          <label className="mt-4 flex flex-col font-semibold text-gray-900">
            Will applicants be required take a drug test?
            <div className="mt-1 flex flex-col font-semibold text-gray-700 md:flex-row md:items-center md:gap-5">
              <label htmlFor="yes_marijuana_drugtest">
                <input
                  required
                  type="radio"
                  name="drugtest_radio"
                  id="yes_marijuana_drugtest"
                  className="mr-1"
                  value={"Yes, including marijuana"}
                  onChange={(e) =>
                    setPost({ ...post, drugtest: e.target.value })
                  }
                />
                Yes, Including Marijuana
              </label>
              <label htmlFor="yes_drugtest">
                <input
                  required
                  type="radio"
                  name="drugtest_radio"
                  id="yes_drugtest"
                  className="mr-1"
                  value={"Yes, excluding marijuana"}
                  onChange={(e) =>
                    setPost({ ...post, drugtest: e.target.value })
                  }
                />
                Yes, Excluding Marijuana
              </label>
              <label htmlFor="no_drugtest">
                <input
                  required
                  type="radio"
                  name="drugtest_radio"
                  id="no_drugtest"
                  className="mr-1"
                  value={"No"}
                  onChange={(e) =>
                    setPost({ ...post, drugtest: e.target.value })
                  }
                />
                No
              </label>
            </div>
          </label>

          {/* background check question */}
          <label className="mt-4 flex flex-col font-semibold text-gray-900">
            Will applicants be required to do a background check?
            <div className="font-semibold text-gray-700">
              <label htmlFor="yes_background">
                <input
                  required
                  type="radio"
                  name="background_radio"
                  id="yes_background"
                  className="mr-1"
                  value={"Yes"}
                  onChange={(e) =>
                    setPost({ ...post, backgroundcheck: e.target.value })
                  }
                />
                Yes
              </label>
              <label htmlFor="no_background">
                <input
                  required
                  type="radio"
                  name="background_radio"
                  id="no_background"
                  className="ml-8 mr-1"
                  value={"No"}
                  onChange={(e) =>
                    setPost({ ...post, backgroundcheck: e.target.value })
                  }
                />
                No
              </label>
            </div>
          </label>

          {/* dot/med card question */}
          <label className="mt-4 flex flex-col font-semibold text-gray-900">
            Will applicants be required to have a DOT medical card?
            <div className="mt-1 flex flex-col font-semibold text-gray-700 md:flex-row md:gap-5">
              <label htmlFor="yes_dot_radio">
                <input
                  required
                  type="radio"
                  name="dot_radio"
                  id="yes_dot_radio"
                  className="mr-1"
                  value={"Yes"}
                  onChange={(e) =>
                    setPost({ ...post, dotcard: e.target.value })
                  }
                />
                Yes
              </label>
              <label htmlFor="yes_dotprior_radio">
                <input
                  required
                  type="radio"
                  name="dot_radio"
                  id="yes_dotprior_radio"
                  className="mr-1"
                  value={"Yes, but prior to applying"}
                  onChange={(e) =>
                    setPost({ ...post, dotcard: e.target.value })
                  }
                />
                Yes, but prior to applying
              </label>
              <label htmlFor="no_dot_radio">
                <input
                  required
                  type="radio"
                  name="dot_radio"
                  id="no_dot_radio"
                  className="mr-1"
                  value={"No"}
                  onChange={(e) =>
                    setPost({ ...post, dotcard: e.target.value })
                  }
                />
                No
              </label>
            </div>
          </label>

          {/* email updates */}
          <label className="mt-4 flex flex-col items-start font-semibold text-gray-900">
            What email would you like to recieve updates about the job
            <input
              required
              className="form_input mt-1"
              type="email"
              placeholder="Email address..."
              value={post.emailupdates}
              onChange={(e) => {
                setPost({ ...post, emailupdates: e.target.value });
              }}
            ></input>
          </label>
          {/* questions for the applicant */}
          {/* <label className="mt-4 flex flex-col text-gray-900 font-semibold">
            Add questions for the applicants to answer
            <div className="mt-1 flex flex-row items-center">
              <input
                className="form_input mr-4"
                type="text"
                placeholder="Question 1..."
              ></input>
              <select className="form_input max-w-36">
                <option value={""} disabled selected hidden>
                  Responce type
                </option>
                <option>Text</option>
                <option>Number</option>
                <option>Yes / No</option>
              </select>
            </div>
            <div className="mt-3 flex flex-row items-center">
              <input
                className="form_input mr-4"
                type="text"
                placeholder="Question 2..."
              ></input>
              <select className="form_input max-w-36">
                <option value={""} disabled selected hidden>
                  Responce type
                </option>
                <option>Text</option>
                <option>Number</option>
                <option>Yes / No</option>
              </select>
            </div>
            <div className="mt-3 flex flex-row items-center">
              <input
                className="form_input mr-4"
                type="text"
                placeholder="Question 3..."
              ></input>
              <select className="form_input max-w-36">
                <option value={""} disabled selected hidden>
                  Responce type
                </option>
                <option>Text</option>
                <option>Number</option>
                <option>Yes / No</option>
              </select>
            </div>
            <div className="mt-3 flex flex-row items-center">
              <input
                className="form_input mr-4"
                type="text"
                placeholder="Question 4..."
              ></input>
              <select className="form_input max-w-36">
                <option value={""} disabled selected hidden>
                  Responce type
                </option>
                <option>Text</option>
                <option>Number</option>
                <option>Yes / No</option>
              </select>
            </div>
            <div className="mt-3 flex flex-row items-center">
              <input
                className="form_input mr-4"
                type="text"
                placeholder="Question 5..."
              ></input>
              <select className="form_input max-w-36">
                <option value={""} disabled selected hidden>
                  Responce type
                </option>
                <option>Text</option>
                <option>Number</option>
                <option>Yes / No</option>
              </select>
            </div>
          </label> */}
        </div>
        <div className="flex flex-row justify-between">
          <Link
            href={"/employerAccount/employerAccountHome"}
            className="outline_button mb-5 mt-5"
          >
            Cancel
          </Link>
          {dynamicSubmitButton()}
        </div>
      </form>
    </section>
  );
};

export default JobForm;
