var config = require('./DBConfig')
const sql = require('mssql/msnodesqlv8')


const getProductForTestCart = async () => {
    try{
        let pool = await sql.connect(config)
        let products = await pool.request().query('select TOP 10 * from Product')
        return products.recordset
    }catch(err){
        throw err
    }
}


const addProductToCart = async(body) => {
    try {

        let pool = await sql.connect(config)
        let result = await pool.request()
            .input('CustomerID', sql.Int, body.account)
            .input('ProductID', sql.Int, body.productID)
            .input('Qty', sql.Int, 1)
            .input('Subtotal', sql.Money, body.price)
            .input('SelectedDate', sql.Date, new Date)
            .execute('addProductToShoppingCart')
        console.log(result)
        return result.rowsAffected
    } catch (error) {
        throw error
    }
}

module.exports = {
    getProductForTestCart,
    addProductToCart
}