const express = require('express')
const router = express.Router()
const router1 = express.Router()
const productController = require('../controllers/product.controllers')

router.route('/getTypeByCommand')
    .get(productController.getProductType)
router.get('/getProductById/:id', productController.getProductById)

module.exports = router