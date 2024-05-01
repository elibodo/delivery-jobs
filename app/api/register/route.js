import { connectToDB } from "@utils/database";
import Employer from "@models/employers";
import { NextResponse } from "next/server";
import * as bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const { name, company, email, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    await connectToDB;
    await Employer.create({ name, company, email, password: hashedPassword });

    return NextResponse.json({ message: "User registered." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
}
