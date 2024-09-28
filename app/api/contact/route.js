import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const { firstName, lastName, email, message } = await req.json();

  // Create a Nodemailer transporter
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
        resolve(success);
      }
    });
  });

  // Create email options
  const mailOptions = {
    from: `${firstName} ${lastName} <${email}>`,
    to: "deliveryjobsllc@gmail.com",
    subject: `Contact Form: ${firstName} ${lastName}`,
    text: `You received a message from ${firstName} ${lastName} (${email}):\n\n${message}`,
  };

  // Send the email
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
        return NextResponse.json({ message: "Sent email update to company" });
      }
    });
  });
  return NextResponse.json({ message: "Sent email update to company" });
}
