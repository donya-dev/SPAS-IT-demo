import React from "react";
import "./navbar.css";

const Navbar = () => {
  return (
    <div className="navbar-style">
      <ul>
        <li className="logo-style">SPAS-IT</li>
        <li className="navbar-item">Home</li>
        <li className="navbar-item">About</li>
        <li className="navbar-item">Browse</li>
        <li className="navbar-item">Search</li>
      </ul>
    </div>
  );
};
export default Navbar;
