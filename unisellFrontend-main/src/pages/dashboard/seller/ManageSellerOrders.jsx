import React, { useState } from "react";
import UpdateOrderModal from "./UpdateOrderModel";
import { useGetSellerOrdersQuery } from "../../../redux/features/orders/orderApi";
import { formatDate } from "../../../utils/dateFormater";
import { FaCaretDown } from "react-icons/fa"; // Import an icon for the dropdown

const ManageSellerOrders = () => {
  const sellerId = localStorage.getItem("userId");
  const { data, error, isLoading, refetch } = useGetSellerOrdersQuery({
    sellerId,
  });

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedOrderId, setExpandedOrderId] = useState(null); // For managing the expanded details view

  const handleEditClick = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
    refetch();
  };

  const toggleOrderDetails = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="section__container p-6">
      <h2 className="text-2xl font-semibold mb-6">Manage Seller Orders</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              {[
                "Details",
                "Product Name",
                "Quantity",
                "Status",
                "Date Ordered",
                "Actions",
              ].map((header) => (
                <th
                  key={header}
                  className="py-3 px-6 border-b text-left font-semibold text-gray-700 text-center"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.orders?.map((order) => (
              <React.Fragment key={order._id}>
                <tr
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => toggleOrderDetails(order._id)}
                >
                  <td className="py-4 px-6 border-b text-gray-700 text-center flex items-center justify-center">
                    {/* Icon with label for Details */}
                    <span className="mr-2">Details</span>
                    <FaCaretDown
                      className={`transition-transform ${
                        expandedOrderId === order._id ? "rotate-180" : ""
                      }`}
                    />
                  </td>
                  <td className="py-4 px-6 border-b text-gray-700 text-center">
                    {order.products[0]?.productId?.name}
                  </td>
                  <td className="py-4 px-6 border-b text-gray-700 text-center">
                    {order.products[0]?.quantity}
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
                    {formatDate(order.createdAt)}
                  </td>
                  <td className="py-4 px-6 border-b text-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditClick(order);
                      }}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
                {expandedOrderId === order._id && (
                  <tr>
                    <td colSpan="6" className="py-2 px-6 border-b">
                      <div className="p-4 border border-gray-300 rounded bg-gray-50">
                        <h3 className="font-semibold mb-2">Order Details</h3>
                        <div className="mb-4">
                          <p>
                            <strong>Shipping Address:</strong>{" "}
                            {order.shippingDetails.address}
                          </p>
                          <p>
                            <strong>City:</strong> {order.shippingDetails.city}
                          </p>
                          <p>
                            <strong>Postal Code:</strong>{" "}
                            {order.shippingDetails.postalCode}
                          </p>
                          <p>
                            <strong>Country:</strong>{" "}
                            {order.shippingDetails.country}
                          </p>
                          <p>
                            <strong>Contact Number:</strong>{" "}
                            {order.contactNumber}
                          </p>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {selectedOrder && (
        <UpdateOrderModal
          order={selectedOrder}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

const getStatusColor = (status) => {
  switch (status) {
    case "pending":
      return "bg-yellow-500";
    case "confirmed":
      return "bg-blue-500";
    case "rejected":
      return "bg-red-500";
    default:
      return "bg-gray-300";
  }
};

export default ManageSellerOrders;
