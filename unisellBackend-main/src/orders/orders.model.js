const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
    amount: {
      type: Number,
      required: true, // Assuming amount is required for each order
    },
    email: {
      type: String,
      required: false, // Email is optional; ensure you validate it as needed
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "rejected"],
      default: "pending",
    },
    shippingDetails: {
      address: {
        type: String,
        required: true, // Assuming address is required
      },
      city: {
        type: String,
        required: true, // Assuming city is required
      },
      postalCode: {
        type: String,
        required: true, // Assuming postal code is required
      },
      country: {
        type: String,
        required: true, // Assuming country is required
      },
      contactNumber: {
        type: String,
        required: true, // Contact number is required
      },
    },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // Assuming sellerId is required
    },
    buyerId: {
      // Add this field
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // Assuming buyerId is required
    },
    orderUpdates: [
      {
        status: {
          type: String,
          required: true, // Assuming status is required for updates
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
