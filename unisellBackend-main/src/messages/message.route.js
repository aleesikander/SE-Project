const express = require("express");
const {
  sendMessage,
  getMessagesBetweenUsers,
  getConversations,
  markAsRead,
} = require("./message.controller");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

router.post(
  "/",
  verifyToken,
  (req, res, next) => {
    console.log("Received message:", req.body);
    next();
  },
  sendMessage
);
router.get("/conversations", verifyToken, getConversations); // Place this first
router.get("/:userId", verifyToken, getMessagesBetweenUsers);
router.put("/read/:senderId", verifyToken, markAsRead);

module.exports = router;
