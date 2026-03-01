/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register user
 *     tags: [Auth]
 *     security: []          # public endpoint
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role_id:
 *                 type: integer
 *               store_id:
 *                 type: integer
 *             required:
 *               - username
 *               - email
 *               - password
 *             example:
 *               username: AdminUser
 *               email: admin@mail.com
 *               password: 123456
 *               role_id: 1
 *               store_id: 1
 *     responses:
 *       201:
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
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *             example:
 *               email: admin@mail.com
 *               password: 123456
 *     responses:
 *       200:
 *         description: Login success
 */
router.post('/login', auth.login);

module.exports = router;