const express = require("express");
const multer = require("multer");
const Products = require("./products.model");
const Reviews = require("../reviews/reviews.model");
const { uploadImage } = require("../utils/uploadImage");
const authenticateUser = require("../middleware/authanticate"); // Ensure this middleware authenticates user
const router = express.Router();
const upload = multer();

// 1. Post a product
const createProduct = async (req, res) => {
  try {
    const { name, category, description, price, image, color, sellerId } =
      req.body;
    const newProduct = new Products({
      name,
      category,
      description,
      price,
      image,
      color,
      sellerId, // Ensure sellerId is from authenticated user
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Failed to create product" });
  }
};
router.post("/create-product", createProduct);

// 2. Update a product (restricted to original seller)
router.patch("/update-product/:id", authenticateUser, async (req, res) => {
  try {
    const productId = req.params.id;
    const userId = req.user.userId; // Assume req.user is populated by authenticateUser

    const product = await Products.findById(productId);
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    // Check if the authenticated user is the product's seller
    if (product.sellerId.toString() !== userId) {
      return res
        .status(403)
        .send({ message: "You do not have permission to edit this product" });
    }

    // Update the product
    const updatedProduct = await Products.findByIdAndUpdate(
      productId,
      { ...req.body },
      { new: true }
    );

    res.status(200).send({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).send({ message: "Failed to update product" });
  }
});

// 3. Delete a product (restricted to original seller)
router.delete("/:id", authenticateUser, async (req, res) => {
  try {
    const productId = req.params.id;
    const userId = req.user.userId; // Ensure req.user is populated by authenticateUser

    const product = await Products.findById(productId);
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    // Check if the authenticated user is the product's seller
    if (product.sellerId.toString() !== userId) {
      return res
        .status(403)
        .send({ message: "You do not have permission to delete this product" });
    }

    // Delete the product and associated comments
    await Products.findByIdAndDelete(productId);
    await Reviews.deleteMany({ productId: productId });

    res.status(200).send({
      message: "Product and associated comments deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).send({ message: "Failed to delete product" });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    console.log("Fetching product with ID:", productId); // Log the product ID

    const product = await Products.findById(productId).populate(
      "sellerId",
      "email username"
    );

    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    const reviews = await Reviews.find({ productId }).populate(
      "userId",
      "username email"
    );

    res.status(200).send({ product, reviews });
  } catch (error) {
    console.error("Error fetching product:", error); // Updated log message
    res.status(500).send({ message: "Failed to fetch product" });
  }
});

// 4. Get all products with filters
router.get("/", async (req, res) => {
  try {
    const {
      category,
      color,
      minPrice,
      maxPrice,
      page = 1,
      limit = 10,
    } = req.query;

    const filter = {};

    if (category && category !== "all") {
      filter.category = category;
    }

    if (color && color !== "all") {
      filter.color = color;
    }

    if (minPrice && maxPrice) {
      const min = parseFloat(minPrice);
      const max = parseFloat(maxPrice);
      if (!isNaN(min) && !isNaN(max)) {
        filter.price = { $gte: min, $lte: max };
      }
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const totalProducts = await Products.countDocuments(filter);
    const totalPages = Math.ceil(totalProducts / parseInt(limit));

    const products = await Products.find(filter)
      .skip(skip)
      .limit(parseInt(limit))
      .populate("sellerId", "email")
      .sort({ createdAt: -1 });

    res.status(200).send({ products, totalPages, totalProducts });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send({ message: "Failed to fetch products" });
  }
});

router.get("/seller/:sellerId", async (req, res) => {
  try {
    const sellerId = req.params.sellerId; // Use 'sellerId' instead of 'id'
    const products = await Products.find({ sellerId })
      .populate("sellerId", "email") // This line assumes that sellerId is a reference
      .sort({ createdAt: -1 });

    res.status(200).send({ products });
  } catch (error) {
    console.error("Error fetching products by seller ID:", error);
    res.status(500).send({ message: "Failed to fetch products by seller ID" });
  }
});

module.exports = router;
