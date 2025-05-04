// import React, { useState, useEffect } from "react";
// import SellerUpdateOrderModal from "./SellerUpdateOrderModal";
// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
// import {
//   useGetSellerOrdersQuery,
//   useDeleteOrderMutation,
// } from "../../../../redux/features/orders/orderApi";
// import { formatDate } from "../../../../utils/dateFormatter";

// const SellerManageOrder = () => {
//   const { user } = useSelector((state) => state.auth);
//   const sellerId = user?._id;

//   const {
//     data: orders,
//     error,
//     isLoading,
//     refetch,
//   } = useGetSellerOrdersQuery(undefined, {
//     skip: !sellerId, // Skip query if sellerId is undefined
//   });

//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [deleteOrder] = useDeleteOrderMutation();

//   useEffect(() => {
//     if (!sellerId) {
//       console.error("Seller ID is undefined.");
//     } else {
//       console.log("Fetching orders for Seller ID:", sellerId);
//     }
//   }, [sellerId]);

//   const handleEditClick = (order) => {
//     setSelectedOrder(order);
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setSelectedOrder(null);
//   };

//   const handleDeleteClick = async (orderId) => {
//     try {
//       await deleteOrder(orderId).unwrap();
//       refetch();
//     } catch (err) {
//       console.error("Failed to delete order:", err);
//     }
//   };

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error.message}</div>;

//   return (
//     <div className="section__container p-6">
//       <h2 className="text-2xl font-semibold mb-4">Manage Your Orders</h2>

//       <table className="min-w-full bg-white border border-gray-200 rounded-lg">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="py-3 px-4 border-b">Order ID</th>
//             <th className="py-3 px-4 border-b">Customer</th>
//             <th className="py-3 px-4 border-b">Status</th>
//             <th className="py-3 px-4 border-b">Date</th>
//             <th className="py-3 px-4 border-b">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {orders?.map((order, index) => (
//             <tr key={index}>
//               <td className="py-3 px-4 border-b">{order.orderId}</td>
//               <td className="py-3 px-4 border-b">
//                 {order.items.buyerId.name}
//               </td>{" "}
//               {/* Display buyer name */}
//               <td className="py-3 px-4 border-b">
//                 <span
//                   className={`inline-block px-3 text-xs py-1 text-white rounded-full ${getStatusColor(
//                     order.status
//                   )}`}
//                 >
//                   {order.status}
//                 </span>
//               </td>
//               <td className="py-3 px-4 border-b">
//                 {formatDate(order.updatedAt)}
//               </td>
//               <td className="py-3 px-4 border-b flex items-center space-x-4">
//                 <Link to="#" className="text-blue-500 hover:underline">
//                   View
//                 </Link>
//                 <button
//                   onClick={() => handleEditClick(order)}
//                   className="text-green-500 hover:underline"
//                 >
//                   Edit
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Update Order Modal */}
//       {selectedOrder && (
//         <SellerUpdateOrderModal
//           order={selectedOrder}
//           isOpen={isModalOpen}
//           onClose={handleCloseModal}
//         />
//       )}
//     </div>
//   );
// };

// // Helper function to determine the color based on status
// const getStatusColor = (status) => {
//   switch (status) {
//     case "pending":
//       return "bg-yellow-500";
//     case "confirmed":
//       return "bg-blue-500";
//     case "rejected":
//       return "bg-green-500";
//     default:
//       return "bg-gray-300";
//   }
// };

// export default SellerManageOrder;
