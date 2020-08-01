const express = require("express");
const { getUserById } = require("../controllers/user");
const {
  getCategoryById,
  createCategory,
  getAllCategory,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/category");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const router = express.Router();

// Getting All Categories
// router.get("/allusers", getAllUsers);
// Handling the parameters passed
router.param("userId", getUserById);
router.param("categoryId", getCategoryById);
// create category
router.post(
  "/category/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createCategory
);
// Get Routes
router.get("/category/:categoryId", getCategory);
router.get("/allcategories", getAllCategory);
// Update Route
router.put(
  "/category/:categoryId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateCategory
);
// Delete Route
router.delete("/category/:categoryId/:userId", deleteCategory);
module.exports = router;
