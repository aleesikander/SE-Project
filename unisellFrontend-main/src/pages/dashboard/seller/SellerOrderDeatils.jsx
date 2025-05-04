// SellerOrderDetails.jsx
import React from "react";
import { useParams } from "react-router-dom";
import { useGetSellerOrdersQuery } from "../../../redux/features/orders/orderApi";

const SellerOrderDetails = () => {
  const { orderId } = useParams(); // Get orderId from the URL
  const { data: orders, isLoading, isError } = useGetSellerOrdersQuery();

  if (isLoading) {
    return <div>Loading...</div>; // Show loading state
  }

  if (isError) {
    return <div>Error fetching order details.</div>; // Show error state
  }

  // Find the order based on the orderId
  const order = orders.find((order) => order._id === orderId);

  if (!order) {
    return <div>Order not found.</div>; // Handle case where order doesn't exist
  }

  return (
    <div>
      <h2>Order Details for Order #{order._id}</h2>
      <p>Status: {order.status}</p>
      <h3>Products:</h3>
      <ul>
        {order.products.map((product) => (
          <li key={product.productId}>
            {product.name} - Quantity: {product.quantity}
          </li>
        ))}
      </ul>
      <p>Total Price: ${order.totalPrice}</p>
      <p>Customer Details:</p>
      <p>Name: {order.customer.name}</p>
      <p>Email: {order.customer.email}</p>
      <p>Address: {order.shippingAddress}</p>
    </div>
  );
};

export default SellerOrderDetails;
