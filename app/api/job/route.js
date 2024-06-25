import Job from "@models/job";
import { connectToDB } from "@utils/database";

export const dynamic = "force-dynamic";

export const GET = async (request) => {
  await connectToDB();

  try {
    const jobs = await Job.find({}).populate("creator");
    return new Response(JSON.stringify(jobs), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all jobs", { status: 500 });
  }
};
