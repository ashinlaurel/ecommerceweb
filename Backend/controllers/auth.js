const { body, validationResult } = require("express-validator");
const User = require("../models/user");
const expressJwt = require("express-jwt");
const jwt = require("jsonwebtoken");

// SignUp Logic

exports.signup = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  console.log("REQ BODY: ", req.body);
  const user = new User(req.body);
  user.save((error, user) => {
    if (error) {
      return res.status(400).json({
        error: "Not able to save user in database",
      });
    }
    res.json(user);
  });
};

// Login Logic

exports.signin = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  console.log("REQ BODY: ", req.body);
  const { email, password } = req.body;
  //   const user = new User(req.body);
  //   user.authenticate();
  User.findOne({ email }, (error, user) => {
    if (error) {
      return res.status(400).json({
        error: "User does not exist",
      });
    }
    if (!user.authenticate(password)) {
      return res.status(400).json({
        error: "Wrong email or password",
      });
    }
    // Token Creation
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);
    //Putting token in cookie
    res.cookie("token", token, { expire: new Date() + 9999 });
    // Sending response to the front end
    const { _id, name, email, role } = user;
    res.json({ token, user: { _id, name, email, role } });
  });
};

// SignOut Logic

exports.signout = (req, res) => {
  res.send("User Sign Out");
};
