var express = require("express");
var router = express.Router();

const profileController = require("../controllers/profile.controllers");
const shopControllers = require("../controllers/shop.controllers");

router.get("/:id", profileController.getProfile);
router.get("/:id/openShop", shopControllers.shopInterface);
router.post("/:id/openShop", shopControllers.openShop);

module.exports = router;
