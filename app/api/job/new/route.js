import Job from "@models/job";
import { connectToDB } from "@utils/database";
import Employer from "@models/employer";

export const dynamic = "force-dynamic";

export const POST = async (request) => {
  const {
    userId,
    title,
    numOfHires,
    description,
    dispatchlocation,
    deliverylocation,
    workauthorization,
    jobtype,
    jobformat,
    shifttype,
    experiencerequired,
    shifttime,
    workdays,
    payrange,
    additionalpay,
    benefits,
    resume,
    backgroundcheck,
    drugtest,
    dotcard,
    emailupdates,
    applicants,
    companyName,
  } = await request.json();

  try {
    await connectToDB();
    const newJob = new Job({
      creator: userId,
      title,
      numOfHires,
      description,
      dispatchlocation,
      deliverylocation,
      workauthorization,
      jobtype,
      jobformat,
      shifttype,
      experiencerequired,
      shifttime,
      workdays,
      payrange,
      additionalpay,
      benefits,
      resume,
      backgroundcheck,
      drugtest,
      dotcard,
      emailupdates,
      applicants,
      companyName,
    });

    await newJob.save();
    return new Response(JSON.stringify(newJob), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new job", { status: 500 });
  }
};

export const PATCH = async (request) => {
  try {
    await connectToDB();
    const { employerEmail } = await request.json();
    const account = await Employer.findOne({ email: employerEmail });

    if (!account) {
      return new Response("Failed to fetch account", { status: 500 });
    }
    account.MyJobs = account.MyJobs + 1;
    account.save();
    return new Response("Successfully Deleted Account", { status: 200 });
  } catch (error) {
    return new Response("Failed to update information", { status: 500 });
  }
};
