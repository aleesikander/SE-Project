const express = require("express");
const router = express.Router();
const User = require("./user.model");
const Order = require("../orders/orders.model");
const generateToken = require("../middleware/generateToken");
const verifyToken = require("../middleware/verifyToken");
const verifyAdmin = require("../middleware/verifyAdmin");
require("dotenv").config();

// Register endpoint
router.post("/register", async (req, res) => {
  try {
    const {
      email,
      username,
      password,
      name,
      role,
      sellerType,
      storeName,
      storeDescription,
      contactNumber, // Added contactNumber here
    } = req.body;

    // Check for missing fields
    if (!email || !password || !name || !role || !username || !contactNumber) {
      return res.status(400).send({ message: "All fields are required." });
    }

    // Check if the user already exists by email and username
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res
        .status(400)
        .send({ message: "Email or username already registered." });
    }

    // Ensure sellerType and store details are handled correctly based on role
    if (role === "seller" && sellerType === "business") {
      if (!storeName || !storeDescription) {
        return res.status(400).send({
          message:
            "Store name and description are required for business sellers.",
        });
      }
    }

    const user = new User({
      email,
      username,
      password,
      name,
      role,
      sellerType,
      storeName:
        role === "seller" && sellerType === "business" ? storeName : null,
      storeDescription:
        role === "seller" && sellerType === "business"
          ? storeDescription
          : null,
      contactNumber, // Save contactNumber
    });

    await user.save();
    res.status(201).send({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);

    // Send back a specific error message if it's a validation error
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).send({ message: messages.join(", ") });
    }

    res.status(500).send({ message: "Registration failed" });
  }
});
// Login endpoint
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).send({ message: "Invalid credentials" });
    }

    const token = await generateToken(user._id);

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Adjust based on environment
      sameSite: "None",
    });

    // Respond with user data and token
    res.status(200).send({
      message: "Logged in successfully",
      token,
      user: {
        _id: user._id, // Send the user ID for frontend use
        email: user.email,
        username: user.username,
        role: user.role,
        profileImage: user.profileImage,
        bio: user.bio,
        profession: user.profession,
      },
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).send({ message: "Login failed" });
  }
});

// Logout endpoint (optional)
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).send({ message: "Logged out successfully" });
});

// all users

router.get("/users", async (req, res) => {
  try {
    const users = await User.find({}, "id email role").sort({ createdAt: -1 });
    res.status(200).send(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send({ message: "Failed to fetch users" });
  }
});

// delete a user
router.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).send({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).send({ message: "Failed to delete user" });
  }
});

// update a user role
router.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    const user = await User.findByIdAndUpdate(id, { role }, { new: true });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).send({ message: "User role updated successfully", user });
  } catch (error) {
    console.error("Error updating user role:", error);
    res.status(500).send({ message: "Failed to update user role" });
  }
});

