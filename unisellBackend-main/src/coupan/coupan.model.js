// const mongoose = require("mongoose");

// const couponSchema = new mongoose.Schema(
//   {
//     code: {
//       type: String,
//       required: [true, "Coupon code is required"],
//       unique: true,
//     },
//     discount: {
//       type: Number,
//       required: [true, "Discount value is required"],
//     },
//     expirationDate: {
//       type: Date,
//       required: [true, "Expiration date is required"],
//     },
//     seller: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User", // Assuming 'User' model is the seller's model
//       required: true,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// const Coupon = mongoose.model("Coupon", couponSchema);

// module.exports = Coupon;
