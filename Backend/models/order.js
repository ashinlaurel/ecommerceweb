const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    products: [ProductCartSchema],
    transaction_id: {},
    amount: {
      type: Number,
    },
    address: String,
    updated: Date,
    user: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

// userSchema.method = {};

module.exports = mongoose.model("Order", orderSchema);
