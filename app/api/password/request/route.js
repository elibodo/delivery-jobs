import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import User from "@models/user";
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";

const JWT_SECRET =
  "4fe684832365892858e378e161fb7918c42103457f24e549c183a8ac5e8f1ff7";

export async function POST(req, res) {
  await connectToDB();
  if (req.method !== "POST") {
    return NextResponse.json("Only POST requests allowed", { status: 405 });
  }
  const { email } = await req.json();
  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }
  const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: "Gmail",
    port: 465,
    auth: {
      user: "deliveryjobsllc@gmail.com",
      pass: "ncqo tkgu ofsw tnip",
    },
  });

  let mailOptions = {
    from: "deliveryjobsllc@gmail.com",
    to: email,
    subject: "Password Reset",
    text: `You requested a password reset. Click the link to reset your password: ${process.env.BASE_URL}/passwordReset/${token}`,
  };
  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return NextResponse.json(
        { message: "Failed to send email" },
        { status: 500 }
      );
    } else {
      return NextResponse.json({ message: "Password reset email sent" });
    }
  });
  return NextResponse.json({ message: "Password reset email sent" });
}
