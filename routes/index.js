var express = require("express");
var router = express.Router();

const productRoutes = require("./product.route");
const billRoutes = require("./bill.route");
const profileRoutes = require("./profile.route");
const shopRoutes = require("./shop.route")

router.use("/product", productRoutes);
router.use("/bill", billRoutes);
router.use("/profile", profileRoutes);
router.use("/home", productRoutes);
router.use("/shop", shopRoutes)

module.exports = router;
