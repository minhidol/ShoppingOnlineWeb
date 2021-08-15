var express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.json());

const dashboard = require("../controllers/sys.controllers");

router.get("/", dashboard.showDashboard);


module.exports = router