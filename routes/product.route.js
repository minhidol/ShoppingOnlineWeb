const express = require('express')
const router = express.Router()
const productController = require('../controllers/product.controllers')

router.route('/getTypeByCommand')
    .get(productController.getProductType)

module.exports = router