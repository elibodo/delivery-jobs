import Job from "@models/job";
import User from "@models/user";
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";
import Employer from "@models/employer";

export const dynamic = "force-dynamic";

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();
    await Job.findByIdAndDelete(params.id);

    const { employerEmail } = await request.json();
    const account = await Employer.findOne({ email: employerEmail });
    if (!account) {
      return new Response("Failed to fetch account", { status: 500 });
    }
    account.MyJobs = account.MyJobs - 1;
    account.save();

    return NextResponse.json("Job deleted successfully", { status: 200 });
  } catch (error) {
    return NextResponse.json("Failed to delete job", { status: 500 });
  }
};

export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const job = await Job.findById({ _id: params.id });
    if (!job) {
      return NextResponse.json("Job Has Been Removed", { status: 200 });
    }
    return new Response(JSON.stringify(job), { status: 200 });
  } catch (error) {
    return NextResponse.json("Failed to retrieve job", { status: 500 });
  }
};

export const PATCH = async (request, { params }) => {
  try {
    await connectToDB();
    const { status } = await request.json();
    const job = await Job.findById({ _id: params.id });
    const user = await User.findById({ _id: job.creator });
    const account = await Employer.findOne({ email: user.email });

    if (status === "true") {
      let updatedJobs = account.MyJobs + 1;
      if (account.MyJobs < account.JobLimit) {
        await Job.findOneAndUpdate(
          { _id: params.id },
          { $set: { active: true } },
        );
        await Employer.findOneAndUpdate(
          { email: user.email },
          { $set: { MyJobs: updatedJobs } },
        );
        return new Response("Updated Successfully", { status: 200 });
      } else {
        return new Response(
          "Purchase or upgrade subscription to set more jobs to active",
          { status: 400 },
        );
      }
    } else if (status === "false") {
      let updatedJobs = account.MyJobs - 1;
      await Job.findOneAndUpdate(
        { _id: params.id },
        { $set: { active: false } },
      );
      await Employer.findOneAndUpdate(
        { email: user.email },
        { $set: { MyJobs: updatedJobs } },
      );
      return new Response("Updated Successfully", { status: 200 });
    } else {
      return new Response("Failed to update Job active setting", {
        status: 500,
      });
    }
  } catch (error) {
    return new Response("Failed to update Job active setting", { status: 500 });
  }
};
