const express = require("express");
const router = express.Router();
const { signout, signup, signin } = require("../controllers/auth");
const { check } = require("express-validator");

router.post(
  "/signup",
  [
    check("name")
      .isLength({ min: 3 })
      .withMessage("Name should atleast have 3 characters"),
    check("email").isEmail().withMessage("Please emter email in proper format"),
    check("password")
      .isLength({ min: 6 })
      .withMessage("Atleast 6 characters required in password"),
  ],
  signup
);
router.post(
  "/signin",
  [
    check("email").isEmail().withMessage("Please emter email in proper format"),
    check("password")
      .isLength({ min: 6 })
      .withMessage("Atleast 6 characters required in password"),
  ],
  signin
);

router.get("/signout", signout);

module.exports = router;
