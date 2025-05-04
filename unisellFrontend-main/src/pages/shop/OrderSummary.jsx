import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../redux/features/cart/cartSlice";
import { usePlaceOrderMutation } from "../../redux/features/orders/orderApi";

const OrderSummary = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const products = useSelector((store) => store.cart.products);
  const { totalPrice, selectedItems } = useSelector((store) => store.cart);

  const [shippingDetails, setShippingDetails] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "",
    contactNumber: "",
  });
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [placeOrder] = usePlaceOrderMutation();

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails({ ...shippingDetails, [name]: value });
  };

  const handlePlaceOrder = async () => {
    if (products.length === 0) {
      setErrorMessage("No products found.");
      return;
    }

    if (
      !shippingDetails.contactNumber ||
      shippingDetails.contactNumber === ""
    ) {
      setErrorMessage("Contact number is required.");
      return;
    }

    const orderData = {
      products: products.map((product) => ({
        productId: product._id,
        quantity: product.quantity,
      })),
      amount: totalPrice,
      shippingDetails: {
        address: shippingDetails.address,
        city: shippingDetails.city,
        postalCode: shippingDetails.postalCode,
        country: shippingDetails.country,
      },
      contactNumber: shippingDetails.contactNumber,
    };

    try {
      await placeOrder(orderData).unwrap();
      setErrorMessage("");
      setSuccessMessage("Order placed successfully!");
      alert("Your order has been placed successfully!"); // Alert added here
      handleClearCart();
    } catch (error) {
      setErrorMessage(error.data?.message || "Failed to place order.");
      setSuccessMessage("");
    }
  };

  return (
    <div className="bg-gray-200 mt-5 rounded text-base">
      <div className="px-6 py-4 space-y-5">
        <h1 className="text-2xl font-bold text-dark">Order Summary</h1>
        <p className="text-dark mt-2">Selected Items: {selectedItems}</p>
        <p className="text-dark mt-2">
          Total Price: PKR {totalPrice.toFixed(2)}
        </p>
        {errorMessage && <p className="text-red-600 mt-2">{errorMessage}</p>}
        {successMessage && (
          <p className="text-green-600 mt-2">{successMessage}</p>
        )}
      </div>
      <div className="px-6 py-4 space-y-5">
        <h2 className="text-xl font-semibold">Shipping Details</h2>
        <form className="space-y-4">
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={shippingDetails.address}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={shippingDetails.city}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="postalCode"
            placeholder="Postal Code"
            value={shippingDetails.postalCode}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={shippingDetails.country}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="contactNumber"
            placeholder="Contact Number"
            value={shippingDetails.contactNumber}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="Coupon Code"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <button
            type="button"
            onClick={() => {
              if (coupon === "save") {
                setDiscount(10);
              }
            }}
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            Apply Coupon
          </button>
        </form>
      </div>
      <div className="px-4 pb-6">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleClearCart();
          }}
          className="bg-red-500 px-3 py-1.5 text-white mt-2 rounded-md flex justify-between items-center mb-4"
        >
          <span className="mr-2">Clear Cart</span>
          <i className="ri-delete-bin-7-line"></i>
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePlaceOrder();
          }}
          className="bg-green-600 px-3 py-1.5 text-white mt-2 rounded-md flex justify-between items-center"
        >
          <span className="mr-2">Place Order</span>
          <i className="ri-shopping-cart-2-line"></i>
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
