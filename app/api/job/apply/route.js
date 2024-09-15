import { connectToDB } from "@utils/database";
import Job from "@models/job";
import { NextResponse } from "next/server";
import JobSeeker from "@models/jobSeeker";

export const dynamic = "force-dynamic";

export async function POST(req, res) {
  await connectToDB();
  if (req.method === "POST") {
    const { postId, applicantEmail, applicantName, applicantPhoneNumber } =
      await req.json();
    try {
      const job = await Job.findById(postId);
      if (!job) {
        return res.status(404).json({ message: "Job not found." });
      }
      const applicant = await JobSeeker.findOne({ email: applicantEmail });
      if (!applicant) {
        return res.status(404).json({ message: "Applicant not found." });
      }

      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString();

      const newApplicant = {
        email: applicantEmail,
        name: applicantName,
        phoneNumber: applicantPhoneNumber,
        dateOfApply: formattedDate,
        contacted: "",
        status: "",
      };
      const newJob = postId;
      await job.applicants.push(newApplicant);
      await job.save();

      await applicant.applications.push(newJob);
      await applicant.save();

      return NextResponse.json({ message: "Added user to applicants" });
    } catch (error) {
      return NextResponse.json({ message: "failed" }, { status: 500 });
    }
  } else {
    return NextResponse.json({ message: "failed" }, { status: 500 });
  }
}
