const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 1000,
      trim: true,
      unique: true,
    },
    price: {
      type: String,
      required: true,
      maxlength: 32,
      unique: true,
    },
    category: {
      type: ObjectId,
      ref: "Category",
      required: true,
    },
    stock: {
      type: Number,
    },
    sold: {
      type: Number,
      default: 0,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
  },
  { timestamps: true }
);

// userSchema.method = {};

module.exports = mongoose.model("Product", productSchema);
