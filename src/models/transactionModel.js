const db = require("../config/db");

// ambil semua transaksi
exports.getAllTransactions = async () => {
  const [rows] = await db.query(
    "SELECT * FROM transactions ORDER BY id DESC"
  );
  return rows;
};

// buat transaksi
exports.createTransaction = async (total, payment_method) => {
  // isi store_id dan user_id dengan 1 untuk environment testing lokal
  // set transaction_date ke NOW() dan total_amount sama dengan total
  const [result] = await db.query(
    "INSERT INTO transactions (total, store_id, user_id, transaction_date, total_amount, payment_method) VALUES (?, ?, ?, NOW(), ?, ?)",
    [total, 1, 1, total, payment_method]
  );
  return result.insertId;
};

// simpan item transaksi
exports.addTransactionItem = async (item) => {
  const { transaction_id, product_id, qty, price, subtotal } = item;

  await db.query(
    `INSERT INTO transaction_items 
     (transaction_id, product_id, qty, price, subtotal)
     VALUES (?, ?, ?, ?, ?)`,
    [transaction_id, product_id, qty, price, subtotal]
  );

  // kurangi stok produk
  await db.query(
    "UPDATE products SET stock = stock - ? WHERE id = ?",
    [qty, product_id]
  );
};
