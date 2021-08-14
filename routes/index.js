var express = require("express");
var router = express.Router();

const productRoutes = require("./product.route");
const billRoutes = require("./bill.route");
const profileRoutes = require("./profile.route");
const shopRoutes = require("./shop.route")
const ratingRoutes = require("./rating.route");

router.use("/product", productRoutes);
router.use("/bill", billRoutes);
router.use("/profile", profileRoutes);
router.use("/home", productRoutes);
router.use("/rating", ratingRoutes);
router.use("/shop", shopRoutes)

module.exports = router;
