import Link from "next/link";

const JobForm = ({ type, post, setPost, submitting, handlesubmit }) => {
  return (
    <section className="flex flex-col items-center">
      <p className="description">
        Follow the prompts to create and post a new job
      </p>
      <form onSubmit={handlesubmit} className="">
        {/* section 1 // // // // // // // // // // // // // // // // // // // // //*/}

        <div className="border-b-2 border-gray-500 pb-4">
          <p className="description">Basic information</p>
          {/* Title */}
          <label className="mt-4 flex flex-col items-start text-gray-900 font-semibold">
            Title
            <input
              type="text"
              value={post.title}
              onChange={(e) => {
                setPost({ ...post, title: e.target.value });
              }}
              placeholder="Delivery Job"
              required
              className="mt-1 form_input"
            ></input>
          </label>
          {/* Number of hires */}
          <label className="mt-4 flex flex-col text-gray-900 font-semibold">
            How many hires for this role?
            <div className="mt-1 flex flex-row items-center">
              <select className="form_input" id="hire_id">
                {/* <option selected>Choose an option</option> */}
                <option value={"One"}>One</option>
                <option value={"Multipe"}>Multiple</option>
                <option value={"Continously hiring"}>
                  Continuously hiring
                </option>
              </select>
              <span className="mx-2">or</span>
              <input
                id="hire_id"
                className="form_input"
                type="number"
                placeholder="Specific number"
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
              placeholder="Address"
              required
              className="form_input"
            ></input>
          </label>
          {/* Delivery Location */}
          <label className="mt-4 flex flex-col items-start text-gray-900 font-semibold">
            Delivery Location(s)
            <input
              className="form_input"
              type="text"
              placeholder="Address"
              value={post.deliverylocation}
              onChange={(e) => {
                setPost({ ...post, deliverylocation: e.target.value });
              }}
              required
            ></input>
          </label>
          {/* Work authorization */}
          <label className="mt-4 flex flex-col items-start text-gray-900 font-semibold">
            Does this person require authorization to work in the US?
            <div className="font-semibold text-gray-700">
              <input
                type="radio"
                name="authRadio"
                id="yes_auth"
                className="mr-1"
                required
                value={"yes"}
                onClick={(e) => {
                  setPost({ ...post, workauthorization: e.target.value });
                }}
              />
              Yes
              <input
                type="radio"
                name="authRadio"
                id="no_auth"
                required
                className="ml-10 mr-1"
                value={"no"}
                onClick={(e) => {
                  setPost({ ...post, workauthorization: e.target.value });
                }}
              />
              No
            </div>
          </label>
        </div>

        {/* section 2 // // // // // // // // // // // // // // // // // // // // //*/}

        <div className="border-b-2 border-gray-500 pb-4">
          <p className="description">Scheduling Information</p>
          {/* Relocate */}
          {/* <label className="mt-4 flex flex-col items-start text-gray-900 font-semibold">
            Does this job require the person to relocate?
            <div className="font-semibold text-gray-700">
              <input
                type="radio"
                name="relocateRadio"
                id="yes_relocate"
                className="mr-1"
                value={"yes"}
                onClick={(e) => {
                  setPost({ ...post, relocate: e.target.value });
                }}
              />
              Yes
              <input
                type="radio"
                name="relocateRadio"
                id="no_relocate"
                className="ml-10 mr-1"
                value={"no"}
                onClick={(e) => {
                  setPost({ ...post, relocate: e.target.value });
                }}
              />
              No
            </div>
          </label> */}
          {/* Job type */}
          <label className="mt-4 flex flex-col items-start text-gray-900 font-semibold">
            What type of job is this?
            <div className="font-semibold text-gray-700">
              <input
                type="radio"
                name="job_type_radio"
                id="full_time"
                className=" mr-1"
                value={"Full Time"}
                onClick={(e) => {
                  setPost({ ...post, jobtype: e.target.value });
                }}
              />
              Full time
              <input
                type="radio"
                name="job_type_radio"
                id="part_time"
                className="ml-10 mr-1"
                value={"Part Time"}
                onClick={(e) => {
                  setPost({ ...post, jobtype: e.target.value });
                }}
              />
              Part time
              <input
                type="radio"
                name="job_type_radio"
                id="seasonal"
                className="ml-10 mr-1"
                value={"Seasonal"}
                onClick={(e) => {
                  setPost({ ...post, jobtype: e.target.value });
                }}
              />
              Seasonal
            </div>
          </label>

          {/* Contract or W2 */}
          <label className="mt-4 flex flex-col items-start text-gray-900 font-semibold">
            Is this job contract or W2?
            <div className="font-semibold text-gray-700">
              <input
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
              <input
                type="radio"
                name="w2_contract_radio"
                id="contract"
                className="ml-10 mr-1"
                value={"Contract"}
                onClick={(e) => {
                  setPost({ ...post, jobformat: e.target.value });
                }}
              />
              Contract
            </div>
          </label>

          {/* Experience required */}
          <label className="mt-4 flex flex-col items-start text-gray-900 font-semibold">
            How much experience is required?
            <div className="mt-1 flex flex-row items-center">
              <select className="form_input">
                <option selected>Choose an option</option>
                <option>Less than 1 year</option>
                <option>1 - 2 years</option>
                <option>2 - 5 years</option>
                <option>More than 5 years</option>
              </select>
            </div>
          </label>

          {/* Type of shift */}
          <label className="mt-4 flex flex-col items-start text-gray-900 font-semibold">
            What type of shift is this?
            <div className="font-semibold text-gray-700">
              <input
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
              <input
                type="radio"
                name="type_of_shift_radio"
                id="over_the_road"
                className="ml-10 mr-1"
                value={"Over the road"}
                onClick={(e) => {
                  setPost({ ...post, shifttype: e.target.value });
                }}
              />
              Over the road
            </div>
          </label>

          {/* Shift time */}
          <div className="flex flex-row">
            <label className="mt-4 flex flex-col text-gray-900 font-semibold">
              What time is the shift
              <div className="mt-1 flex flex-row items-center">
                <select className="form_input">
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
                ></input>
              </div>
            </label>
          </div>

          {/* Days the job operates */}
          <label className="mt-4 flex flex-col text-gray-900 font-semibold">
            What days does this job operate? (Select all that apply)
            <div className="flex flex-col items-left text-gray-700">
              <label for="sunday">
                <input
                  type="checkbox"
                  id="sunday"
                  className="mr-2"
                  value={"Sunday"}
                />
                Sunday
              </label>
              <label for="monday">
                <input
                  type="checkbox"
                  id="monday"
                  className="mr-2"
                  value={"Monday"}
                />
                Monday
              </label>
              <label for="tuesday">
                <input
                  type="checkbox"
                  id="tuesday"
                  className="mr-2"
                  value={"Tuesday"}
                />
                Tuesday
              </label>
              <label for="wednesday">
                <input
                  type="checkbox"
                  id="wednesday"
                  className="mr-2"
                  value={"Wednesday"}
                />
                Wednesday
              </label>
              <label for="thursday">
                <input
                  type="checkbox"
                  id="thursday"
                  className="mr-2"
                  value={"Thursday"}
                />
                Thursday
              </label>
              <label for="friday">
                <input
                  type="checkbox"
                  id="friday"
                  className="mr-2"
                  value={"Friday"}
                />
                Friday
              </label>
              <label for="saturday">
                <input
                  type="checkbox"
                  id="saturday"
                  className="mr-2"
                  value={"Saturday"}
                />
                Saturday
              </label>
            </div>
          </label>
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
                ></input>
                <span className="mx-2">to</span>
                <input
                  className="form_input max-w-32"
                  type="number"
                  placeholder="Maximum"
                ></input>
                <span className="mx-2">per</span>
                <select className="form_input">
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
                value={post.additionalpay}
                onChange={(e) => {
                  setPost({ ...post, additionalpay: e.target.value });
                }}
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
                <input
                  type="checkbox"
                  id="401k_check"
                  className="mr-2"
                  value={"401K Matching"}
                  onClick={(e) => {
                    setPost({ ...post, benefits: e.target.value });
                  }}
                />
                401K Matching
              </label>
              <label for="medical_check" className="">
                <input
                  type="checkbox"
                  id="medical_check"
                  className="mr-2"
                  value={"Medical Insurance"}
                  onClick={(e) => {
                    setPost({ ...post, benefits: e.target.value });
                  }}
                />
                Medical Insurance
              </label>
              <label for="dental_check" className="">
                <input
                  type="checkbox"
                  id="dental_check"
                  className="mr-2"
                  value={"Dental Insurance"}
                  onClick={(e) => {
                    setPost({ ...post, benefits: e.target.value });
                  }}
                />
                Dental Insurance
              </label>
              <label for="vision_check" className="">
                <input
                  type="checkbox"
                  id="vision_check"
                  className="mr-2"
                  value={"Vision Insurance"}
                  onClick={(e) => {
                    setPost({ ...post, benefits: e.target.value });
                  }}
                />
                Vision Insurance
              </label>
              <label for="life_check" className="">
                <input
                  type="checkbox"
                  id="life_check"
                  className="mr-2"
                  value={"Life Insurance"}
                  onClick={(e) => {
                    setPost({ ...post, benefits: e.target.value });
                  }}
                />
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
              required
              value={post.description}
              onChange={(e) =>
                setPost({ ...post, description: e.target.value })
              }
              placeholder="Write your description here..."
              className="resize-y flex rounded-lg min-h-60 w-[600px] mt-1 p-3 text-sm text-gray-700 outline-0"
            ></textarea>
          </label>
        </div>

        {/* section 5 // // // // // // // // // // // // // // // // // // // // //*/}

        <div className="border-b-2 border-gray-500 pb-4">
          <p className="description">Additional Information</p>
          {/* resume preference */}
          <label className="mt-4 flex flex-col text-gray-900 font-semibold">
            Will applicants be required to include a resume?
            <div className="font-semibold text-gray-700">
              <input
                type="radio"
                name="resume_radio"
                id="yes_resume"
                className="  mr-1"
                value={"Yes"}
                onChange={(e) => setPost({ ...post, resume: e.target.value })}
              />
              Yes
              <input
                type="radio"
                name="resume_radio"
                id="no_resume"
                className="ml-10 mr-1"
                value={"No"}
                onChange={(e) => setPost({ ...post, resume: e.target.value })}
              />
              No
              <input
                type="radio"
                name="resume_radio"
                id="optional_resume"
                className="ml-10 mr-1"
                value={"Optional"}
                onChange={(e) => setPost({ ...post, resume: e.target.value })}
              />
              Optional
            </div>
          </label>
          {/* drug test */}
          <label className="mt-4 flex flex-col text-gray-900 font-semibold">
            Will applicants be required take a drug test?
            <div className="font-semibold text-gray-700">
              <input
                type="radio"
                name="drugtest_radio"
                id="yes_drugtest"
                className="mr-1"
                value={"yes, including marijuana"}
                onChange={(e) => setPost({ ...post, drugtest: e.target.value })}
              />
              Yes, including marijuana
              <input
                type="radio"
                name="drugtest_radio"
                id="no_drugtest"
                className="ml-10 mr-1"
                value={"yes, excluding marijuana"}
                onChange={(e) => setPost({ ...post, drugtest: e.target.value })}
              />
              Yes, excluding marijuana
              <input
                type="radio"
                name="drugtest_radio"
                id="no_drugtest"
                className="ml-10 mr-1"
                value={"no"}
                onChange={(e) => setPost({ ...post, drugtest: e.target.value })}
              />
              No
            </div>
          </label>

          {/* background check question */}
          <label className="mt-4 flex flex-col text-gray-900 font-semibold">
            Will applicants be required to do a background check?
            <div className="font-semibold text-gray-700">
              <input
                type="radio"
                name="background_radio"
                id="yes_background"
                className="  mr-1"
                value={"Yes"}
              />
              Yes
              <input
                type="radio"
                name="background_radio"
                id="no_background"
                className="ml-10 mr-1"
                value={"No"}
              />
              No
            </div>
          </label>

          {/* dot/med card question */}
          <label className="mt-4 flex flex-col text-gray-900 font-semibold">
            Will applicants be required to have a DOT medical card?
            <div className="font-semibold text-gray-700">
              <input
                type="radio"
                name="dot_radio"
                id="yes_dot_radio"
                className="  mr-1"
                value={"Yes"}
              />
              Yes
              <input
                type="radio"
                name="dot_radio"
                id="yes_dotprior_radio"
                className="ml-10 mr-1"
                value={"Yes"}
              />
              Yes, but prior to applying
              <input
                type="radio"
                name="dot_radio"
                id="no_dot_radio"
                className="ml-10 mr-1"
                value={"No"}
              />
              No
            </div>
          </label>

          {/* email updates */}
          <label className="mt-4 flex flex-col items-start text-gray-900 font-semibold">
            What email would you like to recieve updates about the job
            <input
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
          <label className="mt-4 flex flex-col text-gray-900 font-semibold">
            Add questions for the applicants to answer
            <div className="mt-1 flex flex-row items-center">
              <input
                className="form_input mr-4"
                type="text"
                placeholder="Question 1..."
              ></input>
              <select className="form_input max-w-36">
                <option selected>Responce type</option>
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
                <option selected>Responce type</option>
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
                <option selected>Responce type</option>
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
                <option selected>Responce type</option>
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
                <option selected>Responce type</option>
                <option>Text</option>
                <option>Number</option>
                <option>Yes / No</option>
              </select>
            </div>
          </label>
        </div>
        <div className="flex flex-row justify-between">
          <Link
            href={"/employerAccount/employerAccountHome"}
            className="outline_button mb-5 mt-5 ml-32"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="black_button mb-5 mt-5 mr-32"
          >
            {submitting ? `${type}ing...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default JobForm;
