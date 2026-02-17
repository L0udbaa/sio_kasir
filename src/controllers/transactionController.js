const Transaction = require("../models/transactionModel");
const db = require("../config/db");

exports.getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.getAllTransactions();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createTransaction = async (req, res) => {
  try {
    const { items, payment_method } = req.body;

    let total = 0;

    // hitung total
    items.forEach(item => {
      total += item.qty * item.price;
    });

    // simpan transaksi utama
    const transactionId = await Transaction.createTransaction(
      total,
      payment_method
    );

    // simpan item
    for (const item of items) {
      await Transaction.addTransactionItem({
        transaction_id: transactionId,
        product_id: item.product_id,
        qty: item.qty,
        price: item.price,
        subtotal: item.qty * item.price,
      });
    }

    res.json({
      message: "Transaksi berhasil",
      transaction_id: transactionId,
      total: total
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
