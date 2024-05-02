import Job from "@models/job";
import { connectToDB } from "@utils/database";

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
    });

    await newJob.save();
    return new Response(JSON.stringify(newJob), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new job", { status: 500 });
  }
};
