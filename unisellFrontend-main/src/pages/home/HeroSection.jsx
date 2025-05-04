import React from "react";

// Updated links for images from Unsplash with broader categories
const cards = [
  {
    id: 2,
    image:
      "https://img.freepik.com/free-photo/headphones-yellow_23-2147781417.jpg?t=st=1730065022~exp=1730068622~hmac=6a837dda32914b6d0ca4ddad5acfb439cd99ca2204436aff93a1df75188a8c13&w=1380",
    trend: "Trending",
    title: "Headphones ",
    link: "categories/accessories",
  },
  {
    id: 3,
    image:
      "https://img.freepik.com/free-photo/eye-shadows-with-lipsticks-pink-table_23-2148047055.jpg?t=st=1730065253~exp=1730068853~hmac=b192a939c73447c707d48943e2633960811aec74cd77b75d25fa9c192fce5499&w=1380",
    trend: "Trending",
    title: "...Eye shadows with lipsticks",
    link: "categories/cosmetics",
  },
  {
    id: 4,
    image:
      "https://img.freepik.com/free-photo/modern-photorealistic-lamp-design_23-2151038960.jpg?t=st=1730065506~exp=1730069106~hmac=0ab14eefbb0b6be9dce31e490f74426d3382deb03202af5a59ceb90f70e98d41&w=1380",
    trend: "Trending",
    title: "Modern photorealistic lamp",
    link: "#",
  },
];

const HeroSection = () => {
  return (
    <section className="section__container hero__container">
      {cards.map((card) => (
        <div key={card.id} className="hero__card">
          <img
            src={card.image}
            alt={card.title}
            className="w-full h-48 object-cover" // Keep the height as was
          />
          <div className="hero__content">
            <p>{card.trend}</p>
            <h4>{card.title}</h4>
            <a href={card.link}>Discover More +</a>
          </div>
        </div>
      ))}
    </section>
  );
};

export default HeroSection;
