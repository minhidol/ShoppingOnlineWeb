const express = require("express");
const router = express.Router();
const shopController = require('../controllers/shop.controllers.js')

router.get('/:shopid', shopController.getShop)
router.get('/insert/:shopid', shopController.insProduct)

module.exports = router