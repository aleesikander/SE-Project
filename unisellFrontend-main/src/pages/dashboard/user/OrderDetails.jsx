import React from "react";
import { useSelector } from "react-redux";
import { useGetMyOrdersQuery } from "../../../redux/features/orders/orderApi";

const OrderDetails = () => {
  const { user } = useSelector((state) => state.auth);
  const { data: orders, error, isLoading } = useGetMyOrdersQuery(user?.id); // Pass user ID

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading orders: {error.message}</div>;
  }

  return (
    <div className="section__container rounded p-6">
      <h2 className="text-2xl font-semibold mb-4">My Orders</h2>
      {orders && orders.length > 0 ? (
        <ul>
          {orders.map((order) => (
            <li key={order._id} className="mb-4">
              <div>Order ID: {order._id}</div>
              <div>Status: {order.status}</div>
              <div>Product: {order.productName}</div>
              <div>Quantity: {order.quantity}</div>
              <div>Price: ${order.totalPrice.toFixed(2)}</div>
              <div>
                {order.status === "pending" && (
                  <span className="text-yellow-600">Pending</span>
                )}
                {order.status === "confirmed" && (
                  <span className="text-green-600">Confirmed</span>
                )}
                {order.status === "rejected" && (
                  <span className="text-red-600">Rejected</span>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div>No orders found.</div>
      )}
    </div>
  );
};

export default OrderDetails;
