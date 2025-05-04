const jwt = require("jsonwebtoken");
const User = require("../users/user.model");

const JWT_SECRET = process.env.JWT_SECRET_KEY;

// Function to generate JWT token
const generateToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role }, // Include user role in token
      JWT_SECRET,
      { expiresIn: "20h" } // Token expiration time
    );

    return token;
  } catch (error) {
    console.error("Error generating token:", error.message);
    throw error; // Re-throw the error for the caller to handle
  }
};

module.exports = generateToken;
