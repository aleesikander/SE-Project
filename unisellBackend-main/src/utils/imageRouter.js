const express = require("express");
const router = express.Router();

const uploadImage = require("./uploadImage");
router.post("/Image", async (req, res) => {
  try {
    if (!req.body.image) {
      throw new Error("No image provided");
    }

    const url = await uploadImage(req.body.image);
    res.send(url);
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ message: err.message || "Something went wrong!" });
  }
});

module.exports = router;
