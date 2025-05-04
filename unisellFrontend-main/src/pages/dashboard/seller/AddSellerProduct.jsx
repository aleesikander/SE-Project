import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useAddProductMutation } from "../../../redux/features/products/productsApi";
import TextInput from "../admin/addProduct/TextInput";
import SelectInput from "../admin/addProduct/SelectInput";
import UploadImage from "../admin/addProduct/UploadImage";
import { useNavigate } from "react-router-dom";

// Updated categories list for Unisell
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

const AddSellerProduct = () => {
  const { user } = useSelector((state) => state.auth);
  const [product, setProduct] = useState({
    name: "",
    category: "",
    color: "",
    price: "",
    description: "",
  });
  const [imageUrl, setImageUrl] = useState("");

  const [addProduct, { isLoading, error }] = useAddProductMutation();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleImageUpload = (uploadedImageUrl) => {
    setImageUrl(uploadedImageUrl);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for required fields
    if (
      !product.name ||
      !product.category ||
      !product.price ||
      !product.color ||
      !product.description ||
      !imageUrl // Ensure imageUrl is also validated
    ) {
      alert("Please fill in all fields.");
      return;
    }

    // Prepare the payload for the API request
    const payload = {
      ...product,
      image: imageUrl, // Use the uploaded image URL
      sellerId: user?._id, // Use sellerId instead of author
    };

    console.log("Payload to add product:", payload); // Debugging line

    try {
      await addProduct(payload).unwrap();
      alert("Product added successfully!");
      setProduct({
        name: "",
        category: "",
        color: "",
        price: "",
        description: "",
      });
      setImageUrl(""); // Clear image URL
      navigate("/shop");
    } catch (err) {
      console.error("Failed to add product:", err);
      alert(`Failed to add product: ${err.message}`);
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
          value={(e) => handleImageUpload(e.target.value)} // Ensure this line works with your UploadImage component
          placeholder="Upload product image"
          setImage={setImageUrl}
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
            placeholder="must mention your contact number"
            onChange={handleChange}
            className="add-product-InputCSS"
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

export default AddSellerProduct;
