const Product = require("../models/productModel.js");

// GET semua produk
exports.getProducts = async (req, res) => {
  try {
    const data = await Product.getAllProducts();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST tambah produk
exports.addProduct = async (req, res) => {
  try {
    const result = await Product.createProduct(req.body);
    res.status(201).json({ message: "Produk ditambahkan", id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT update produk
exports.updateProduct = async (req, res) => {
  try {
    const result = await Product.updateProduct(req.params.id, req.body);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Produk tidak ditemukan" });
    }
    res.status(200).json({ message: "Produk diupdate" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE produk
exports.deleteProduct = async (req, res) => {
  try {
    const result = await Product.deleteProduct(req.params.id);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Produk tidak ditemukan" });
    }
    res.status(200).json({ message: "Produk dihapus" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
