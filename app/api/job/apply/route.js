import { connectToDB } from "@utils/database";
import Job from "@models/job";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  await connectToDB();

  if (req.method === "POST") {
    const { postId, applicant } = await req.json();
    try {
      const job = await Job.findById(postId);
      if (!job) {
        return res.status(404).json({ message: "Job not found." });
      }
      job.applicants.push({ applicant });
      await job.save();
      return NextResponse.json({ message: "failed" });
    } catch (error) {
      return NextResponse.json({ message: "failed" }, { status: 500 });
    }
  } else {
    return NextResponse.json({ message: "failsed" }, { status: 500 });
  }
}
