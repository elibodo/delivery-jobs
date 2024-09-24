import User from "@models/user";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";

const JWT_SECRET =
  "4fe684832365892858e378e161fb7918c42103457f24e549c183a8ac5e8f1ff7";

export async function POST(req) {
  if (req.method !== "POST") {
    return NextResponse.json("Only POST requests allowed", { status: 405 });
  }
  const { newPassword, myToken } = await req.json();
  let userID;
  try {
    const decode = jwt.verify(myToken, JWT_SECRET);
    userID = decode.id;
  } catch (error) {
    return NextResponse.json(
      { message: "Invalid or expired token" },
      { status: 400 },
    );
  }
  try {
    await connectToDB();
    const user = await User.findById(userID);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    const hashedpassword = await bcrypt.hash(newPassword, 10);
    await User.updateOne(
      { _id: userID },
      { $set: { password: hashedpassword } },
    );
    return NextResponse.json({ message: "Password has been reset" });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Password reset unsucessfull" },
      { status: 400 },
    );
  }
}
