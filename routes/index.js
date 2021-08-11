var express = require("express");
var router = express.Router();

const productRoutes = require("./product.route");
const billRoutes = require("./bill.route");

router.use("/product", productRoutes);
router.use("/bill", billRoutes);
router.use("/home", productRoutes)

module.exports = router;
