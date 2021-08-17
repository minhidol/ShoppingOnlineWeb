
const express = require('express')
const router = express.Router()
const billController = require('../controllers/bill.controllers')

// cart product

router.get('/testForAddProductToCard', billController.showProduct)
router.post('/addProductToCart', billController.addProductToCart)
router.post('/updateCart', billController.updateCart)

// bill
router.route('/getBill/:accID')
    .get(billController.showCart)
router.post('/createBill', billController.createBill)
router.get('/showBill', billController.showBill)
router.post('/updateStatusBill', billController.updateStatusBill)

// shop
router.post('/shopOfBill', billController.getShopInfo)


module.exports = router