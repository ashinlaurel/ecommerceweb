const express = require("express");
const router = express.Router();
const {
  getUserById,
  getUser,
  getAllUsers,
  updateUser,
  getUserPurchaseList,
} = require("../controllers/user");
const { isSignedIn, isAdmin, isAuthenticated } = require("../controllers/auth");

// Getting All Users
router.get("/allusers", getAllUsers);
// Single User Routes
router.param("userId", getUserById);
router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);
router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser);
// Order Routes
router.get(
  "user/orders/:userId",
  isSignedIn,
  isAuthenticated,
  getUserPurchaseList
);

module.exports = router;
