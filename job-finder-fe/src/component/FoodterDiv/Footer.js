import React from "react";
import "./Footer.css";
import { AiFillInstagram, AiOutlineTwitter } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";

const Footer = () => {
  return (
    <div className="footer">
      <div>
        <div className="footer-logo">
          <strong>Job</strong>Search <i className="fab footer.fa-typo3"></i>
        </div>
        <p className="p-div">
          We always make our seekers and companies find the best jobs and
          employers find the best candidates
        </p>
      </div>
      <div className="footer.left-side">
        <span className="footer.span-div1">Company</span>
        <div className="footer.left-side2">
          <li className="footer.li-div">About us</li>
          <li className="footer.li-div">Features</li>
          <li className="footer.li-div">News</li>
          <li className="footer.li-div">FAQ</li>
        </div>
      </div>
      <div className="footer.left-side">
        <span className="footer.span-div1">Resources</span>
        <div className="footer.left-side2">
          <li className="footer.li-div">Account</li>
          <li className="footer.li-div">Support Center</li>
          <li className="footer.li-div">Feedback</li>
          <li className="footer.li-div">Contact Us</li>
        </div>
      </div>
      <div className="footer.left-side">
        <span className="footer.span-div1">Support</span>
        <div className="footer.left-side2">
          <li className="footer.li-div">Events</li>
          <li className="footer.li-div">Promo</li>
          <li className="footer.li-div">Req Demo</li>
          <li className="footer.li-div">Careers</li>
        </div>
      </div>
      <div className="footer.left-side">
        <span className="footer.span-div1">Contact info</span>
        <div className="footer.infos">
          <small className="footer.email">test1@gmail.com</small>
          <div className="footer.icons">
            <AiFillInstagram className="footer.icon"  />
            <BsFacebook className="footer.icon"  />
            <AiOutlineTwitter className="footer.icon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;