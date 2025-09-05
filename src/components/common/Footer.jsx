import React from "react";

const Footer = () => {
  return (
    <footer className="flex-1 p-4 text-center text-sm text-gray-500 bg-primary-700">
      <p>© {new Date().getFullYear()} Movie Swiper. All rights reserved. For Demonstration Purposes Only</p>
    </footer>
  );
};

export default Footer;
