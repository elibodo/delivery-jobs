import { connectToDB } from "@utils/database";
import Job from "@models/job";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req, res) {
  await connectToDB();
  if (req.method !== "POST") {
    return NextResponse.json("Only POST requests allowed", { status: 405 });
  }
  const { appEmail, postId } = await req.json();

  const job = await Job.findById(postId);
  if (!job) {
    return NextResponse.json("Job not found.", { status: 404 });
  }

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
    to: job.emailupdates,
    subject: `You have a new candidate for ${job.title}`,
    html: `<html>
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
        </style>
    </head>
    <body>
        <div class="email-container">
            <div class="header">
                <h1 class="accent">Delivery Jobs</h1>
            </div>
            <div class="content">
            <h3>You have a new candidate for ${job.title}</h3>
                <p>New Candidate: ${appEmail}</p>
                <p>Total Candidates: ${job.applicants.length}</p>
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
          { status: 500 }
        );
      } else {
        resolve(info);
        return NextResponse.json({ message: "Sent email update to company" });
      }
    });
  });

  return NextResponse.json({ message: "Sent email update to company" });
}
