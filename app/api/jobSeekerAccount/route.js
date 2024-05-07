import { connectToDB } from "@utils/database";
import User from "@models/user";
import JobSeeker from "@models/jobSeeker";

export const POST = async (req) => {
  const {
    email,
    licenseClass,
    licenseState,
    licenseExpire,
    DOT,
    DOTExpire,
    endorsements,
    CDL,
    twikCard,
    CDLOptions,
    workExperience,
    experienceArray,
    educationLevel,
    educationDate,
    certificates,
    carAccident,
    DUI,
    ageRange,
    city,
    state,
    zipCode,
  } = await req.json();
  try {
    connectToDB();
    const newJobSeekerProfile = new JobSeeker({
      email,
      licenseClass,
      licenseState,
      licenseExpire,
      DOT,
      DOTExpire,
      endorsements,
      CDL,
      twikCard,
      CDLOptions,
      workExperience,
      experienceArray,
      educationLevel,
      educationDate,
      certificates,
      carAccident,
      DUI,
      ageRange,
      city,
      state,
      zipCode,
    });
    await newJobSeekerProfile.save();
    return new Response(JSON.stringify(newJobSeekerProfile), { status: 201 });
  } catch (error) {
    return new Response("Failed to create profile", { status: 500 });
  }
};
