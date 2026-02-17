const express = require("express");
const app = express();
require("dotenv").config();
const db = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const transactionRoutes = require("./routes/transactionRoutes");

// Middleware
app.use(express.json());

// Test DB Connection
db.getConnection()
  .then(() => console.log("✅ MySQL Connected"))
  .catch(err => console.log("❌ DB Error:", err));

// Routes
app.use("/api/products", productRoutes);
app.use("/api/transactions", transactionRoutes);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
