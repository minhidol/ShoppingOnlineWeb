var express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.json());

const dashboard = require("../controllers/sys.controllers");

router.get("/", dashboard.showDashboard);
router.get("/result", dashboard.showDashboard2);


module.exports = router