import React, { useState, useEffect } from "react";
import ProductCards from "./ProductCards";
import { useFetchAllProductsQuery } from "../../redux/features/products/productsApi";

const TrendingProducts = () => {
  const { data, error, isLoading } = useFetchAllProductsQuery({
    limit: 10, // Limit to 10 products for the trending section
  });

  const products = data?.products || []; // Ensure products is an array

  return (
    <section className="section__container product__container">
      <h2 className="section__header">Trending Products</h2>
      <p className="section__subheader mb-12">
        Discover Unique Finds: Elevate Your Experience with Our Curated
        Collection of Trending Products at UniSell.
      </p>

      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">Error loading trending products.</p>
      ) : (
        <ProductCards products={products} />
      )}
    </section>
  );
};

export default TrendingProducts;
