const config = require("./DBConfig");
const sql = require("mssql");

const getRating = async (body) => {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("productID", sql.Int, body.id)
      .execute("getCommentProduct");
    return result.recordset;
  } catch (error) {}
};

const getInvoiceID = async (accountID) => {
  try {
    let pool = await sql.connect(config);
    let invoiceID = await pool
      .request()
      .query(
        `SELECT InvoiceID FROM Invoices WHERE CustomerAccountID = ${accountID}`
      );

    return invoiceID.recordset;
  } catch (error) {}
};

const showInvoiceDetail = async (invoiceID) => {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("revoicesID", sql.Int, invoiceID)
      .execute("showInvoiceDetail");

    return result.recordset;
  } catch (error) {}
};

const RateProduct = async (accountID, productID, starRate, comment) => {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("customerAccountID", sql.Int, accountID)
      .input("productID", sql.Int, productID)
      .input("starRate", sql.Float, starRate)
      .input("comment", sql.VarChar(200), comment)
      .execute("RateProduct");
    return result.recordset;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getRating,
  getInvoiceID,
  showInvoiceDetail,
  RateProduct,
};
