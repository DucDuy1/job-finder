import React from "react";
import "./Search.css";
import { AiOutlineSearch, AiOutlineCloseCircle } from "react-icons/ai";
import { BsHouseDoor } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";

const Search = () => {
  return (
    <div className="search">
      <form action="">
        <div className="search-firstDiv">
          <div className="search-icons">
            <AiOutlineSearch className="search-icon" />
            <input type="text" className="search-input" placeholder="Search Job here ..." />
            <AiOutlineCloseCircle className="search-icon1" />
          </div>
          <div className="search-icons">
            <BsHouseDoor className="search-icon" />
            <input type="text" className="search-input" placeholder="Search Job by Company ..." />
            <AiOutlineCloseCircle className="search-icon1" />
          </div>
          <div className="search-icons">
            <CiLocationOn className="search-icon" />
            <input type="text" className="search-input" placeholder="Search Job by Location ..." />
            <AiOutlineCloseCircle className="search-icon1" />
          </div>
          <button className="search-btn">Search</button>
        </div>
      </form>

      <div className="search-search2">
        <div className="search-singleSearch">
          <label htmlFor="relevance" className="search-label">Sort by :</label>
          <select name="" id="relevance" className="search-select">
            <option value="">Relevance</option>
            <option value="">Inclusive</option>
            <option value="">Start With</option>
            <option value="">Contains</option>
          </select>
        </div>
        <div className="search-singleSearch">
          <label htmlFor="level" className="search-label">Level :</label>
          <select name="" id="level" className="search-select">
            <option value="">Senior</option>
            <option value="">Beginner</option>
            <option value="">Intermediate</option>
            <option value="">Advocate</option>
          </select>
        </div>
        <div className="search-singleSearch">
          <label htmlFor="type" className="search-label">Type :</label>
          <select name="" id="type" className="search-select">
            <option value="">Full-Time</option>
            <option value="">Remote</option>
            <option value="">Contract</option>
            <option value="">Part-Time</option>
          </select>
        </div>
        <span className="search-span">Clear All</span>
      </div>
    </div>
  );
};

export default Search;
