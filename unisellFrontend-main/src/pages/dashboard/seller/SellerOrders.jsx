// // SellerOrders.jsx
// import React from "react";
// import { useGetSellerOrdersQuery } from "../../../redux/features/orders/orderApi";
// import { Link } from "react-router-dom";

// const SellerOrders = () => {
//   const { data, isLoading, isError } = useGetSellerOrdersQuery();

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (isError) {
//     return <div>Error fetching orders.</div>;
//   }

//   // Ensure `orders` is an array before calling `.map`
//   const orders = Array.isArray(data?.orders) ? data.orders : [];

//   return (
//     <div>
//       <h2>Your Orders</h2>
//       {orders.length === 0 ? (
//         <p>No orders received yet.</p>
//       ) : (
//         <ul>
//           {orders.map((order) => (
//             <li key={order._id}>
//               <Link to={`/dashboard/seller/orders/${order._id}`}>
//                 Order #{order._id} - Status: {order.status}
//               </Link>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default SellerOrders;
