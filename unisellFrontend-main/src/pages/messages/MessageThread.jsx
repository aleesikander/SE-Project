import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchMessages,
  markMessagesAsRead,
} from "../../redux/features/messages/messagesSlice";
import MessageList from "../../components/MessageList";
import MessageInput from "../../components/MessageInput";

const MessageThread = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    user,
    isLoggedIn,
    isLoading: isAuthLoading,
  } = useSelector((state) => state.auth);
  const { messages, otherUser, status, error } = useSelector(
    (state) => state.messages
  );

  useEffect(() => {
    if (!isAuthLoading && userId) {
      // Validate userId format
      if (!/^[0-9a-fA-F]{24}$/.test(userId)) {
        toast.error("Invalid conversation ID");
        navigate("/messages");
        return;
      }

      dispatch(fetchMessages(userId));
      dispatch(markMessagesAsRead(userId));
    }
  }, [userId, dispatch, isAuthLoading]);

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="mr-3 p-2 rounded-full hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-semibold text-gray-900">
          Conversation with {otherUser?.name || "Seller"}
        </h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {otherUser && (
          <div className="p-4 border-b border-gray-200 bg-gray-50 flex items-center">
            <img
              src={otherUser.profilePhoto || "/default-avatar.png"}
              className="h-10 w-10 rounded-full mr-3"
              alt={otherUser.name}
            />
            <div>
              <h3 className="font-medium text-gray-900">{otherUser.name}</h3>
              <p className="text-sm text-gray-500">{otherUser.email}</p>
            </div>
          </div>
        )}

        <div className="h-[calc(100vh-320px)] min-h-[400px] overflow-y-auto">
          <MessageList />
        </div>

        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <MessageInput receiverId={userId} />
        </div>
      </div>
    </div>
  );
};

export default MessageThread;
