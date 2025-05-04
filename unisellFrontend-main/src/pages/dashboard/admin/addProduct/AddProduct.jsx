import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useAddProductMutation } from "../../../../redux/features/products/productsApi";
import TextInput from "./TextInput";
import SelectInput from "./SelectInput";
import UploadImage from "./UploadImage";
import { useNavigate } from "react-router-dom";

const categories = [
  { label: "Select Category", value: "" },
  { label: "Accessories", value: "accessories" },
  { label: "Dress", value: "dress" },
  { label: "Jewellery", value: "jewellery" },
  { label: "Cosmetics", value: "cosmetics" },
  { label: "Electronics", value: "electronics" },
  { label: "Books", value: "books" },
  { label: "Stationery", value: "stationery" },
  { label: "Sports", value: "sports" },
];

const colors = [
  { label: "Select Color", value: "" },
  { label: "Black", value: "black" },
  { label: "Red", value: "red" },
  { label: "Gold", value: "gold" },
  { label: "Blue", value: "blue" },
  { label: "Silver", value: "silver" },
  { label: "Beige", value: "beige" },
  { label: "Green", value: "green" },
];

const AddProduct = () => {
  const { user } = useSelector((state) => state.auth); // Get the logged-in user
  const [product, setProduct] = useState({
    name: "",
    category: "",
    color: "",
    price: "",
    description: "",
  });
  const [image, setImage] = useState(""); // Store the uploaded image URL

  const [addProduct, { isLoading, error }] = useAddProductMutation();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !product.name ||
      !product.category ||
      !product.price ||
      !product.color ||
      !product.description ||
      !image // Check if the image state is empty
    ) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      // Add sellerId directly from user ID
      await addProduct({ ...product, image, sellerId: user._id }).unwrap();
      alert("Product added successfully!");
      setProduct({
        name: "",
        category: "",
        color: "",
        price: "",
        description: "",
      });
      setImage(""); // Reset image state after successful submission
      navigate("/shop");
    } catch (err) {
      console.error("Failed to add product:", err);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <TextInput
          label="Product Name"
          name="name"
          placeholder="Ex: Diamond Earrings"
          value={product.name}
          onChange={handleChange}
        />
        <SelectInput
          label="Category"
          name="category"
          value={product.category}
          onChange={handleChange}
          options={categories}
        />
        <SelectInput
          label="Color"
          name="color"
          value={product.color}
          onChange={handleChange}
          options={colors}
        />
        <TextInput
          label="Price"
          name="price"
          type="number"
          placeholder="50"
          value={product.price}
          onChange={handleChange}
        />
        <UploadImage
          name="image"
          id="image"
          setImage={setImage} // Correctly pass setImage as a prop
        />
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            rows={6}
            name="description"
            id="description"
            value={product.description}
            placeholder="Write a product description"
            onChange={handleChange}
            className="add-product-InputCSS "
          />
        </div>
        <div>
          <button
            type="submit"
            className="add-product-btn"
            disabled={isLoading}
          >
            {isLoading ? "Adding..." : "Add Product"}
          </button>
        </div>
      </form>

      {error && (
        <p className="text-red-500 mt-4">
          Error adding product: {error.message}
        </p>
      )}
    </div>
  );
};

export default AddProduct;
