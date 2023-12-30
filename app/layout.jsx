//import React, { Children } from "react";
import "@styles/globals.css";

export const metadata = {
  title: "Delivery Jobs",
  description: "A way to find delivery related jobs",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <div className="main">
          <div className="gradient" />
        </div>
        <main className="app">{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
