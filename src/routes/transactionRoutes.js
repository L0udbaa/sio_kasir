const express = require("express");
const router = express.Router();
const controller = require("../controllers/transactionController");

/**
 * @swagger
 * /api/transactions:
 *   get:
 *     summary: Ambil semua transaksi
 *     tags: [Transactions]
 *     responses:
 *       200:
 *         description: Daftar transaksi berhasil diambil
 */
router.get("/", controller.getAllTransactions);

/**
 * @swagger
 * /api/transactions:
 *   post:
 *     summary: Buat transaksi baru
 *     tags: [Transactions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *               totalPrice:
 *                 type: number
 *     responses:
 *       201:
 *         description: Transaksi berhasil dibuat
 */
router.post("/", controller.createTransaction);

module.exports = router;
