import Job from "@models/job";
import User from "@models/user";
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();
    await Job.findByIdAndDelete(params.id);
    return NextResponse.json("Job deleted successfully", { status: 200 });
  } catch (error) {
    return NextResponse.json("Failed to delete job", { status: 500 });
  }
};
