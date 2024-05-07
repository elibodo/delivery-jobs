import { connectToDB } from "@utils/database";
import User from "@models/user";
import { NextResponse } from "next/server";
import * as bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const { accountType, name, phoneNumber, email, password } =
      await req.json();
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
