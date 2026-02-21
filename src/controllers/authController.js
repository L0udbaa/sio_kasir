const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET = "supersecretkey";

// REGISTER
exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const hashed = await bcrypt.hash(password, 10);

    await db.query(
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
      [name, email, hashed, role || 'cashier']
    );

    res.json({ message: "User created" });

  } catch (err) {
    res.status(500).json(err);
  }
};

// LOGIN
exports.login = async (req, res) => {
  const { email, password } = req.body;

  const [rows] = await db.query("SELECT * FROM users WHERE email=?", [email]);

  if (rows.length === 0)
    return res.status(404).json({ message: "User not found" });

  const user = rows[0];

  const valid = await bcrypt.compare(password, user.password);

  if (!valid)
    return res.status(401).json({ message: "Wrong password" });

  const token = jwt.sign(
    { id: user.id, role: user.role },
    SECRET,
    { expiresIn: "8h" }
  );

  res.json({
    message: "Login success",
    token,
    user: {
      id: user.id,
      name: user.name,
      role: user.role
    }
  });
};
