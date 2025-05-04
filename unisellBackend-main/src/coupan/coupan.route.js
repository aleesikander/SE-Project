// // coupon.routes.js
// const express = require("express");
// const router = express.Router();
// const Coupon = require("./coupan.model");

// // Create coupon
// router.post("/coupons", async (req, res) => {
//   const { code, discount, expirationDate, sellerId } = req.body;

//   try {
//     const coupon = new Coupon({
//       code,
//       discount,
//       expirationDate,
//       seller: sellerId,
//     });

//     await coupon.save();
//     res.status(201).send({ message: "Coupon created successfully", coupon });
//   } catch (error) {
//     console.error("Error creating coupon:", error);
//     res.status(500).send({ message: "Failed to create coupon" });
//   }
// });

// // Fetch coupons by seller
// router.get("/coupons/:sellerId", async (req, res) => {
//   const { sellerId } = req.params;

//   try {
//     const coupons = await Coupon.find({ seller: sellerId });
//     res.status(200).send({ coupons });
//   } catch (error) {
//     console.error("Error fetching coupons:", error);
//     res.status(500).send({ message: "Failed to fetch coupons" });
//   }
// });

// // Update coupon
// router.put("/coupons/:id", async (req, res) => {
//   const { id } = req.params;
//   const { code, discount, expirationDate } = req.body;

//   try {
//     const coupon = await Coupon.findByIdAndUpdate(
//       id,
//       {
//         code,
//         discount,
//         expirationDate,
//       },
//       { new: true }
//     );

//     if (!coupon) {
//       return res.status(404).send({ message: "Coupon not found" });
//     }

//     res.status(200).send({ message: "Coupon updated successfully", coupon });
//   } catch (error) {
//     console.error("Error updating coupon:", error);
//     res.status(500).send({ message: "Failed to update coupon" });
//   }
// });

// // Delete coupon
// router.delete("/coupons/:id", async (req, res) => {
//   const { id } = req.params;

//   try {
//     const coupon = await Coupon.findByIdAndDelete(id);
//     if (!coupon) {
//       return res.status(404).send({ message: "Coupon not found" });
//     }
//     res.status(200).send({ message: "Coupon deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting coupon:", error);
//     res.status(500).send({ message: "Failed to delete coupon" });
//   }
// });

// module.exports = router;
