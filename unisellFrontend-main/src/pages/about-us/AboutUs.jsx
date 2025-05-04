import React from "react";
import alipic from "../../assets/ali.png";

const AboutUs = () => {
  return (
    <div className="about-us container mx-auto p-4 bg-gray-50">
      <h1 className="text-3xl font-bold text-center mb-6">About Us</h1>
      <section className="owner-info mb-10">
        <h2 className="text-2xl font-semibold mb-4">Meet the Owner</h2>
        <div className="flex flex-col md:flex-row items-center">
          <img
            src={alipic}
            alt="Ali Sikandar"
            className="w-40 h-40 rounded-full mx-auto md:mx-0 md:mr-6 mb-4 md:mb-0"
          />
          <div>
            <h3 className="text-xl font-semibold">Ali Sikandar</h3>
            <p className="text-gray-700">
              Ali Sikandar is passionate about connecting university students
              with a platform that enables buying and selling of quality
              products. With a vision to foster a community that thrives on
              mutual benefits and sustainability, UniSell was born.
            </p>
            <p className="text-gray-700 mt-2">
              With experience in business management and e-commerce, Ali
              Sikandar strives to create a seamless shopping experience for
              every user.
            </p>
          </div>
        </div>
      </section>

      <section className="contact-info">
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <p className="text-gray-700 mb-2">
          If you have any questions, concerns, or feedback, please feel free to
          reach out to us:
        </p>
        <ul className="list-disc list-inside">
          <li>
            Email:{" "}
            <a href="mailto:support@unisell.com" className="text-blue-500">
              support@unisell.com
            </a>
          </li>
          <li>
            Phone:{" "}
            <a href="tel:+1234567890" className="text-blue-500">
              +1 (234) 567-890
            </a>
          </li>
          <li>Address: 123 UniSell St, City, Country</li>
        </ul>
      </section>
    </div>
  );
};

export default AboutUs;
