import { connectToDB } from "@utils/database";
import JobSeeker from "@models/jobSeeker";
import User from "@models/user";

export const dynamic = "force-dynamic";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const account = await JobSeeker.find({ email: params.id }).populate(
      "email"
    );
    return new Response(JSON.stringify(account), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch account", { status: 500 });
  }
};

export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();
    const { userID } = await req.json();
    await User.findOneAndDelete({ email: params.id });
    await JobSeeker.findOneAndDelete({ email: params.id });

    return new Response("Successfully Deleted Account", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to Delete Account", { status: 500 });
  }
};
