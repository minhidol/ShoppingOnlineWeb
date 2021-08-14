var express = require("express");
var router = express.Router();

const ratingControllers = require("../controllers/ratingControllers");

router.get("/", ratingControllers.showRating);

module.exports = router;
