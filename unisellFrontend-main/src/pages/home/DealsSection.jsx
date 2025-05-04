import React from "react";
import dealsImg from "../../assets/hero2.png"; // Ensure this image exists in your assets folder

const DealsSection = () => {
  return (
    <section className="section__container deals__container bg-gray-50">
      <div className="deals__image">
        <img
          src={dealsImg}
          alt="Exclusive Deals"
          className="w-full h-auto max-h-[460px] object-contain rounded-lg" // Increased max height to 450px
        />
      </div>
      <div className="deals__content">
        <h5>Get Up To 20% Discount</h5>
        <h4>Monthly Deals</h4>
        <p>
          Discover exclusive deals this month on a wide range of products across
          all categories at UniSell! Enjoy significant savings on clothing,
          accessories, electronics, and more. Shop now and elevate your style
          and home without breaking the bank.
        </p>
        <div className="deals__countdown flex-wrap">
          <div className="deals__countdown__card">
            <h4>14</h4>
            <p>Days</p>
          </div>
          <div className="deals__countdown__card">
            <h4>20</h4>
            <p>Hours</p>
          </div>
          <div className="deals__countdown__card">
            <h4>15</h4>
            <p>Mins</p>
          </div>
          <div className="deals__countdown__card">
            <h4>05</h4>
            <p>Secs</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DealsSection;
