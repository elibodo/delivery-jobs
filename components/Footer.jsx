import React from "react";

const Footer = () => {
  return (
    <footer className="mt-auto text-left p-5 w-full flex flex-col gap-2">
      &copy; {new Date().getFullYear().toString()} Delivery Jobs
      <a href="/termsAndConditions" className="hover:underline">
        Terms and Conditions
      </a>
      <a href="/contactPage" className="hover:underline">
        Contact Us
      </a>
    </footer>
  );
};

export default Footer;
