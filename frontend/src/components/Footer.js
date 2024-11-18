import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer-text">&copy; {new Date().getFullYear()} BlogBuddy</p>
    </footer>
  );
};

export default Footer;