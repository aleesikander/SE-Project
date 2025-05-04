// middleware/notification.middleware.js
const nodemailer = require("nodemailer");

// Set up transporter using environment variables
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const notificationMiddleware = async (req, res, next) => {
  const { notificationType, userEmail, message } = req.body;

  if (!userEmail || !notificationType) {
    return res
      .status(400)
      .json({ error: "Notification type and user email are required" });
  }

  try {
    switch (notificationType) {
      case "orderStatusChange":
        await sendEmailNotification(userEmail, message);
        break;
      // Add cases for other notification types here
      default:
        console.log("Unknown notification type");
    }

    next(); // Continue to the next middleware or route handler
  } catch (error) {
    console.error("Error sending notification:", error);
    res.status(500).json({ error: "Failed to send notification" });
  }
};

// Helper function to send the email
const sendEmailNotification = async (to, message) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: "Notification from University Student Market Platform",
    text: message,
  };

  await transporter.sendMail(mailOptions);
  console.log("Notification email sent to:", to);
};

module.exports = notificationMiddleware;
