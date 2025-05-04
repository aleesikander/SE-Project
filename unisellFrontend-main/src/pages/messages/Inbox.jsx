import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { fetchConversations } from "../../redux/features/messages/messagesSlice";
import EmptyState from "../../components/EmptyState";

const Inbox = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    conversations = [],
    status,
    error,
  } = useSelector((state) => state.messages);
  const {
    isLoggedIn,
    isLoading: isAuthLoading,
    user,
  } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthLoading && !isLoggedIn) {
      navigate("/login", { state: { from: "/messages" } });
      return;
    }

    dispatch(fetchConversations(user.role));
  }, [dispatch, isLoggedIn, isAuthLoading, navigate, user]);

  // Loading and error states...

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold flex items-center gap-3">
          <MessageCircle className="text-blue-500" size={24} />
          My Messages
        </h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {conversations.length === 0 ? (
          <EmptyState
            icon={<MessageCircle size={48} className="text-gray-400" />}
            title="No messages yet"
            description="Your conversations will appear here"
          />
        ) : (
          <ul className="divide-y divide-gray-200">
            {conversations.map((conversation) => (
              <ConversationItem
                key={conversation._id}
                conversation={conversation}
                currentUserRole={user.role}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

const ConversationItem = ({ conversation, currentUserRole }) => {
  const getParticipant = () => {
    if (currentUserRole === "seller") return conversation.buyer;
    if (currentUserRole === "user") return conversation.seller;
    return conversation.participants?.find((p) => p._id !== currentUser._id);
  };

  const participant = getParticipant();

  return (
    <li>
      <Link
        to={`/messages/${conversation._id}`}
        state={{ participant }}
        className="block hover:bg-gray-50 transition-colors p-4"
      >
        <div className="flex items-center gap-4">
          <img
            src={participant?.avatar || "/default-avatar.png"}
            alt="Avatar"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-medium">{participant?.name}</p>
            <p className="text-sm text-gray-500">
              {conversation.lastMessage || "No messages yet"}
            </p>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default Inbox;
