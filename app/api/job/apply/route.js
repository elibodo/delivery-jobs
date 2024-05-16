import { connectToDB } from "@utils/database";
import Job from "@models/job";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  await connectToDB();
  if (req.method === "POST") {
    const { postId, applicants } = await req.json();
    try {
      const job = await Job.findById(postId);
      if (!job) {
        return res.status(404).json({ message: "Job not found." });
      }
      await job.applicants.push(applicants);
      await job.save();
      return NextResponse.json({ message: "added user to applicants" });
    } catch (error) {
      return NextResponse.json({ message: "failed" }, { status: 500 });
    }
  } else {
    return NextResponse.json({ message: "failed" }, { status: 500 });
  }
}
