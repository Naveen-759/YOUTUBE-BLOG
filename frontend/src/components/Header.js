import React from "react";
import SearchBar from "./Search";
import { Link } from "react-router-dom";
import "../components/Header.css";

const Header = () => {
  return (
    <div>
      <nav>
        <div className="appname">
          <h2>BlogBuddy</h2>
        </div>
        <div className="search">
          <SearchBar />
        </div>
        <Link to="/about">
          <div className="about">About</div>
        </Link>
      </nav>
    </div>
  );
};

export default Header;
