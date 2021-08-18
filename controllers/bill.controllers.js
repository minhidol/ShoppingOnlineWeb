const billModel = require('../models/bill.models')


const addProductToCart = async(req, res) => {
    try {
        const result = await billModel.addProductToCart(req.body)
        console.log('result ', result)
        res.json({ErrorCode: 0, data: result})
    } catch (error) {
        console.log(error)
        res.json({ErrorCode: 1, data: null})
    }
}

const showProduct = async(req, res) => {
    try{
        var products = await billModel.getProductForTestCart()
        res.render('testCartProductIndex.hbs', {products: products})

    }
    catch(err){
        console.log(err)
        res.json({Error: err.message})
    }
}
const showCart = async(req, res) => {
    try {
        const result = await billModel.getBillByAccount(req.params.accID)
        const data = result[0]
        var shopID = []
        var shoppingCart = []
        for(var i = 0; i < data.length; i++){
            if(!shopID.includes(data[i].ShopName))
                shopID.push(data[i].ShopName)
        }
        for(var i = 0; i < shopID.length; i++){
            shoppingCart.push({ShopName: shopID[i]})
        }
        
        for(var i = 0; i < shoppingCart.length; i++){
            shoppingCart[i].listProduct = []
            for(var j = 0; j < data.length; j++){
                if(data[j].ShopName == shoppingCart[i].ShopName){
                    shoppingCart[i].listProduct.push(data[j])
                }
            }
        }
        const infoCart = await billModel.accountForCart(1);
        const listBill = await billModel.getBillForAccount(1);
        for(var i = 0; i < listBill.length; i++){
            if(listBill[i].InvoiceStatus == 2){
                listBill[i].OrderStatusName = 'Đã hủy'
            }else if(listBill[i].InvoiceStatus == 3){
                listBill[i].OrderStatusName = 'Chưa xác nhận'
            }else if(listBill[i].InvoiceStatus == 5){
                listBill[i].OrderStatusName = 'Đã xác nhận'
            }
        }
        //res.json({data: shoppingCart})
        //console.log(JSON.stringify(shoppingCart))
        res.render('cartProduct.hbs', {
            cart: shoppingCart, 
            cartForClientJS: JSON.stringify(shoppingCart),
            acc: infoCart,
            accForClient: JSON.stringify(infoCart),
            listBill: listBill
        })
    } catch (error) {
        console.log('Error ', error)
        res.json({ErrorCode: 1, data: null, message: error.message})
    }    
}

const updateCart = async(req, res) => {
    try {
        var data = req.body
        const result = await billModel.updateCart(data)
        res.json({ErrorCode: 0, data: null})
    } catch (error) {
        console.log('error ', error.message)
        res.json({ErrorCode: 1, data: null, message: error.message})
    }
}

const createBill = async(req, res) => {
    try {
        const result = await billModel.createBill(req.body)
        res.json({ErrorCode: 0, data: null})
    } catch (error) {
        console.log(error)
        res.json({ErrorCode: 1, data: null, message: error.message})
    }
}

const showBill = async(req, res) => {
    try {
        var vouchers = await billModel.getVoucher()
        res.render('bill.hbs', {
            vouchers: vouchers[0],
            vouchersJS: JSON.stringify(vouchers[0])
        })
    } catch (error) {
        console.log(error)
        res.json({ErrorCode: 1, data: null, message: error.message})
    }
}

const getShopInfo = async(req, res) => {
    try {
        var query = req.body.shopName
        const result = await billModel.getInfoShop(query)
        res.json({ErrorCode: 0, data: result})
    } catch (error) {
        console.log(error)
        res.json({Error: 1, data: null, message: error.message})
    }
}

const updateStatusBill = async(req, res) => {
    try {
        var body = req.body
        const result = await billModel.updateStatusBill(body)
        res.json({ErrorCode: 0, data: result})
    } catch (error) {
        console.log(error)
        res.json({Error: 1, data: null, message: error.message})
    }
}

module.exports = {
    showCart,
    showProduct,
    addProductToCart,
    updateCart,
    createBill,
    showBill,
    getShopInfo,
    updateStatusBill
}