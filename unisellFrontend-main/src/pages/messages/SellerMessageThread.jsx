// import React, { useEffect } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import { ArrowLeft } from "lucide-react";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   fetchMessages,
//   markMessagesAsRead,
// } from "../../redux/features/messages/messagesSlice";
// import MessageList from "../../components/MessageList";
// import MessageInput from "../../components/MessageInput";

// const SellerMessageThread = () => {
//   const { conversationId } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const {
//     user,
//     isLoggedIn,
//     isLoading: isAuthLoading,
//   } = useSelector((state) => state.auth);

//   const {
//     messages = [],
//     participantInfo = {},
//     status,
//     error,
//   } = useSelector((state) => state.messages);

//   // Participant info handling
//   const participantName = [
//     location.state?.participantName,
//     participantInfo?.name,
//     "User",
//   ].find(Boolean);
//   const participantAvatar =
//     location.state?.participantAvatar || participantInfo?.avatar;

//   useEffect(() => {
//     if (!isAuthLoading) {
//       if (!isLoggedIn) {
//         navigate("/login", { state: { from: location.pathname } });
//         return;
//       }

//       // Validate seller role
//       if (user?.role !== "seller") {
//         navigate("/dashboard/seller/messages");
//         return;
//       }

//       if (conversationId) {
//         dispatch(fetchMessages(conversationId));
//         dispatch(markMessagesAsRead(conversationId));
//       }
//     }
//   }, [conversationId, user, isLoggedIn, isAuthLoading]);

//   const handleBackToInbox = () => navigate("/dashboard/seller/messages");

//   if (isAuthLoading || status === "loading") {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-4 bg-red-50 rounded-lg text-red-500 text-center">
//         Error loading messages: {error}
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-4 sm:p-6">
//       <div className="flex items-center mb-6">
//         <button
//           onClick={handleBackToInbox}
//           className="mr-3 p-2 rounded-full hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors"
//           aria-label="Back to inbox"
//         >
//           <ArrowLeft size={20} />
//         </button>
//         <h1 className="text-xl font-semibold text-gray-900">
//           Conversation with {participantName}
//         </h1>
//       </div>

//       <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//         <div className="p-4 border-b border-gray-200 bg-gray-50 flex items-center">
//           {participantAvatar ? (
//             <img
//               className="h-10 w-10 rounded-full mr-3 object-cover"
//               src={participantAvatar}
//               alt={participantName}
//               onError={(e) => {
//                 e.target.onerror = null;
//                 e.target.src = "";
//                 e.target.outerHTML = `
//                   <div class="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
//                     <svg class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
//                       <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
//                     </svg>
//                   </div>
//                 `;
//               }}
//             />
//           ) : (
//             <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
//               <svg
//                 className="h-5 w-5 text-gray-400"
//                 fill="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
//               </svg>
//             </div>
//           )}
//           <div>
//             <h3 className="font-medium text-gray-900">{participantName}</h3>
//             <p className="text-sm text-gray-500">
//               {participantInfo?.email || ""}
//             </p>
//           </div>
//         </div>

//         <div className="h-[calc(100vh-320px)] min-h-[400px] max-h-[600px] overflow-y-auto">
//           <MessageList conversationId={conversationId} />
//         </div>

//         <div className="p-4 border-t border-gray-200 bg-gray-50">
//           <MessageInput receiverId={conversationId} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SellerMessageThread;
