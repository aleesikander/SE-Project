import React from "react";
import instaImg1 from "../assets/instagram-1.jpg";
import instaImg2 from "../assets/instagram-2.jpg";
import instaImg3 from "../assets/instagram-3.jpg";
import instaImg4 from "../assets/instagram-4.jpg";
import instaImg5 from "../assets/instagram-5.jpg";
import instaImg6 from "../assets/instagram-6.jpg";

const Footer = () => {
  return (
    <>
      <footer className="section__container footer__container">
        <div className="footer__col">
          <h4>CONTACT INFO</h4>
          <p>
            <span>
              <i className="ri-map-pin-2-fill"></i>
            </span>
            123 University Ave, Campus City
          </p>
          <p>
            <span>
              <i className="ri-mail-fill"></i>
            </span>
            support@unimarket.com
          </p>
          <p>
            <span>
              <i className="ri-phone-fill"></i>
            </span>
            (+012) 3456 789
          </p>
        </div>
        <div className="footer__col">
          <h4>COMPANY</h4>
          <a href="#">Home</a>
          <a href="#">About Us</a>
          <a href="#">Careers</a>
          <a href="#">Blog</a>
          <a href="#">Terms & Conditions</a>
        </div>
        <div className="footer__col">
          <h4>USEFUL LINKS</h4>
          <a href="#">Help Center</a>
          <a href="#">Track My Orders</a>
          <a href="#">Buy Products</a>
          <a href="#">Sell Products</a>
          <a href="#">FAQs</a>
        </div>
        <div className="footer__col">
          <h4>INSTAGRAM</h4>
          <div className="instagram__grid">
            <img src={instaImg1} alt="Instagram" />
            <img src={instaImg2} alt="Instagram" />
            <img src={instaImg3} alt="Instagram" />
            <img src={instaImg4} alt="Instagram" />
            <img src={instaImg5} alt="Instagram" />
            <img src={instaImg6} alt="Instagram" />
          </div>
        </div>
      </footer>
      <div className="footer__bar">
        Copyright © 2025 University Student Market. All rights reserved.
      </div>
    </>
  );
};

export default Footer;
