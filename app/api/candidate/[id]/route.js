import Job from "@models/job";
import User from "@models/user";
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";

export const POST = async (req, { params }) => {
  try {
    await connectToDB();
    const { candidate } = await req.json();
    const deletedCandidate = candidate;
    const job = await Job.findById(params.id);
    const candidates = job.applicants;

    const filtered = candidates.filter(function (e) {
      return e !== deletedCandidate;
    });

    job.applicants = filtered;
    job.deniedApplicants.push(deletedCandidate);
    await job.save();

    return NextResponse.json("Candidate deleted", { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Failed to delete candidate", { status: 500 });
  }
};
