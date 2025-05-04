// const express = require("express");
// const router = express.Router();
// const User = require("./user.model");

// // Add item to cart
// router.post("/cart/add", async (req, res) => {
//   const { userId, productId, quantity } = req.body;

//   try {
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).send({ message: "User not found" });
//     }

//     // Check if the item already exists in the cart
//     const itemIndex = user.cartItems.findIndex(
//       (item) => item.product.toString() === productId
//     );

//     if (itemIndex > -1) {
//       // Update the quantity if the item exists
//       user.cartItems[itemIndex].quantity += quantity;
//     } else {
//       // Add new item to the cart
//       user.cartItems.push({ product: productId, quantity });
//     }

//     await user.save();
//     res
//       .status(200)
//       .send({ message: "Item added to cart", cartItems: user.cartItems });
//   } catch (error) {
//     console.error("Error adding item to cart:", error);
//     res.status(500).send({ message: "Failed to add item to cart" });
//   }
// });

// // Remove item from cart
// router.delete("/cart/remove", async (req, res) => {
//   const { userId, productId } = req.body;

//   try {
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).send({ message: "User not found" });
//     }

//     user.cartItems = user.cartItems.filter(
//       (item) => item.product.toString() !== productId
//     );
//     await user.save();
//     res
//       .status(200)
//       .send({ message: "Item removed from cart", cartItems: user.cartItems });
//   } catch (error) {
//     console.error("Error removing item from cart:", error);
//     res.status(500).send({ message: "Failed to remove item from cart" });
//   }
// });

// // Update item quantity in cart
// router.put("/cart/update", async (req, res) => {
//   const { userId, productId, quantity } = req.body;

//   try {
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).send({ message: "User not found" });
//     }

//     const itemIndex = user.cartItems.findIndex(
//       (item) => item.product.toString() === productId
//     );
//     if (itemIndex > -1) {
//       user.cartItems[itemIndex].quantity = quantity;
//       await user.save();
//       res
//         .status(200)
//         .send({ message: "Cart item updated", cartItems: user.cartItems });
//     } else {
//       res.status(404).send({ message: "Item not found in cart" });
//     }
//   } catch (error) {
//     console.error("Error updating cart item:", error);
//     res.status(500).send({ message: "Failed to update cart item" });
//   }
// });

// // Fetch cart items
// router.get("/cart/:userId", async (req, res) => {
//   const { userId } = req.params;

//   try {
//     const user = await User.findById(userId).populate("cartItems.product");
//     if (!user) {
//       return res.status(404).send({ message: "User not found" });
//     }

//     res.status(200).send({ cartItems: user.cartItems });
//   } catch (error) {
//     console.error("Error fetching cart items:", error);
//     res.status(500).send({ message: "Failed to fetch cart items" });
//   }
// });

// module.exports = router;
