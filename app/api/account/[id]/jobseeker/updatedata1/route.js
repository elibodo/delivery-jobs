import { connectToDB } from "@utils/database";
import JobSeeker from "@models/jobSeeker";
import User from "@models/user";

export const PATCH = async (req, { params }) => {
  try {
    await connectToDB();
    const {
      licenseClass,
      licenseState,
      licenseExpire,
      carAccident,
      DUI,
      ageRange,
      DOT,
      DOTDate,
      CDL,
      twikCard,
      CDLOption1,
      CDLOption2,
      endorsements,
    } = await req.json();
    const account = await JobSeeker.findOne({ email: params.id });
    if (!account) {
      return new Response("Failed to fetch account", { status: 500 });
    }
    //Updating information
    account.licenseClass = licenseClass;
    account.licenseState = licenseState;
    account.licenseExpire = licenseExpire;
    account.carAccident = carAccident;
    account.DUI = DUI;
    account.ageRange = ageRange;
    account.DOT = DOT;
    account.DOTExpire = DOTDate;
    account.CDL = CDL;
    account.twikCard = twikCard;
    account.CDLOption1 = CDLOption1;
    account.CDLOption2 = CDLOption2;
    account.endorsements = endorsements;
    await account.save();

    return new Response("Updated information", { status: 200 });
  } catch (error) {
    return new Response("Failed to update information", { status: 500 });
  }
};
