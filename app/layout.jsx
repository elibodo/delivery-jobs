import "@styles/globals.css";
import Header from "@components/Header";
import Footer from "@components/Footer";
import Provider from "@components/Provider";
import React from "react";
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  title: "Delivery Jobs",
  description: "A way to find delivery and driving related jobs.",
  keywords: [
    "Delivery Jobs",
    "Driving Jobs",
    "Fedex",
    "UPS",
    "USPS",
    "Amazon",
    "Delivery",
    "Driving jobs near me",
    "Delivery driver",
    "CDL jobs",
    "Trucking jobs",
    "Non-CDL jobs",
  ],
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <Provider>
        <body className="to-customBlue/5 bg-gradient-to-r from-orange-600/5">
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
