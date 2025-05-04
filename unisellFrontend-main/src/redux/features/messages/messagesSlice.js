import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../api";

export const fetchConversations = createAsyncThunk(
  "messages/fetchConversations",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/messages/conversations");
      return response.data.conversations;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchMessages = createAsyncThunk(
  "messages/fetchMessages",
  async (userId, { rejectWithValue }) => {
    try {
      // Ensure userId is a string
      const validUserId = String(userId);
      const response = await api.get(`/messages/${validUserId}`);
      return {
        messages: response.data.messages,
        otherUser:
          response.data.messages[0]?.sender === validUserId
            ? response.data.messages[0]?.senderInfo
            : response.data.messages[0]?.receiverInfo,
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const sendMessage = createAsyncThunk(
  "messages/sendMessage",
  async ({ receiverId, content }, { rejectWithValue }) => {
    try {
      const response = await api.post("/messages", { receiverId, content });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const markMessagesAsRead = createAsyncThunk(
  "messages/markAsRead",
  async (userId, { rejectWithValue }) => {
    try {
      // Ensure userId is a string
      const validUserId = String(userId);
      await api.put(`/messages/read/${validUserId}`);
      return { userId: validUserId };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const initialState = {
  conversations: [],
  messages: [],
  otherUser: null,
  status: "idle",
  error: null,
  lastUpdated: null,
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    resetMessages: () => initialState,
    addTempMessage: (state, action) => {
      state.messages.push({
        ...action.payload,
        _id: `temp-${Date.now()}`,
        createdAt: new Date().toISOString(),
        status: "sending",
      });
    },
    updateMessageStatus: (state, action) => {
      const message = state.messages.find(
        (m) => m._id === action.payload.tempId
      );
      if (message) message.status = action.payload.status;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchConversations.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchConversations.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.conversations = action.payload;
      })
      .addCase(fetchConversations.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchMessages.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.messages = action.payload.messages;
        state.otherUser = action.payload.otherUser;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(sendMessage.pending, (state, action) => {
        state.messages.push({
          ...action.meta.arg,
          _id: `temp-${Date.now()}`,
          createdAt: new Date().toISOString(),
          status: "sending",
        });
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        const index = state.messages.findIndex(
          (m) => m.status === "sending" && m.content === action.payload.content
        );
        if (index !== -1) {
          state.messages[index] = action.payload;
        }
      })
      .addCase(sendMessage.rejected, (state, action) => {
        const index = state.messages.findIndex(
          (m) => m.status === "sending" && m.content === action.meta.arg.content
        );
        if (index !== -1) {
          state.messages[index].status = "failed";
        }
      })
      .addCase(markMessagesAsRead.fulfilled, (state, action) => {
        const conversation = state.conversations.find(
          (c) => c.user._id === action.payload.userId
        );
        if (conversation) conversation.unreadCount = 0;
      });
  },
});

export const { resetMessages, addTempMessage, updateMessageStatus } =
  messagesSlice.actions;
export default messagesSlice.reducer;
