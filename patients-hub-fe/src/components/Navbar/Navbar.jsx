import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  return (
    <Link className="home" to="/">
      <div className="border">
        <div className="logo">
          <p>UI</p>
        </div>
      </div>
    </Link>
  );
};

export default Navbar;
