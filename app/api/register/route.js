import { connectToDB } from "@utils/database";
import User from "@models/user";
import { NextResponse } from "next/server";
import * as bcrypt from "bcrypt";
import JobSeeker from "@models/jobSeeker";
import Employer from "@models/employer";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const {
      accountType,
      name,
      phoneNumber,
      email,
      password,

      licenseClass,
      licenseState,
      licenseExpire,
      DOT,
      DOTExpire,
      endorsements,
      CDL,
      twikCard,
      CDLOption1,
      CDLOption2,
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

      companyName,
      companyWebsite,
      streetAddress,
      City,
      State,
      ZipCode,
      Subscription,
      CustomerId,
      Access,
      JobLimit,
      MyJobs,
    } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    await connectToDB;
    const userExists = await User.findOne({ email });
    if (!userExists) {
      await User.create({
        accountType,
        name,
        phoneNumber,
        email,
        password: hashedPassword,
      });
    } else {
      return NextResponse.json(
        { message: "User already exists." },
        { status: 500 },
      );
    }
    const newAccountType = accountType;
    if (newAccountType === "Job Seeker") {
      await JobSeeker.create({
        email,
        licenseClass,
        licenseState,
        licenseExpire,
        DOT,
        DOTExpire,
        endorsements,
        CDL,
        twikCard,
        CDLOption1,
        CDLOption2,
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
    } else {
      await Employer.create({
        email,
        companyName,
        companyWebsite,
        streetAddress,
        City,
        State,
        ZipCode,
        Subscription,
        CustomerId,
        Access,
        JobLimit,
        MyJobs,
      });
    }
    return NextResponse.json({ message: "User registered." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 },
    );
  }
}
