import Job from "@models/job";
import { connectToDB } from "@utils/database";
import User from "@models/user";

export const dynamic = "force-dynamic";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const jobs = await Job.find({
      creator: params.id,
    }).populate("creator");

    return new Response(JSON.stringify(jobs), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all jobs", { status: 500 });
  }
};
