import React from "react";
import "./Footer.css";
import WhiteLogo from "../../Images/logo.png";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="bg-danger bg-gradient py-3">
      <div className="container">
        <div className="row footer-top py-5">
          <div className="col-md-6 mb-5">
            <img src={WhiteLogo} alt="Pomato Logo" />
          </div>
          <div className="col-md-3">
            <ul className="list-unstyled">
              <li>
                <Link to="/about">About Online Food</Link>
              </li>
              <li>
                <Link to="/blog">Read Our Blog</Link>
              </li>
              <li>
                <Link to="/login">Sign up to deliver</Link>
              </li>
              <li>
                <Link to="/about">Add your restaurant</Link>
              </li>
            </ul>
          </div>
          <div className="col-md-3">
            <ul className="list-unstyled">
              <li>
                <Link to="/help">Get Help</Link>
              </li>
              <li>
                <Link to="/faq">Read FAQ</Link>
              </li>
              <li>
                <Link to="/cities">View All Cities</Link>
              </li>
              <li>
                <Link to="/nearme">Restaurants near me</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom d-flex justify-content-between align-items-center">
          <small className="text-white">
            Copyright &copy; {new Date().getFullYear()} Pulok Chowdhury{" "}
          </small>
          <ul className="list-inline">
            <li className="list-inline-item ml-3">
              <a href="/">Privacy Policy.</a>
            </li>
            <li className="list-inline-item  ml-3">
              <a href="/">Terms of Use</a>
            </li>
            <li className="list-inline-item  ml-3">
              <a href="/admin">Admin</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
