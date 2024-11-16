import React, { useEffect, useState } from "react";
import "./navBar.css";
import { Link, useNavigate } from 'react-router-dom';
import { logoutAPI } from "../service/authService";
import { CgProfile } from "react-icons/cg";
import { IoMdContacts } from "react-icons/io";
import { IoBriefcase } from "react-icons/io5";
import { MdLogout } from "react-icons/md"; 

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('accessToken'));
  const [showDropdown, setShowDropdown] = useState(false);
  const id = localStorage.getItem('id');
  const navigate = useNavigate();

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutAPI();
      localStorage.removeItem('accessToken');
      localStorage.removeItem('username');
      localStorage.removeItem('userRole');
      localStorage.removeItem('id');
      setIsLoggedIn(false);
      navigate('/login');
    } catch (error) {
      console.log('Logout failed', error);
    }
  };

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener("resize", showButton);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <strong>Job</strong>Finder <i className="fab fa-typo3"></i>
        </div>
        <div className="menu-icon" onClick={handleClick}>
          <i className={click ? "fas fa-times" : "fas fa-bars"} />
        </div>
        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <Link to="/contact-to-become-a-member" className="nav-links" onClick={closeMobileMenu}>
              <IoMdContacts  style={{ marginRight: "8px"}} /> {/* Home icon */}
              Contact to apply for recruitment
            </Link>
          </li>
          {isLoggedIn ? (
            <li className="nav-item dropdown">
              <div className="nav-links user-dropdown" onClick={toggleDropdown}>
                <CgProfile style={{ marginRight: "8px" }} /> {/* Profile icon */}
                User <i className="fas fa-caret-down"></i>
              </div>
              {showDropdown && (
                <div className="dropdown-menu">
                  <Link
                    to={`/user-detail/${id}`}
                    className="dropdown-link"
                    onClick={closeMobileMenu}
                  >
                    <CgProfile style={{ marginRight: "8px" }} /> {/* Profile icon */}
                    User Profile
                  </Link>
                  <Link
                    to={`/job-user-apply/${id}`}
                    className="dropdown-link"
                    onClick={closeMobileMenu}
                  >
                    <IoBriefcase style={{ marginRight: "8px" }} /> {/* Job Apply icon */}
                    Job Apply
                  </Link>
                  <div className="dropdown-link" onClick={handleLogout}>
                    <MdLogout style={{ marginRight: "8px" }} /> {/* Logout icon */}
                    Logout
                  </div>
                </div>
              )}
            </li>
          ) : (
            <li className="nav-item">
              <Link to="/login" className="nav-links" onClick={closeMobileMenu}>
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
