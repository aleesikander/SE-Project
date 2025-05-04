const mongoose = require("mongoose");
const Message = require("./message.model");

const sendMessage = async (req, res) => {
  try {
    const { receiverId, content } = req.body;
    const senderId = req.userId;

    // Validate receiverId format
    if (!mongoose.Types.ObjectId.isValid(receiverId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid receiver ID format",
      });
    }

    const message = new Message({
      sender: senderId,
      receiver: receiverId,
      content,
    });

    await message.save();

    res.status(201).json({
      success: true,
      data: message,
    });
  } catch (err) {
    console.error("Message save error:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get messages between current user and another user
const getMessagesBetweenUsers = async (req, res) => {
  try {
    const currentUserId = req.userId;
    const otherUserId = req.params.userId;

    if (!mongoose.Types.ObjectId.isValid(otherUserId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID format",
      });
    }

    const messages = await Message.find({
      $or: [
        { sender: currentUserId, receiver: otherUserId },
        { sender: otherUserId, receiver: currentUserId },
      ],
    })
      .sort({ createdAt: 1 })
      .lean();

    res.status(200).json({
      success: true,
      messages,
      count: messages.length,
    });
  } catch (err) {
    console.error("Error retrieving messages:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};

// Get all conversations for the current user
const getConversations = async (req, res) => {
  try {
    const userId = req.userId;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID format",
      });
    }

    const conversations = await Message.aggregate([
      {
        $match: {
          $or: [
            { sender: new mongoose.Types.ObjectId(userId) },
            { receiver: new mongoose.Types.ObjectId(userId) },
          ],
        },
      },
      { $sort: { createdAt: -1 } },
      {
        $group: {
          _id: {
            $cond: [
              { $eq: ["$sender", new mongoose.Types.ObjectId(userId)] },
              "$receiver",
              "$sender",
            ],
          },
          lastMessage: { $first: "$$ROOT" },
        },
      },
      {
        $lookup: {
          from: "users", // make sure this matches your User collection name
          localField: "_id",
          foreignField: "_id",
          as: "userInfo",
        },
      },
      { $unwind: "$userInfo" },
      {
        $project: {
          content: "$lastMessage.content",
          createdAt: "$lastMessage.createdAt",
          isRead: "$lastMessage.isRead",
          sender: "$lastMessage.sender",
          receiver: "$lastMessage.receiver",
          user: {
            _id: "$userInfo._id",
            name: "$userInfo.name",
            profilePhoto: "$userInfo.profilePhoto",
          },
        },
      },
      { $sort: { createdAt: -1 } },
    ]);

    res.status(200).json({
      success: true,
      conversations,
    });
  } catch (err) {
    console.error("Error getting conversations:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Mark messages as read
const markAsRead = async (req, res) => {
  try {
    const userId = req.userId;
    const conversationId = req.params.conversationId;

    // Validate conversation ID format
    if (!mongoose.Types.ObjectId.isValid(conversationId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid conversation ID format",
      });
    }

    await Message.updateMany(
      {
        conversation: conversationId,
        receiver: userId,
        isRead: false,
      },
      { $set: { isRead: true } }
    );

    res.status(200).json({
      success: true,
      message: "Messages marked as read",
    });
  } catch (err) {
    console.error("Error marking messages as read:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  sendMessage,
  getMessagesBetweenUsers,
  getConversations,
  markAsRead,
};
