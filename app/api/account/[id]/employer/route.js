import { connectToDB } from "@utils/database";
import Employer from "@models/employer";
import User from "@models/user";
import Job from "@models/job";

export const dynamic = "force-dynamic";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const account = await Employer.find({ email: params.id });
    return new Response(JSON.stringify(account), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch account", { status: 500 });
  }
};

export const PATCH = async (req, { params }) => {
  try {
    await connectToDB();
    const { companyName, companyWebsite, streetAddress, City, State, ZipCode } =
      await req.json();
    const account = await Employer.findOne({ email: params.id });
    if (!account) {
      return new Response("Failed to fetch account", { status: 500 });
    }
    //Updating information
    account.companyName = companyName;
    account.companyWebsite = companyWebsite;
    account.streetAddress = streetAddress;
    account.City = City;
    account.State = State;
    account.ZipCode = ZipCode;
    await account.save();

    return new Response("Updated information", { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch account", { status: 500 });
  }
};

export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();
    const { userID } = await req.json();
    await User.findOneAndDelete({ email: params.id });
    await Employer.findOneAndDelete({ email: params.id });
    await Job.deleteMany({ creator: userID });

    return new Response("Successfully Deleted Account", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to Delete Account", { status: 500 });
  }
};
