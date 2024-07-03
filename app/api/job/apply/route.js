import { connectToDB } from "@utils/database";
import Job from "@models/job";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req, res) {
  await connectToDB();
  if (req.method === "POST") {
    const { postId, applicantEmail } = await req.json();
    try {
      const job = await Job.findById(postId);
      if (!job) {
        return res.status(404).json({ message: "Job not found." });
      }

      const newApplicant = applicantEmail;
      await job.applicants.push(newApplicant);
      await job.save();
      return NextResponse.json({ message: "Added user to applicants" });
    } catch (error) {
      return NextResponse.json({ message: "failed" }, { status: 500 });
    }
  } else {
    return NextResponse.json({ message: "failed" }, { status: 500 });
  }
}
