import { connectToDB } from "@utils/database";
import JobSeeker from "@models/jobSeeker";

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
