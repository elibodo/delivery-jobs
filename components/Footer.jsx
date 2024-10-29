import React from "react";

const Footer = () => {
  return (
    <footer className="mt-auto flex w-full flex-col gap-2 p-5 text-left">
      &copy; {new Date().getFullYear().toString()} Delivery Jobs
      <a href="/aboutPage" className="hover:underline">
        About
      </a>
      <a href="/contactPage" className="hover:underline">
        Contact Us
      </a>
      <a href="/termsAndConditions" className="hover:underline">
        Terms and Conditions
      </a>
    </footer>
  );
};

export default Footer;
