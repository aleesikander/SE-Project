import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MessageList = ({ conversationId }) => {
  const navigate = useNavigate();
  const {
    messages = [],
    status,
    error,
  } = useSelector((state) => state.messages);
  const {
    user: currentUser,
    isLoggedIn,
    isLoading: isAuthLoading,
  } = useSelector((state) => state.auth);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!isAuthLoading && !isLoggedIn) {
      navigate("/login", { state: { from: window.location.pathname } });
      return;
    }

    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoggedIn, isAuthLoading, navigate]);

  if (isAuthLoading || status === "loading") {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-500 text-center">
        Error loading messages: {error}
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-2">
        <p className="text-gray-500">Authentication required</p>
      </div>
    );
  }

  if (!messages || messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-2">
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </div>
        <p className="text-gray-500">
          No messages yet. Start the conversation!
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((message) => {
          const isCurrentUser =
            currentUser && message.sender === currentUser._id;
          return (
            <div
              key={message._id}
              className={`flex ${
                isCurrentUser ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  isCurrentUser
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-gray-100 text-gray-800 rounded-bl-none"
                }`}
              >
                <p className="text-sm break-words">{message.content}</p>
                <p className="text-xs mt-1 opacity-75 text-right">
                  {new Date(message.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default MessageList;
