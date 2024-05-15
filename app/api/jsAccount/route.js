import JobSeeker from "@models/jobSeeker";
import { connectToDB } from "@utils/database";

export const GET = async (request) => {
  try {
    await connectToDB();
    const account = await JobSeeker.find({});
    return new Response(JSON.stringify(account), { status: 200 });
  } catch (error) {
    return new Response("Failed to get user info", { status: 500 });
  }
};
