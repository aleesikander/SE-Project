const express = require("express");
const Order = require("./orders.model");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const authenticateUser = require("../middleware/authanticate");
const Products = require("../products/products.model");

// Place an Order
router.post("/place-order", verifyToken, async (req, res) => {
  const { products, amount, shippingDetails, contactNumber } = req.body;

  try {
    // Ensure that the userId is set correctly from the middleware

    const buyerId = req.userId;
    console.log("Buyer ID:", buyerId);

    // Check if buyerId is available
    if (!buyerId) {
      return res.status(400).json({ message: "Buyer ID is required" });
    }

    // Create an array to hold seller IDs for the order
    const sellerIds = new Set();

    // Fetch the seller IDs for each product in the order
    for (const product of products) {
      const productDetails = await Products.findById(product.productId);
      if (productDetails) {
        sellerIds.add(productDetails.sellerId);
      } else {
        return res.status(400).json({ message: "Product not found" });
      }
    }

    // Create the order
    const order = new Order({
      products,
      amount,
      shippingDetails: {
        ...shippingDetails,
        contactNumber,
      },
      buyerId, // This should now correctly reference the userId
      sellerId: Array.from(sellerIds), // Save seller IDs as an array
      status: "pending",
    });

    await order.save();
    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: "Failed to place order", error });
  }
});
router.get("/my-orders", authenticateUser, async (req, res) => {
  try {
    const buyerId = req.user.userId; // Get the logged-in user's ID from the decoded token
    console.log("Buyer ID:", buyerId); // Log the buyer ID to see if it's defined

    // Check if buyerId is defined
    if (!buyerId) {
      return res.status(401).json({ message: "Buyer ID not found." });
    }

    const orders = await Order.find({ buyerId }) // Fetch orders for the logged-in user
      .populate({
        path: "products.productId", // Populate product details
        select: "name", // Fields to return from the populated documents
      });

    console.log("Orders found:", orders); // Log the fetched orders

    const totalOrders = orders.length; // Count total orders for the user
    console.log("Total Orders Count:", totalOrders); // Log total orders count

    res.status(200).json({
      orders,
      totalOrders,
      totalPages: 1, // Set totalPages to 1 since we're not paginating
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Error fetching orders", error });
  }
});

// Update order status

router.get("/seller/:sellerId", async (req, res) => {
  try {
    const { sellerId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const orders = await Order.find({ sellerId })
      .populate({
        path: "products.productId", // Populate product details
        select: "name", // Fields to return from the populated documents
      })
      .limit(limit)
      .skip((page - 1) * limit);

    const totalOrders = await Order.countDocuments({ sellerId });

    // Map orders to include customer email along with product details
    const formattedOrders = orders.map((order) => ({
      ...order._doc,
      contactNumber: order.shippingDetails.contactNumber,
    }));

    res.status(200).json({
      orders: formattedOrders,
      totalOrders,
      totalPages: Math.ceil(totalOrders / limit),
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error });
  }
});

router.patch("/update-status/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status }, // Update only the status field
      { new: true, runValidators: false } // Avoid validation on other fields
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error("Error updating order status:", error); // Log the error for debugging
    res.status(500).json({
      message: "Error updating order status",
      error: error.message, // Return the error message to help with debugging
    });
  }
});

module.exports = router;
