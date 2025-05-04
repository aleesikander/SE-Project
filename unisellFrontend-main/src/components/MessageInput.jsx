// MessageInput.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../redux/features/messages/messagesSlice";
import { PaperPlaneRight } from "phosphor-react";

const MessageInput = ({ receiverId }) => {
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.messages);
  const { user } = useSelector((state) => state.auth);

  const handleSend = async (e) => {
    e.preventDefault();

    // Additional validation
    if (
      !message.trim() ||
      !receiverId ||
      sending ||
      !user?.role ||
      !/^[0-9a-fA-F]{24}$/.test(receiverId)
    )
      return;

    setSending(true);
    try {
      await dispatch(
        sendMessage({
          receiverId: String(receiverId), // Ensure string type
          content: message,
          senderType: user.role,
        })
      ).unwrap();
      setMessage("");
    } catch (error) {
      console.error("Send message failed:", error);
      toast.error("Failed to send message");
    } finally {
      setSending(false);
    }
  };
  // Calculate disabled state separately for clarity
  const isDisabled =
    !message.trim() || status === "loading" || sending || !receiverId;

  return (
    <form onSubmit={handleSend} className="flex gap-2">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={status === "loading" || sending}
      />
      <button
        type="submit"
        disabled={isDisabled}
        className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors"
      >
        <PaperPlaneRight size={20} />
      </button>
    </form>
  );
};

export default MessageInput;
