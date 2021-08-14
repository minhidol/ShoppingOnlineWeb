var express = require("express");
var router = express.Router();

const productRoutes = require("./product.route");
const billRoutes = require("./bill.route");
const profileRoutes = require("./profile.route");
const ratingRoutes = require("./rating.route");

const sysRoutes = require("./sys.route")

router.use("/product", productRoutes);
router.use("/bill", billRoutes);
router.use("/profile", profileRoutes);
router.use("/home", productRoutes);
router.use("/rating", ratingRoutes);

router.use("/dashboard", sysRoutes)

module.exports = router;
