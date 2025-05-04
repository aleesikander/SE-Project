import React from "react";
import blogsData from "../../data/blogs.json";

const Blogs = () => {
  return (
    <section className="section__container blog__container">
      <h2 className="section__header">Latest From Our Blog</h2>
      <p className="section__subheader">
        Elevate your wardrobe with our freshest style tips, trends, and
        inspiration on our blog.
      </p>
      <div className="md:p-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {blogsData.map((blog) => (
          <div
            className="blog__card cursor-pointer hover:scale-105 transition-all duration-200"
            key={blog.id}
          >
            <img
              src={blog.imageUrl}
              alt={blog.title}
              className="w-full h-48 object-cover rounded-t-md"
            />
            <div className="blog__card__content p-4">
              <h6 className="text-gray-500 text-sm">{blog.subtitle}</h6>
              <h4 className="font-bold text-lg">{blog.title}</h4>
              <p className="text-gray-400 text-xs">
                {blog.date} - {blog.author}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Blogs;
