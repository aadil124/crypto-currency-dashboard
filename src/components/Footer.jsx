import React from "react";

const Footer = ({ lastUpdated }) => {
  return (
    <footer className="p-4 bg-gray-800 text-white text-center">
      <p>Last Updated: {new Date(lastUpdated).toLocaleString()}</p>
    </footer>
  );
};

export default Footer;
