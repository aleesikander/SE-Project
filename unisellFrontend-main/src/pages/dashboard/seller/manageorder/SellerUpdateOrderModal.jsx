// // SellerUpdateOrderModal.jsx
// import React, { useState } from "react";
// import { useUpdateOrderMutation } from "../../../../redux/features/orders/orderApi";

// const SellerUpdateOrderModal = ({ order, isOpen, onClose }) => {
//   const [status, setStatus] = useState(order.status);
//   const [updateOrder] = useUpdateOrderMutation();

//   const handleUpdate = async () => {
//     try {
//       await updateOrder({ id: order._id, status }).unwrap();
//       onClose();
//     } catch (err) {
//       console.error("Failed to update order:", err);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="bg-white p-6 rounded-lg w-96">
//         <h3 className="text-lg font-semibold mb-4">Update Order Status</h3>

//         <label className="block mb-2">
//           Status:
//           <select
//             value={status}
//             onChange={(e) => setStatus(e.target.value)}
//             className="mt-1 block w-full p-2 border border-gray-300 rounded"
//           >
//             <option value="pending">Pending</option>
//             <option value="confirmed">confirmed</option>
//             <option value="rejected">rejected</option>
//           </select>
//         </label>

//         <div className="flex justify-end space-x-4 mt-4">
//           <button onClick={onClose} className="px-4 py-2 text-gray-600">
//             Cancel
//           </button>
//           <button
//             onClick={handleUpdate}
//             className="px-4 py-2 bg-blue-500 text-white rounded"
//           >
//             Update
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SellerUpdateOrderModal;
