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
    let candidates = job.applicants;

    let index = candidates.findIndex((obj) => obj.email === deletedCandidate);

    if (index !== -1) {
      candidates.splice(index, 1);
    }

    job.applicants = candidates;
    job.deniedApplicants.push(deletedCandidate);
    await job.save();

    return NextResponse.json("Candidate deleted", { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Failed to delete candidate", { status: 500 });
  }
};
