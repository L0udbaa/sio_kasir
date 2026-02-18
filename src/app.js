const express = require("express");
const app = express();
require("dotenv").config();
const db = require("./config/db");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swaggerConfig");
const productRoutes = require("./routes/productRoutes");
const transactionRoutes = require("./routes/transactionRoutes");

// Middleware
app.use(express.json());

// Swagger Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Root Route
app.get("/", (req, res) => {
  res.json({
    message: "🚀 SIO Kasir API",
    version: "1.0.0",
    docs: "http://localhost:5000/api-docs",
  });
});

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
