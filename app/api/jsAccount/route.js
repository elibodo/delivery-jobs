import JobSeeker from "@models/jobSeeker";
import User from "@models/user";
import { connectToDB } from "@utils/database";
import { useSession } from "next-auth/react";

export const GET = async (request) => {
  const { data: session } = useSession();
  try {
    await connectToDB();
    const account = await JobSeeker.find();
    return new Response(JSON.stringify(account), { status: 200 });
  } catch (error) {
    return new Response("Failed to get user info", { status: 500 });
  }
};
