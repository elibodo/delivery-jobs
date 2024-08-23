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
        nameofday.filter((specificday) => specificday !== value)
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
        benefitname.filter((specificbenefit) => specificbenefit !== value)
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
        "You do not currently have a subscription to be able to post a job. Navigate to the billing page and purchase a subscription."
      );
    } else {
      setMessage(
        "You do not currently have a subscription that can handle the amount of jobs that you want to post. Navigate to the billing page to purchase a higher tier subscription."
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
        <p className="bg-red-500 text-white py-2 px-3 rounded-md text-sm mt-2 mx-2 md:mx-16">
          {message}
        </p>
      )}
      <form onSubmit={handlesubmit} className="mx-2">
        {/* section 1 // // // // // // // // // // // // // // // // // // // // //*/}

        <div className="border-b-2 border-gray-300 pb-4">
          <p className="description">Basic information</p>
          {/* Title */}
          <label className="mt-4 flex flex-col text-gray-900 font-semibold">
            Title
            <input
              type="text"
              value={post.title}
              onChange={(e) => {
                setPost({ ...post, title: e.target.value });
              }}
              placeholder="Delivery Job"
              required
              className="rounded-lg p-2 md:p-3 text-sm text-gray-700 outline-0 mt-1"
            ></input>
          </label>
          {/* Number of hires */}
          <label className="mt-4 flex flex-col text-gray-900 font-semibold">
            How many hires for this role?
            <div className="mt-1 flex flex-col md:flex-row md:items-center mx-5">
              <select
                className="rounded-lg p-2 md:p-3 text-sm text-gray-700 outline-0 mt-1"
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
                className="rounded-lg p-2 md:p-3 text-sm text-gray-700 outline-0 mt-1"
                type="number"
                min={1}
                placeholder="Specific number"
                onChange={clearhireslist}
                value={hiresinput}
              ></input>
            </div>
          </label>
          {/* Dispatch location */}
          <label className="mt-4 flex flex-col items-start text-gray-900 font-semibold">
            Dispatch Location
            <input
              type="text"
              value={post.dispatchlocation}
              onChange={(e) => {
                setPost({ ...post, dispatchlocation: e.target.value });
              }}
              placeholder="City, State"
              required
              className="rounded-lg p-2 md:p-3 text-sm text-gray-700 outline-0 mt-1"
            ></input>
          </label>
          {/* Delivery Location */}
          <label className="mt-4 flex flex-col items-start text-gray-900 font-semibold">
            Delivery Location(s)
            <input
              className="rounded-lg p-2 md:p-3 text-sm text-gray-700 outline-0 mt-1"
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
          <label className="mt-4 flex flex-col text-gray-900 font-semibold">
            Does this person require authorization to work in the US?
            <div className="font-semibold text-gray-700">
              <label for="yes_auth">
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
              <label for="no_auth">
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
          <label className="mt-4 flex flex-col items-start text-gray-900 font-semibold">
            What type of job is this?
            <div className="font-semibold text-gray-700">
              <label for="full_time">
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
              <label for="part_time">
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
              <label for="seasonal">
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
          <label className="mt-4 flex flex-col items-start text-gray-900 font-semibold">
            Is this job contract or W2?
            <div className="font-semibold text-gray-700">
              <label for="w2">
                <input
                  required
                  type="radio"
                  name="w2_contract_radio"
                  id="w2"
                  className=" mr-1"
                  value={"W2"}
                  onClick={(e) => {
                    setPost({ ...post, jobformat: e.target.value });
                  }}
                />
                W2
              </label>
              <label for="contract">
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
          <label className="mt-4 flex flex-col items-start text-gray-900 font-semibold">
            How much experience is required?
            <div className="mt-1 flex flex-row items-center">
              <select
                required
                className="rounded-lg p-2 md:p-3 text-sm text-gray-700 outline-0 mt-1"
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
          <label className="mt-4 flex flex-col items-start text-gray-900 font-semibold">
            What type of shift is this?
            <div className="font-semibold text-gray-700">
              <label for="local">
                <input
                  required
                  type="radio"
                  name="type_of_shift_radio"
                  id="local"
                  className=" mr-1"
                  value={"Local"}
                  onClick={(e) => {
                    setPost({ ...post, shifttype: e.target.value });
                  }}
                />
                Local
              </label>
              <label for="over_the_road">
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
          <label className="mt-4 flex flex-col text-gray-900 font-semibold">
            What days does this job operate? (Select all that apply)
            <div className="flex flex-col items-left text-gray-700">
              <label for="sunday">
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
              <label for="monday">
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
              <label for="tuesday">
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
              <label for="wednesday">
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
              <label for="thursday">
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
              <label for="friday">
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
              <label for="saturday">
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
            <label className="mt-4 flex flex-col text-gray-900 font-semibold">
              What is the pay range?
              <div className="mt-1 flex flex-col md:flex-row md:items-center mx-5">
                <input
                  required
                  className="rounded-lg p-2 md:p-3 text-sm text-gray-700 outline-0 mt-1"
                  type="number"
                  placeholder="Minimum"
                  min={0}
                  value={payrange[0]}
                  onChange={(e) => rangeofpay(0, e)}
                ></input>
                <span className="mx-2">to</span>
                <input
                  required
                  className="rounded-lg p-2 md:p-3 text-sm text-gray-700 outline-0 mt-1"
                  type="number"
                  placeholder="Maximum"
                  min={0}
                  value={payrange[1]}
                  onChange={(e) => rangeofpay(1, e)}
                ></input>
                <span className="mx-2">per</span>
                <select
                  required
                  className="rounded-lg p-2 md:p-3 text-sm text-gray-700 outline-0 mt-1"
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
          <label className="mt-4 flex flex-col text-gray-900 font-semibold">
            Is there additional pay for miles driven?
            <div className="mt-1 flex flex-row items-center">
              <input
                className="rounded-lg p-2 md:p-3 text-sm text-gray-700 outline-0"
                type="number"
                min={0}
                value={post.additionalpay}
                onChange={(e) => {
                  setPost({ ...post, additionalpay: e.target.value });
                }}
              ></input>
              <p className="text-gray-900 font-semibold ml-2">Cents Per Mile</p>
            </div>
          </label>

          {/* Benefits for the employee */}
          <label className="mt-4 flex flex-col text-gray-900 font-semibold">
            What benefits does your company offer? (Select all that apply)
            <div className="flex flex-col items-left text-gray-700">
              <label for="401k_check" className="">
                <input
                  type="checkbox"
                  id="401k_check"
                  className="mr-2"
                  value={"401K Matching"}
                  onChange={companybenefits}
                />
                401K Matching
              </label>
              <label for="medical_check" className="">
                <input
                  type="checkbox"
                  id="medical_check"
                  className="mr-2"
                  value={"Medical Insurance"}
                  onChange={companybenefits}
                />
                Medical Insurance
              </label>
              <label for="dental_check" className="">
                <input
                  type="checkbox"
                  id="dental_check"
                  className="mr-2"
                  value={"Dental Insurance"}
                  onChange={companybenefits}
                />
                Dental Insurance
              </label>
              <label for="vision_check" className="">
                <input
                  type="checkbox"
                  id="vision_check"
                  className="mr-2"
                  value={"Vision Insurance"}
                  onChange={companybenefits}
                />
                Vision Insurance
              </label>
              <label for="life_check" className="">
                <input
                  type="checkbox"
                  id="life_check"
                  className="mr-2"
                  value={"Life Insurance"}
                  onChange={companybenefits}
                />
                Life Insurance
              </label>
              <label for="none_check" className="">
                <input
                  type="checkbox"
                  id="none_check"
                  className="mr-2"
                  value={"None"}
                  onChange={companybenefits}
                />
                None
              </label>
            </div>
          </label>
        </div>

        {/* section 4 // // // // // // // // // // // // // // // // // // // // //*/}

        <div className="border-b-2 border-gray-300 pb-4">
          <p className="description">Description</p>
          {/* description */}
          <label className="mt-4 flex flex-col text-gray-900 font-semibold">
            Add a description to your job listing
            <textarea
              required
              value={post.description}
              onChange={(e) =>
                setPost({ ...post, description: e.target.value })
              }
              placeholder="Write your description here..."
              className="resize-y rounded-lg min-h-[150px] max-h-[350px] min-w-[250px] mt-1 p-2 md:p-3 text-sm text-gray-700 outline-0"
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
              <label for="yes_resume">
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
              <label for="no_resume">
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
              <label for="optional_resume">
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
          <label className="mt-4 flex flex-col text-gray-900 font-semibold">
            Will applicants be required take a drug test?
            <div className="font-semibold text-gray-700 mt-1 flex flex-col md:flex-row md:gap-5 md:items-center">
              <label for="yes_marijuana_drugtest">
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
              <label for="yes_drugtest">
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
              <label for="no_drugtest">
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
          <label className="mt-4 flex flex-col text-gray-900 font-semibold">
            Will applicants be required to do a background check?
            <div className="font-semibold text-gray-700">
              <label for="yes_background">
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
              <label for="no_background">
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
          <label className="mt-4 flex flex-col text-gray-900 font-semibold">
            Will applicants be required to have a DOT medical card?
            <div className="font-semibold text-gray-700 mt-1 flex flex-col md:flex-row md:gap-5">
              <label for="yes_dot_radio">
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
              <label for="yes_dotprior_radio">
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
              <label for="no_dot_radio">
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
          <label className="mt-4 flex flex-col items-start text-gray-900 font-semibold">
            What email would you like to recieve updates about the job
            <input
              required
              className="mt-1 form_input"
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
