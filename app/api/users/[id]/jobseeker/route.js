import { connectToDB } from "@utils/database";
import JobSeeker from "@models/jobSeeker";
import User from "@models/user";

export const PATCH = async (req, { params }) => {
  try {
    await connectToDB();
    const { name, email, phoneNumber } = await req.json();
    const user = await User.findOne({ email: params.id });
    const account = await JobSeeker.findOne({ email: params.id });
    if (!user && !account) {
      return new Response("Failed to fetch account", { status: 500 });
    }
    //need to check if new email is in use

    // Update information
    user.name = name;
    user.email = email;
    user.phoneNumber = phoneNumber;
    await user.save();
    account.email = email;
    await account.save();

    return new Response("Updated information", { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch account", { status: 500 });
  }
};
