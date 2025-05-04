import React from "react";

const PromoBanner = () => {
  return (
    <section className="section__container banner__container flex ">
      <div className="banner__card w-1/3 mx-2">
        {" "}
        {/* Increased width, removed extra spacing */}
        <span>
          <i className="ri-truck-line"></i>
        </span>
        <h4>Free Delivery</h4>
        <p>
          Enjoy free delivery on all orders over a certain amount. Shop
          conveniently from anywhere, anytime!
        </p>
      </div>
      <div className="banner__card w-1/3 mx-2">
        {" "}
        {/* Increased width, removed extra spacing */}
        <span>
          <i className="ri-money-dollar-circle-line"></i>
        </span>
        <h4> Money Back Guarantee</h4>
        <p>
          Shop with confidence! If you're not satisfied with your purchase, we
          offer a full money-back guarantee.
        </p>
      </div>
      <div className="banner__card w-1/3 mx-2">
        {" "}
        {/* Increased width, removed extra spacing */}
        <span>
          <i className="ri-user-voice-fill"></i>
        </span>
        <h4>Strong Customer Support</h4>
        <p>
          Our dedicated support team is here to assist you with any queries or
          issues, ensuring a smooth shopping experience.
        </p>
      </div>
    </section>
  );
};

export default PromoBanner;
