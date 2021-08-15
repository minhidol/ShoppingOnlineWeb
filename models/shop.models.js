const config = require("./DBConfig");
const sql = require("mssql");

const ownShop = async (accountID) => {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .query(
        `SELECT AccountID, ShopID FROM Account WHERE AccountID = ${accountID}`
      );

    return result.recordset;
  } catch (error) {
    throw error;
  }
};

const getShopById = async(body) => {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("shopid", sql.Int, body.shopid)
      .execute("sp_getShopById");
    return result;
  } catch (error) {
    throw error;
  }
}

const getProductByShop = async(body) => {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("shopid", sql.Int, body.shopid)
      .execute("sp_getProductByShop");
    return result;
  } catch (error) {
    throw error;
  }
}

const openShop = async (
  accountID,
  shopName,
  cardIDNumber,
  PickupAddress,
  Transportation
) => {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("customerAccountID", sql.Int, accountID)
      .input("shopName", sql.VarChar(50), shopName)
      .input("cardIDNumber", sql.VarChar(12), cardIDNumber)
      .input("PickupAddress", sql.VarChar(50), PickupAddress)
      .input("Transportation", sql.VarChar(20), Transportation)
      .execute("OpenShop");
    return result.recordset;
  } catch (error) {
    throw error;
  }
};

const showInvoiceStatus = async (accountID) => {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("customerAccountID", accountID)
      .execute("CheckInvoiceStatus");

    return result.recordset;
  } catch (error) {}
};

module.exports = {
  ownShop,
  openShop,
  getShopById,
  getProductByShop,
  showInvoiceStatus,
};
