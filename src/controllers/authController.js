const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// use environment variable for JWT secret to avoid hardcoding
const SECRET = process.env.JWT_SECRET || "supersecretkey";

// REGISTER
exports.register = async (req, res) => {
  const { username, email, password, role_id, store_id } = req.body;

  // basic validation
  if (!username || !email || !password) {
    return res.status(400).json({ message: "username, email and password are required" });
  }

  try {
    const hashed = await bcrypt.hash(password, 10);

    // role_id and store_id default to 2 (cashier) and 1 respectively
    const rid = role_id || 2;
    const sid = store_id || 1;

    await db.query(
      "INSERT INTO users (username, email, password, role_id, store_id, status) VALUES (?, ?, ?, ?, ?, ?)",
      [username, email, hashed, rid, sid, 'active']
    );

    res.status(201).json({ message: "User created" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// LOGIN
exports.login = async (req, res) => {
  const { email, password } = req.body;

  // allow login by email or username
  const [rows] = await db.query("SELECT * FROM users WHERE email=? OR username=?", [email, email]);

  if (rows.length === 0)
    return res.status(404).json({ message: "User not found" });

  const user = rows[0];

  const valid = await bcrypt.compare(password, user.password);

  if (!valid)
    return res.status(401).json({ message: "Wrong password" });

  // include role id (number) in token payload
  const token = jwt.sign(
    { id: user.id, role: user.role_id },
    SECRET,
    { expiresIn: "8h" }
  );

  res.json({
    message: "Login success",
    token,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      role_id: user.role_id,
      store_id: user.store_id
    }
  });
};
