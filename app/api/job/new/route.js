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

  const apiKey = process.env.GOOGLE_GEOCODE_KEY;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    dispatchlocation
  )}&key=${apiKey}`;

  let latitude;
  let longitude;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new error("Failed to fetch data");
    }
    const data = await response.json();
    latitude = data.results[0].geometry.location.lat;
    longitude = data.results[0].geometry.location.lng;
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }

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
      latitude,
      longitude,
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
