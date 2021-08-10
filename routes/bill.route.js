
const express = require('express')
const router = express.Router()
const billController = require('../controllers/bill.controllers')

router.get('/testForAddProductToCard', billController.showProduct)
// cart product
router.post('/addProductToCart', billController.addProductToCart)


// bill
router.route('/getBill')
    .get(billController.showBill)


module.exports = router