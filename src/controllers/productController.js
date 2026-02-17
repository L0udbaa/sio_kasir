const Product = require("../models/productModel.js");

// GET semua produk
exports.getProducts = async (req, res) => {
  const data = await Product.getAllProducts();
  res.json(data);
};

// POST tambah produk
exports.addProduct = async (req, res) => {
  await Product.createProduct(req.body);
  res.json({ message: "Produk ditambahkan" });
};

// PUT update produk
exports.updateProduct = async (req, res) => {
  await Product.updateProduct(req.params.id, req.body);
  res.json({ message: "Produk diupdate" });
};

// DELETE produk
exports.deleteProduct = async (req, res) => {
  await Product.deleteProduct(req.params.id);
  res.json({ message: "Produk dihapus" });
};
