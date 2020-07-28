const { body, validationResult } = require("express-validator");
const User = require("../models/user");
const expressJwt = require("express-jwt");
const jwt = require("jsonwebtoken");
const { token } = require("morgan");

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
    if (error || !user) {
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
  res.clearCookie("token");
  res.json({
    message: "User SignOut",
  });
};

//Middleware using express Jwt for cookie checking
exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  userProperty: "auth",
  algorithms: ["HS256"],
});

// Other Custom Middlewares

exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!checker) {
    return res.status(403).json({
      error: "Not Authenticated",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "Not Admin",
    });
  }
  next();
};
