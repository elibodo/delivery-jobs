import Job from "@models/job";
import User from "@models/user";
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();
    await Job.findByIdAndDelete(params.id);
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
