const express = require("express");
const router = express.Router();
const controller = require("../controllers/productController");

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Ambil semua produk
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Daftar produk berhasil diambil
 */
router.get("/", controller.getProducts);

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Tambah produk baru
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Produk berhasil ditambahkan
 */
router.post("/", controller.addProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update produk
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Produk berhasil diupdate
 */
router.put("/:id", controller.updateProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Hapus produk
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Produk berhasil dihapus
 */
router.delete("/:id", controller.deleteProduct);

module.exports = router;
