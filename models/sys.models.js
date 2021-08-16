var config = require('./DBConfig');
const sql = require('mssql/msnodesqlv8');
const async = require('hbs/lib/async');

const bestSellingProducts = async () => {
    var queryStr = 'SELECT ProductName, ProductPrice, AvgStarRate, TotalQuantity FROM Product AS pd JOIN (SELECT TOP(10) ProductID, SUM(Qty) AS TotalQuantity FROM InvoiceLine il GROUP BY il.ProductID ORDER BY SUM(Qty) DESC) AS res ON pd.ProductID = res.ProductID';
    try{
        let pool = await sql.connect(config);
        let result = await pool.request().query(queryStr);
        return result.recordset;
    }
    catch(err){
        throw err;
    }
}

const highestRevenueShops = async () => {
    var queryStr = 'SELECT TOP 10 Shop.ShopName, ShopIncome.Income, ShopIncome.Period FROM Shop JOIN ShopIncome ON Shop.ShopID = ShopIncome.ShopID  WHERE Year(Period) = Year(GETDATE()) AND Month(Period) = Month(GETDATE()) ORDER BY Income DESC';
    try{
        let pool = await sql.connect(config);
        let result = await pool.request().query(queryStr);
        return result.recordset;
    }catch(err){
        throw err;
    }
}

const getTopShopByMonthAndYear = async (body) => {
    try {
      let pool = await sql.connect(config);
      let result = await pool
        .request()
        .input("input", sql.Char, body)
        .execute("sp_topShopByMonthAndYear");
      return result.recordset;
    } catch (error) {
      throw error;
    }
  }


module.exports = {
    bestSellingProducts,
    highestRevenueShops,
    getTopShopByMonthAndYear
}