// Edit Profile endpoint
router.patch("/edit-profile", verifyToken, async (req, res) => {
  try {
    // Extract userId from req.userId set by the verifyToken middleware
    const { username, profileImage, bio, profession, contactNumber } = req.body;

    // Check if userId is provided
    if (!req.userId) {
      return res.status(400).send({ message: "User ID is required" });
    }

    // Find user by ID
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Update the user's profile with provided fields only
    if (username !== undefined) user.username = username;
    if (profileImage !== undefined) user.profileImage = profileImage;
    if (bio !== undefined) user.bio = bio;
    if (profession !== undefined) user.profession = profession;
    if (contactNumber !== undefined) user.contactNumber = contactNumber;

    // Save the updated user profile
    await user.save();

    // Send the updated user profile as the response
    res.status(200).send({
      message: "Profile updated successfully",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        profileImage: user.profileImage,
        bio: user.bio,
        profession: user.profession,
        contactNumber: user.contactNumber,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).send({ message: "Profile update failed" });
  }
});
// admin
router.get("/admin/sellers/revenue", async (req, res) => {
  try {
    // Fetch all sellers with their details
    const sellers = await User.find({ role: "seller" }).select(
      "username email storeName contactNumber sellerType"
    );

    const revenueData = await Promise.all(
      sellers.map(async (seller) => {
        // Find confirmed orders for each seller
        const confirmedOrders = await Order.find({
          sellerId: seller._id,
          status: "confirmed",
        });

        // Calculate total revenue from confirmed orders
        const totalRevenue = confirmedOrders.reduce(
          (total, order) => total + order.amount,
          0
        );

        return {
          sellerId: seller._id, // Include seller ID for reference
          username: seller.username, // Populate username
          email: seller.email, // Populate email
          storeName: seller.storeName, // Populate store name
          contactNumber: seller.contactNumber, // Populate contact number
          sellerType: seller.sellerType, // Populate seller type
          totalRevenue, // Total revenue from confirmed orders
        };
      })
    );

    res.status(200).json(revenueData); // Return the revenue data as JSON
  } catch (error) {
    console.error("Error fetching total revenue:", error);
    res.status(500).json({ message: "Failed to fetch total revenue" }); // Return error message as JSON
  }
});
router.get("/admin/users", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;
    const skip = (page - 1) * limit;

    const query = {};
    if (search) {
      query.$or = [
        { email: { $regex: search, $options: "i" } },
        { username: { $regex: search, $options: "i" } },
        { name: { $regex: search, $options: "i" } },
      ];
    }

    const users = await User.find(query)
      .select("-password")
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const totalUsers = await User.countDocuments(query);

    res.status(200).json({
      users,
      total: totalUsers,
      page: parseInt(page),
      pages: Math.ceil(totalUsers / limit),
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

// Deactivate a user
router.put(
  "/admin/users/:id/deactivate",
  verifyToken,
  verifyAdmin,
  async (req, res) => {
    try {
      const { id } = req.params;
      const { reason } = req.body;

      const user = await User.findByIdAndUpdate(
        id,
        {
          active: false,
          deactivatedAt: new Date(),
          deactivationReason: reason,
        },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({
        message: "User deactivated successfully",
        user,
      });
    } catch (error) {
      console.error("Error deactivating user:", error);
      res.status(500).json({ message: "Failed to deactivate user" });
    }
  }
);

// Ban a user
router.put(
  "/admin/users/:id/ban",
  verifyToken,
  verifyAdmin,
  async (req, res) => {
    try {
      const { id } = req.params;
      const { reason } = req.body;

      const user = await User.findByIdAndUpdate(
        id,
        {
          banned: true,
          bannedAt: new Date(),
          banReason: reason,
        },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({
        message: "User banned successfully",
        user,
      });
    } catch (error) {
      console.error("Error banning user:", error);
      res.status(500).json({ message: "Failed to ban user" });
    }
  }
);

// Update user permissions
router.put(
  "/admin/users/:id/permissions",
  verifyToken,
  verifyAdmin,
  async (req, res) => {
    try {
      const { id } = req.params;
      const { permissions } = req.body;

      const user = await User.findByIdAndUpdate(
        id,
        { permissions },
        { new: true }
      ).select("-password");

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({
        message: "User permissions updated successfully",
        user,
      });
    } catch (error) {
      console.error("Error updating permissions:", error);
      res.status(500).json({ message: "Failed to update permissions" });
    }
  }
);

// Get admin statistics
router.get("/admin/stats", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const [
      totalUsers,
      activeUsers,
      bannedUsers,
      totalSellers,
      totalProducts,
      pendingProducts,
    ] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ active: true }),
      User.countDocuments({ banned: true }),
      User.countDocuments({ role: "seller" }),
      Product.countDocuments(),
      Product.countDocuments({ status: "pending" }),
    ]);

    res.status(200).json({
      totalUsers,
      activeUsers,
      bannedUsers,
      totalSellers,
      totalProducts,
      pendingProducts,
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    res.status(500).json({ message: "Failed to fetch admin stats" });
  }
});

// Get flagged users
router.get(
  "/admin/users/flagged",
  verifyToken,
  verifyAdmin,
  async (req, res) => {
    try {
      const users = await User.find({ flags: { $gt: 0 } })
        .sort({ flags: -1 })
        .select("-password")
        .limit(50);

      res.status(200).json(users);
    } catch (error) {
      console.error("Error fetching flagged users:", error);
      res.status(500).json({ message: "Failed to fetch flagged users" });
    }
  }
);

// Get pending product approvals
router.get(
  "/admin/approvals/pending",
  verifyToken,
  verifyAdmin,
  async (req, res) => {
    try {
      const products = await Product.find({ status: "pending" })
        .populate("seller", "username email")
        .populate("category", "name")
        .sort({ createdAt: 1 });

      res.status(200).json(products);
    } catch (error) {
      console.error("Error fetching pending approvals:", error);
      res.status(500).json({ message: "Failed to fetch pending approvals" });
    }
  }
);

// Approve a product
router.put(
  "/admin/products/:id/approve",
  verifyToken,
  verifyAdmin,
  async (req, res) => {
    try {
      const product = await Product.findByIdAndUpdate(
        req.params.id,
        {
          status: "approved",
          approvedAt: new Date(),
          approvedBy: req.userId,
        },
        { new: true }
      );

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.status(200).json({
        message: "Product approved successfully",
        product,
      });
    } catch (error) {
      console.error("Error approving product:", error);
      res.status(500).json({ message: "Failed to approve product" });
    }
  }
);

// Reject a product
router.put(
  "/admin/products/:id/reject",
  verifyToken,
  verifyAdmin,
  async (req, res) => {
    try {
      const { reason } = req.body;

      const product = await Product.findByIdAndUpdate(
        req.params.id,
        {
          status: "rejected",
          rejectedAt: new Date(),
          rejectedBy: req.userId,
          rejectionReason: reason,
        },
        { new: true }
      );

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.status(200).json({
        message: "Product rejected successfully",
        product,
      });
    } catch (error) {
      console.error("Error rejecting product:", error);
      res.status(500).json({ message: "Failed to reject product" });
    }
  }
);

// Get all reports
router.get("/admin/reports", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { status, type } = req.query;
    const query = {};

    if (status) query.status = status;
    if (type) query.type = type;

    const reports = await Report.find(query)
      .populate("reporter", "username email")
      .populate("contentId")
      .sort({ createdAt: -1 });

    res.status(200).json(reports);
  } catch (error) {
    console.error("Error fetching reports:", error);
    res.status(500).json({ message: "Failed to fetch reports" });
  }
});

// Resolve a report
router.put(
  "/admin/reports/:id/resolve",
  verifyToken,
  verifyAdmin,
  async (req, res) => {
    try {
      const { action, reason } = req.body;

      const report = await Report.findByIdAndUpdate(
        req.params.id,
        {
          status: "resolved",
          resolvedAt: new Date(),
          resolvedBy: req.userId,
          actionTaken: action,
          resolutionReason: reason,
        },
        { new: true }
      );

      if (!report) {
        return res.status(404).json({ message: "Report not found" });
      }

      // Take additional action based on the report type
      if (action === "remove") {
        switch (report.type) {
          case "product":
            await Product.findByIdAndUpdate(report.contentId, {
              status: "removed",
            });
            break;
          case "user":
            await User.findByIdAndUpdate(report.contentId, { flags: 0 });
            break;
          // Add other content types as needed
        }
      }

      res.status(200).json({
        message: "Report resolved successfully",
        report,
      });
    } catch (error) {
      console.error("Error resolving report:", error);
      res.status(500).json({ message: "Failed to resolve report" });
    }
  }
);

module.exports = router;
