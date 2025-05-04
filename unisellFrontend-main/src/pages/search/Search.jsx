import React, { useState } from "react";
import ProductCards from "../shop/ProductCards";
import { useFetchAllProductsQuery } from "../../redux/features/products/productsApi";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch all products from the API
  const { data, isLoading, error } = useFetchAllProductsQuery();
  const products = data?.products || []; // Ensure products is an array

  // Filter products based on search query
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <section className="section__container bg-gray-100">
        <h2 className="section__header">Search Products</h2>
        <p className="section__subheader">
          Browse a diverse range of categories, from chic dresses to versatile
          accessories. Elevate your style today!
        </p>
      </section>

      <section className="section__container">
        <div className="w-full mb-12 flex flex-col md:flex-row items-center justify-center gap-4">
          <input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-bar w-full max-w-4xl p-2 border rounded"
          />
        </div>

        {isLoading ? (
          <p className="text-center">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">Error loading products.</p>
        ) : filteredProducts.length > 0 ? (
          <ProductCards products={filteredProducts} />
        ) : (
          <p className="text-center">No products found.</p>
        )}
      </section>
    </>
  );
};

export default Search;
