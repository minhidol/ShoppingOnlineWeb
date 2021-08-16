const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controllers");

router.route("/getTypeByCommand").get(productController.getProductType);
router.get("/getProductById/:id", productController.getProductById);
router.get("/page/:pageid", productController.getAllProducts);
router.get("/search", productController.searchProducts);
router.get("/delete/:id", productController.delProduct);
router.post("/insert/:shopid", productController.insProduct);
router.post("/update/:shopid/:productid", productController.updProduct);

module.exports = router;
