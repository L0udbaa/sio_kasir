const jwt = require('jsonwebtoken');
const SECRET = "supersecretkey";

exports.verifyToken = (req, res, next) => {
  const header = req.headers.authorization;

  if (!header)
    return res.status(401).json({ message: "Access denied" });

  const token = header.split(" ")[1];

  try {
    const verified = jwt.verify(token, SECRET);
    req.user = verified;
    next();
  } catch {
    res.status(400).json({ message: "Invalid token" });
  }
};

// role check
exports.isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin')
    return res.status(403).json({ message: "Admin only" });

  next();
};
