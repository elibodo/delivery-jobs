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
    secure: true,
  });

  await new Promise((resolve, reject) => {
    transporter.verify(function (error, success) {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        console.log("server ready");
        resolve(success);
      }
    });
  });

  let mailOptions = {
    from: "Delivery Jobs <deliveryjobsllc@gmail.com>",
    to: email,
    subject: "Password Reset",
    html: ` <html>
    <head>
        <style>
            .email-container {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                text-align: center;
                padding: 20px;
            }
            .header {
                background-color: #f8f8f8;
                padding: 10px;
                text-align: center;
                border-bottom: 2px solid #EA580C;
                font-weight: bold;
            }
            .content {
                padding: 20px;
                text-align: center;
            }
            .footer {
                background-color: #f8f8f8;
                padding: 10px;
                text-align: center;
                font-size: 12px;
                border-top: 2px solid #EA580C;
            }
            .accent {
                color: #EA580C;
            }
            .button {
                display: inline-block;
                padding: 10px 20px;
                font-size: 16px;
                color: #ffffff;
                background-color: #EA580C;
                text-decoration: none;
                border-radius: 25px;
                margin-top: 20px;
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <div class="header">
                <h1 class="accent">Delivery Jobs</h1>
            </div>
            <div class="content">
                <p>Hi there,</p>
                <p>You requested to reset your password. Click the button below to reset it:</p>
                <a href="${process.env.BASE_URL}/passwordReset/${token}" class="button">Reset Password</a>
                <p>If you did not request a password reset, please ignore this email.</p>
            </div>
            <div class="footer">
                <p>&copy; 2024 Delivery Jobs</p>
            </div>
        </div>
    </body>
    </html>`,
  };
  await new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error);
        return NextResponse.json(
          { message: "Failed to send email" },
          { status: 500 },
        );
      } else {
        resolve(info);
        return NextResponse.json({ message: "Password reset email sent" });
      }
    });
  });
  return NextResponse.json({ message: "Password reset email sent" });
}
