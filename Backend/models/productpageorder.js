const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const Schema = mongoose.Schema;

const productpageorderSchema = new Schema(
  {
    product: {
      type: ObjectId,
      ref: "Product",
    },
    name: String,
    count: Number,
    price: Number,
  },
  { timestamps: true }
);

// userSchema.method = {};

module.exports = mongoose.model("ProductPageOrder", productpageorderSchema);
