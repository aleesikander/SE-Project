import React from "react";
import { useSelector } from "react-redux";
import { useGetMyOrdersQuery } from "../../../redux/features/orders/orderApi";
import { formatDate } from "../../../utils/dateFormater";

const UserOrders = () => {
  const { user } = useSelector((state) => state.auth);
  const { data, error, isLoading } = useGetMyOrdersQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching orders: {error.message}</div>;

  const orders = data?.orders || [];

  if (!Array.isArray(orders) || orders.length === 0)
    return <div>No orders found!</div>;

  return (
    <div className="section__container p-6">
      <h2 className="text-2xl font-semibold mb-6">Your Orders</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              {["Product Name", "Date", "Status", "Total Amount"].map(
                (header) => (
                  <th
                    key={header}
                    className="py-3 px-6 border-b text-left font-semibold text-gray-700 text-center"
                  >
                    {header}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="hover:bg-gray-50">
                <td className="py-4 px-6 border-b text-gray-700 text-center">
                  {order.products[0]?.productId?.name || "N/A"}
                </td>
                <td className="py-4 px-6 border-b text-gray-700 text-center">
                  {formatDate(order.createdAt)}
                </td>
                <td className="py-4 px-6 border-b text-center">
                  <span
                    className={`inline-block px-3 py-1 text-xs font-medium text-white rounded-full ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="py-4 px-6 border-b text-gray-700 text-center">
                  PKR {order.amount.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const getStatusColor = (status) => {
  switch (status) {
    case "completed":
      return "bg-green-500";
    case "pending":
      return "bg-yellow-500";
    case "processing":
      return "bg-blue-500";
    default:
      return "bg-gray-300";
  }
};

export default UserOrders;
