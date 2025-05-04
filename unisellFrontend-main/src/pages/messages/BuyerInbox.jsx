// import React, { useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { MessageCircle } from "lucide-react";
// import { useSelector, useDispatch } from "react-redux";
// import { fetchConversations } from "../../redux/features/messages/messagesSlice";
// import EmptyState from "../../components/EmptyState";

// const BuyerInbox = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const {
//     conversations = [],
//     status,
//     error,
//   } = useSelector((state) => state.messages);
//   const { isLoggedIn, isLoading: isAuthLoading } = useSelector(
//     (state) => state.auth
//   );

//   useEffect(() => {
//     if (!isAuthLoading && !isLoggedIn) {
//       navigate("/login", { state: { from: "/messages" } });
//       return;
//     }

//     dispatch(fetchConversations());
//   }, [dispatch, isLoggedIn, isAuthLoading, navigate]);

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
//         Error loading conversations: {error}
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-4 sm:p-6">
//       <div className="flex items-center justify-between mb-8">
//         <h1 className="text-2xl font-bold flex items-center gap-3">
//           <MessageCircle className="text-blue-500" size={24} />
//           My Messages
//         </h1>
//       </div>

//       <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//         {conversations.length === 0 ? (
//           <EmptyState
//             icon={<MessageCircle size={48} className="text-gray-400" />}
//             title="No messages yet"
//             description="Your conversations will appear here"
//           />
//         ) : (
//           <ul className="divide-y divide-gray-200">
//             {conversations.map((conversation) => {
//               const participant = conversation.user || conversation.seller;

//               return (
//                 <li key={conversation._id}>
//                   <Link
//                     to={{
//                       pathname: `/messages/${conversation._id}`,
//                       state: {
//                         participantName: participant?.name || "Unknown User",
//                         participantAvatar: participant?.avatar,
//                       },
//                     }}
//                     className="block hover:bg-gray-50 transition-colors p-4"
//                   >
//                     <div className="flex items-center gap-4">
//                       <img
//                         src={participant?.avatar || "/default-avatar.png"}
//                         alt="Avatar"
//                         className="w-10 h-10 rounded-full"
//                       />
//                       <div>
//                         <p className="font-medium">{participant?.name}</p>
//                         <p className="text-sm text-gray-500">
//                           {conversation.lastMessage || "No messages yet"}
//                         </p>
//                       </div>
//                     </div>
//                   </Link>
//                 </li>
//               );
//             })}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BuyerInbox;
