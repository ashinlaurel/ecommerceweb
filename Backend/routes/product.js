const express = require("express");
const { getUserById } = require("../controllers/user");
const { createProduct, getProductById } = require("../controllers/product");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const router = express.Router();

// params route handling
router.param("userId", getUserById);
router.param("productId", getProductById);
// Routes
router.post(
  "/product/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createProduct
);
module.exports = router;
