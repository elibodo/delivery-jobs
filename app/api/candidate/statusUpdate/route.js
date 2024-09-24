import { connectToDB } from "@utils/database";
import Job from "@models/job";

export const dynamic = "force-dynamic";

export const PATCH = async (req) => {
  try {
    await connectToDB();
    const { option, applicantEmail, jobId } = await req.json();
    await Job.findOneAndUpdate(
      { _id: jobId, "applicants.email": applicantEmail },
      { $set: { "applicants.$.status": option } },
      { new: true }, // This ensures the updated document is returned
    );
    return new Response("Updated information", { status: 200 });
  } catch (error) {
    return new Response("Failed to update information", { status: 500 });
  }
};
