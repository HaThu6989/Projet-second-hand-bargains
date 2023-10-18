import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer>
        <div className="container-footer">
          <div className="back-home">
            <h3>Second hand bargains</h3>
            <div className="link">
              <Link>Come back home</Link>
              <Link>Go to top</Link>
            </div>
          </div>
          <div className="about-contact-us">
            <div className="box">
              <h3>About Us</h3>
              <div className="link">
                <Link>Our Stores</Link>
                <Link>Terms & Conditions</Link>
                <Link>Privacy Policy</Link>
              </div>
            </div>

            <div className="box">
              <h3>Contact Us</h3>
              <ul>
                <li>2 Résidence Du Val, 91120 PALAISEAU</li>
                <li>Email: htran@gmail.com</li>
                <li>Phone: +33 1123 456 780</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
