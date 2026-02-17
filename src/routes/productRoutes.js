const express = require("express");
const router = express.Router();
const controller = require("../controllers/productController");

router.get("/", controller.getProducts);
router.post("/", controller.addProduct);
router.put("/:id", controller.updateProduct);
router.delete("/:id", controller.deleteProduct);

module.exports = router;
