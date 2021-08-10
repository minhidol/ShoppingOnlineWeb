const billModel = require('../models/bill.models')


const addProductToCart = async(req, res) => {
    try {
        const result = await billModel.addProductToCart(req.body)
        return result
    } catch (error) {
        console.log(error)
    }
}

const showProduct = async(req, res) => {
    try{
        var products = await billModel.getProductForTestCart()
        res.render('testCartProductIndex.hbs', {products: products})
        //res.render('testCartProductIndex.hbs')
    }
    catch(err){
        console.log(err)
        res.json({Error: err.message})
    }
}
const showBill = async(req, res) => {
    res.render('cartProduct.hbs')
    // res.json('show bill')
}

module.exports = {
    showBill,
    showProduct,
    addProductToCart
}