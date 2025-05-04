import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import TextInput from "../admin/addProduct/TextInput";
import UploadImage from "../admin/addProduct/UploadImage";
import SelectInput from "../admin/addProduct/SelectInput";
import {
  useFetchProductByIdQuery,
  useUpdateProductMutation,
} from "../../../redux/features/products/productsApi";

const categories = [
  { label: "Select Category", value: "" },
  { label: "Accessories", value: "accessories" },
  { label: "Dress", value: "dress" },
  { label: "Jewellery", value: "jewellery" },
  { label: "Cosmetics", value: "cosmetics" },
];

const colors = [
  { label: "Select Color", value: "" },
  { label: "Black", value: "black" },
  { label: "Red", value: "red" },
  { label: "Gold", value: "gold" },
  { label: "White", value: "white" },
];

const UpdateSellerProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const sellerId = useSelector((state) => state.auth.user._id);
  const {
    data: product,
    isLoading,
    error,
  } = useFetchProductByIdQuery(productId);

  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const [productData, setProductData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    color: "",
    image: null,
  });

  useEffect(() => {
    if (product) {
      setProductData({
        name: product.name,
        category: product.category,
        price: product.price,
        stock: product.stock,
        description: product.description,
        color: product.color,
        image: null, // Reset image to avoid sending the old one
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (image) => {
    setProductData((prev) => ({ ...prev, image }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Optional: Add validation before submitting
    if (!productData.name || !productData.category || !productData.price) {
      alert("Please fill in all required fields.");
      return;
    }
    try {
      const updatedData = { ...productData };
      if (updatedData.image) {
        // Handle image uploading logic if needed
      }
      await updateProduct({ id: productId, data: updatedData }).unwrap();
      alert("Product updated successfully!");
      navigate("/dashboard/manage-products");
    } catch (error) {
      console.error("Failed to update the product:", error);
      alert("Error updating the product. Please try again.");
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching product details.</div>;

  return (
    <div className="py-1 bg-blueGray-50">
      <div className="w-full mb-12 xl:mb-0 px-4 mx-auto">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <h3 className="font-semibold text-base text-blueGray-700">
              Update Product
            </h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="p-4">
              <TextInput
                label="Product Name"
                name="name"
                value={productData.name}
                onChange={handleChange}
                required
              />
              <SelectInput
                label="Category"
                name="category"
                options={categories}
                value={productData.category}
                onChange={handleChange}
                required
              />
              <TextInput
                label="Price"
                name="price"
                type="number"
                value={productData.price}
                onChange={handleChange}
                required
              />
              <TextInput
                label="Stock"
                name="stock"
                type="number"
                value={productData.stock}
                onChange={handleChange}
                required
              />
              <TextInput
                label="Description"
                name="description"
                value={productData.description}
                onChange={handleChange}
                required
              />
              <SelectInput
                label="Color"
                name="color"
                options={colors}
                value={productData.color}
                onChange={handleChange}
                required
              />
              <UploadImage onImageUpload={handleImageUpload} />
            </div>
            <div className="px-4 py-3 border-t border-blueGray-200 text-right">
              <button
                type="submit"
                className={`bg-indigo-500 text-white font-bold uppercase px-4 py-2 rounded ${
                  isUpdating ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isUpdating}
              >
                {isUpdating ? "Updating..." : "Update Product"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateSellerProduct;
