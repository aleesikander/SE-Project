const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
    profileImage: {
      type: String, // URL or path to the profile picture
      default: "",
    },
    contactNumber: {
      type: String,
      required: true, // Changed type to String for contactNumber
    },
    totalRevenue: {
      type: Number,
      default: 0, // Initialize to 0
    },
    cartItems: [
      {
        quantity: {
          type: Number,
          default: 1,
        },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
      },
    ],
    role: {
      type: String,
      enum: ["user", "seller", "admin"],
      default: "user",
    },
    username: {
      type: String,
      unique: true,
      sparse: true, // Allows nulls while keeping the index
    },
    // Seller specific fields
    sellerType: {
      type: String,
      enum: ["individual", "business"],
      required: function () {
        return this.role === "seller"; // Required if user is a seller
      },
    },
    storeName: {
      type: String,
      trim: true,
      default: null,
      required: function () {
        return this.sellerType === "business"; // Required if sellerType is business
      },
    },
    storeDescription: {
      type: String, // Description of the store for sellers
      trim: true,
      default: null,
      required: function () {
        return this.sellerType === "business"; // Required if sellerType is business
      },
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to hash password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
