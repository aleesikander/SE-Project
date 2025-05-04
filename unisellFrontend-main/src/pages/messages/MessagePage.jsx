import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchMessages } from "../../redux/features/messages/messagesSlice";
import { selectAuthToken } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { Loader2, ArrowLeft } from "lucide-react";
import Navbar from "../../components/Navbar";
import MessageList from "../../components/MessageList";
import MessageInput from "../../components/MessageInput";

const MessagePage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector(selectAuthToken);
  const currentUser = useSelector((state) => state.auth.user);
  const { status, error } = useSelector((state) => state.messages);

  useEffect(() => {
    if (!token) {
      toast.info("Please login to continue");
      navigate("/login", { state: { from: `/messages/${userId}` } });
      return;
    }

    if (!userId || !/^[0-9a-fA-F]{24}$/.test(userId)) {
      toast.error("Invalid user ID format");
      navigate("/");
      return;
    }

    if (currentUser?._id === userId) {
      toast.warning("You can't message yourself!");
      navigate("/");
      return;
    }

    dispatch(fetchMessages(userId));
  }, [dispatch, userId, token, navigate, currentUser]);

  if (status === "loading") {
    return (
      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <div className="text-center p-6 bg-red-50 rounded-lg max-w-md w-full">
            <h2 className="text-xl font-semibold text-red-600 mb-2">
              Chat Unavailable
            </h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={() => navigate(-1)}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mx-auto"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <main className="flex-1 container mx-auto p-4 flex flex-col">
        <div className="flex items-center mb-4">
          <button
            onClick={() => navigate(-1)}
            className="mr-2 p-2 rounded-full hover:bg-gray-100"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-semibold">Messages</h1>
        </div>
        <div className="flex-1 border rounded-lg overflow-hidden bg-white flex flex-col">
          <MessageList userId={userId} />
          <MessageInput receiverId={userId} />
        </div>
      </main>
    </div>
  );
};

export default MessagePage;
