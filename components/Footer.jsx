import React from "react";

const Footer = () => {
  return (
    <footer className="footer_text flex flex-col gap-2">
      &copy; {new Date().getFullYear().toString()} Delivery Jobs
      <a href="/termsAndConditions">Terms and Conditions</a>
    </footer>
  );
};

export default Footer;
