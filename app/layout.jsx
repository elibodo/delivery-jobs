import "@styles/globals.css";
import Header from "@components/Header";
import Footer from "@components/Footer";
import Provider from "@components/Provider";
import React from "react";

export const metadata = {
  title: "Delivery Jobs",
  description: "A way to find driving jobs",
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
        <body>
          <main className="app">
            <Header />
            {children}
            <Footer />
          </main>
        </body>
      </Provider>
    </html>
  );
};

export default RootLayout;
