const User = require("../models/user");
const { divide } = require("lodash");
const Order = require("../models/order");

// Getting User By ID
exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "No user found!",
      });
    }
    req.profile = user;
    next();
  });
};

//
exports.getUser = (req, res) => {
  req.profile.salt = undefined;
  req.profile.encry_password = undefined;

  return res.json(req.profile);
};

exports.getAllUsers = (req, res) => {
  User.find().exec((err, docs) => {
    if (err || !docs) {
      return res.status(400).json({
        error: "No user found!",
      });
    }
    docs.map((doc) => {
      doc.salt = undefined;
      doc.encry_password = undefined;
    });
    return res.json(docs);
  });
};

exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true, useFindAndModify: false }
  ).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "No user found!",
      });
    }

    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
    return res.json(user);
  });
};

exports.getUserPurchaseList = (req, res) => {
  Order.find({ user: req.profile._id })
    .populate("user", "_id name")
    .exec((err, orders) => {
      if (err || !orders) {
        return res.json({
          error: "No order for the user!",
        });
      }
      return res.json(orders);
    });
};

// TODO got to finish up these purchase middleware for purchase lists
exports.pushOrderInPurchaseList = (req, res, next) => {
  let purchases = [];
  req.body.order.products.forEach((product) => {
    purchases.push({});
  });
  next();
};
