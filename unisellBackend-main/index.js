const express = require("express");
const mongoose = require("mongoose"); // Import mongoose for MongoDB connection
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

// Import routes
const authRoutes = require("./src/users/user.route");
const productRoutes = require("./src/products/products.route");
const orderRoutes = require("./src/orders/orders.route");
const uploadRouter = require("./src/utils/imageRouter");
const reviewRoutes = require("./src/reviews/reviews.router");
const messageRoutes = require("./src/messages/message.route");

// Middleware setup
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb", extended: true }));
app.use(cookieParser());
const corsOptions = {
  origin: process.env.CORS_ORIGIN || "*", // Use environment variable or allow all if not set
  credentials: true,
};

app.use(cors(corsOptions));

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URL, {})
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// API routes
app.get("/", (req, res) => {
  res.send("UniSell Ecommerce Server is Running..!");
});

app.use("/api/auth", authRoutes); // Authentication routes
app.use("/api/products", productRoutes); // Product management routes
app.use("/api/reviews", reviewRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRouter);
app.use("/api/messages", messageRoutes);

// Image upload route

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: "Something went wrong!" });
});

// Start the server
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
