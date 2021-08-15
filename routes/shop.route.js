const express = require("express");
const router = express.Router();
const shopController = require('../controllers/shop.controllers.js')

router.get('/:shopid', shopController.getShop)
router.get('/insert/:shopid', shopController.insProduct)
router.get('/update/:shopid/:id', shopController.updProduct)

module.exports = router