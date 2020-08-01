const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

// Params Extractor------------------------------------------------------

exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
    .populate("category")
    .exec((err, product) => {
      if (err || !product) {
        return res.status(400).json({
          error: "No product found",
        });
      }
      req.product = product;
      next();
    });
};
exports.createProduct = (req, res) => {
  const form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "The file cannot be uploaded!",
      });
    }
    // res.json({ fields, files });
    const { name, description, price, category, stock } = fields;
    // TODO: Restrictions on fields
    if (!name || !description || !price || !category || !stock) {
      return res.status(400).json({
        error: "Fill in all the fields",
      });
    }
    let product = new Product(fields);

    // Handling the file
    if (file.photo.size > 3145728) {
      return res.status(400).json({
        error: "The file you have uploaded is greater than 3 mb",
      });
    }
    product.photo.data = fs.readFileSync(file.photo.path);
    product.photo.contentType = file.photo.type;

    // saving to DB
    product.save((err, product) => {
      if (err || !product) {
        return res.status(400).json({
          error: "Product not saved!",
        });
      }
      return res.json(product);
    });
  });
};
