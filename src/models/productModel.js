const db = require("../config/db.js");

// ambil semua produk
exports.getAllProducts = async () => {
  const [rows] = await db.query("SELECT * FROM products ORDER BY id DESC");
  return rows;
};

// tambah produk
exports.createProduct = async (data) => {
  const { name, price, stock, barcode, store_id } = data;
  const sid = store_id || 1;
  const [result] = await db.query(
    "INSERT INTO products (name, price, stock, barcode, store_id) VALUES (?, ?, ?, ?, ?)",
    [name, price, stock, barcode, sid]
  );
  return result;
};

// update produk
exports.updateProduct = async (id, data) => {
  const { name, price, stock, barcode } = data;
  const [result] = await db.query(
    "UPDATE products SET name=?, price=?, stock=?, barcode=? WHERE id=?",
    [name, price, stock, barcode, id]
  );
  return result;
};

// hapus produk
exports.deleteProduct = async (id) => {
  const [result] = await db.query(
    "DELETE FROM products WHERE id=?",
    [id]
  );
  return result;
};
