import { connectToDB } from "@utils/database";
import User from "@models/user";
import { NextResponse } from "next/server";
import * as bcrypt from "bcrypt";
import JobSeeker from "@models/jobSeeker";
import Employer from "@models/employer";

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

      companyName,
      streetAddress,
      City,
      State,
      ZipCode,
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
      const newAccountType = accountType;
      if (newAccountType === "Job Seeker") {
        console.log("jsaccount");
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
      } else {
        console.log("eaccount");
        await Employer.create({
          email,
          companyName,
          streetAddress,
          City,
          State,
          ZipCode,
        });
      }
      return NextResponse.json(
        { message: "User registered." },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { message: "User already exists." },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
}
