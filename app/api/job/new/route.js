import Job from "@models/job";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
  const {
    userId,
    title,
    description,
    dispatchlocation,
    deliverylocation,
    workauthorization,
    relocate,
    jobtype,
    experiencerequired,
    additionalpay,
    benefits,
    resume,
    drugtest,
    emailupdates,
  } = await request.json();

  try {
    await connectToDB();
    const newJob = new Job({
      creator: userId,
      title,
      description,
      dispatchlocation,
      deliverylocation,
      workauthorization,
      relocate,
      jobtype,
      experiencerequired,
      additionalpay,
      benefits,
      resume,
      drugtest,
      emailupdates,
    });

    await newJob.save();
    return new Response(JSON.stringify(newJob), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new job", { status: 500 });
  }
};
