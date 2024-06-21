import React from "react";

const Footer = () => {
  return (
    <footer className="footer_text">
      &copy; {new Date().getFullYear().toString()} Delivery Jobs
    </footer>
  );
};

export default Footer;
