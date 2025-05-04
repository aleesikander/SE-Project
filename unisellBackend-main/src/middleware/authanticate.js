const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", ""); // Extract token from headers

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); // Replace with your secret
    req.user = decoded; // Set the decoded user information on the request
    console.log("Decoded User:", decoded); // Log decoded user for debugging
    next(); // Call the next middleware
  } catch (error) {
    console.error("Token verification failed:", error);
    res.status(400).json({ message: "Invalid token." });
  }
};

module.exports = authenticateUser;
