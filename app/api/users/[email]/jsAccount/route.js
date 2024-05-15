import JobSeeker from "@models/jobSeeker";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const accountInformation = await JobSeeker.find({
      email: params.email,
    }).populate("email");
    return new Response(JSON.stringify(accountInformation), { status: 200 });
  } catch (error) {
    return new Response("Failed to get user account information", {
      status: 500,
    });
  }
};
