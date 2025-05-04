import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMessages } from "@/redux/features/messages/messagesSlice";
import { useParams } from "react-router-dom";
import MessageList from "@/components/MessageList";
import MessageInput from "@/components/MessageInput";

const UserMessages = () => {
  const dispatch = useDispatch();
  const { sellerId } = useParams();
  const { messages, status } = useSelector((state) => state.messages);

  useEffect(() => {
    if (sellerId) {
      dispatch(fetchMessages(sellerId));
    }
  }, [dispatch, sellerId]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-2">Chat with Seller</h2>
      <div className="h-[60vh] overflow-y-auto border p-2 rounded mb-2 bg-gray-100">
        {status === "loading" ? (
          <p>Loading messages...</p>
        ) : (
          <MessageList messages={messages} />
        )}
      </div>
      <MessageInput receiverId={sellerId} />
    </div>
  );
};

export default UserMessages;
