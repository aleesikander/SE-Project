import React from "react";
import bannerImg from "../../assets/hero.png";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <header className="section__container header__container bg-gray-100">
      <div className="header__content z-30 ">
        <h4>HERE YOU'LL FIND ALL YOU NEED</h4>
        <h1>Trending Deals</h1>
        <p>
          Welcome to UniSell! Discover a diverse range of products tailored to
          meet your every need. From the latest trends in fashion to unique
          accessories and essentials, explore our carefully curated collection
          that fits every style and occasion.
        </p>
        <button className="btn">
          <Link to="/shop">EXPLORE NOW</Link>
        </button>
      </div>
      <div className="header__image">
        <img
          src={bannerImg}
          alt="header"
          className="w-full h-[600px] object-cover" // Adjust the height here
        />
      </div>
    </header>
  );
};

export default Banner;
