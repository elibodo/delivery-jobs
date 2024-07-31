import { connectToDB } from "@utils/database";
import JobSeeker from "@models/jobSeeker";
import User from "@models/user";

export const PATCH = async (req, { params }) => {
  try {
    await connectToDB();
    const { workHistory } = await req.json();
    const account = await JobSeeker.findOne({ email: params.id });
    if (!account) {
      return new Response("Failed to fetch account", { status: 500 });
    }
    //Updating information
    account.experienceArray = workHistory;
    await account.save();

    return new Response("Updated information", { status: 200 });
  } catch (error) {
    return new Response("Failed to update information", { status: 500 });
  }
};
