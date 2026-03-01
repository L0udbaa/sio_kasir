const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || "supersecretkey";

exports.verifyToken = (req, res, next) => {
  const header = req.headers.authorization;

  if (!header)
    return res.status(401).json({ message: "Access denied" });

  const token = header.split(" ")[1];

  try {
    const verified = jwt.verify(token, SECRET);
    req.user = verified;
    next();
  } catch (err) {
    console.error("Token verification error", err);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

// role check (role number 1 = admin)
exports.isAdmin = (req, res, next) => {
  // jwt token stores the role id in `role` field
  if (req.user.role !== 1)
    return res.status(403).json({ message: "Admin only" });

  next();
};
