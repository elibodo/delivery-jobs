import Job from "@models/job";
import { connectToDB } from "@utils/database";
import User from "@models/user";

export const dynamic = "force-dynamic";

export const GET = async () => {
  await connectToDB();

  try {
    const jobs = await Job.find({ active: true }).populate("creator");
    return new Response(JSON.stringify(jobs), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch all jobs", { status: 500 });
  }
};
