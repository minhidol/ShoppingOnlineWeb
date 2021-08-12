var express = require("express");
var router = express.Router();

const profileController = require("../controllers/profile.controllers");

router.get("/:id", profileController.getProfile);

module.exports = router;
