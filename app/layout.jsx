import "@styles/globals.css";
import Header from "@components/Header";
import Footer from "@components/Footer";
import Provider from "@components/Provider";
import React from "react";
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  title: "Delivery Jobs | Find Local & OTR Delivery Driver Jobs",
  description:
    "Find delivery and driving jobs, including CDL and non-CDL positions with top companies. Post jobs and recruit delivery drivers easily.",
  keywords: [
    "Delivery jobs",
    "Driving jobs",
    "FedEx driver jobs",
    "UPS delivery jobs",
    "Amazon delivery jobs",
    "USPS postal jobs",
    "Local delivery jobs",
    "CDL jobs",
    "Non-CDL jobs",
    "OTR truck driver jobs",
    "Part-time delivery jobs",
    "Full-time driving jobs",
    "Delivery driver jobs near me",
    "Find delivery jobs",
    "Apply for delivery jobs",
    "Trucking jobs",
    "Delivery job listings",
    "Delivery job board",
    "Post delivery jobs",
    "Hire delivery drivers",
    "Recruit delivery drivers",
    "Affordable job postings for delivery jobs",
    "Job postings for drivers",
    "Hire truck drivers",
    "Employer job listings",
    "Post trucking jobs",
    "Post CDL jobs",
    "Hire CDL drivers",
    "Hire non-CDL drivers",
    "Driver recruitment",
    "Logistics jobs",
    "Logistics hiring",
    "Delivery driver recruitment",
    "Post logistics jobs",
    "Delivery driver job board",
    "Florida delivery jobs",
    "Nationwide delivery jobs",
    "TWIC card jobs",
    "DOT medical card jobs",
    "Post driving jobs",
  ],
  author: "Delivery Jobs LLC",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords.join(", ")} />
        <meta name="author" content={metadata.author} />
      </head>
      <Provider>
        <body className="bg-gradient-to-r from-orange-600/5 to-customBlue/5">
          <main className="app">
            <Header />
            {children}
            <Analytics />
            <Footer />
          </main>
        </body>
      </Provider>
    </html>
  );
};

export default RootLayout;
