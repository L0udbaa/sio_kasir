/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               name: Admin
 *               email: admin@mail.com
 *               password: 123456
 *               role: admin
 *     responses:
 *       200:
 *         description: User created
 */
const express = require('express');
const router = express.Router();
const auth = require('../controllers/authController');

router.post('/register', auth.register);


/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               email: admin@mail.com
 *               password: 123456
 *     responses:
 *       200:
 *         description: Login success
 */
router.post('/login', auth.login);

module.exports = router;