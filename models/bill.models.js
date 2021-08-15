var config = require("./DBConfig");
const sql = require("mssql/msnodesqlv8");
const { pool } = require("mssql/msnodesqlv8");

const getProductForTestCart = async () => {
  try {
    let pool = await sql.connect(config);
    let products = await pool
      .request()
      .query("select TOP 10 * from Product order by ShopID ASC ");
    return products.recordset;
  } catch (err) {
    throw err;
  }
};

const addProductToCart = async (body) => {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("CustomerID", sql.Int, body.account)
      .input("ProductID", sql.Int, body.productID)
      .input("Qty", sql.Int, 1)
      .input("Subtotal", sql.Money, body.price)
      .input("SelectedDate", sql.Date, new Date())
      .execute("addProductToShoppingCart");
    return result.rowsAffected;
  } catch (error) {
    throw error;
  }
};

const updateCart = async (body) => {
  try {
    let pool = await sql.connect(config);
    console.log(body)
    let result = await pool
        .request()
        .input('CustomerID', sql.Int, body.CustomerAccountID)
        .input('ProductID', sql.Int, body.ProductID)
        .input('Qty', sql.Int, body.Qty)
        .input('Subtotal', sql.Money, body.Subtotal)
        .execute("UpdateCart");
    return result.rowsAffected
  } catch (error) {
      //console.log(error)
      throw error
  }
};

const getBillByAccount = async (acc) => {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("IDAccount", sql.Int, acc)
      .execute("showProductInShoppingCart");
    return result.recordsets;
  } catch (error) {
    throw error;
  }
};

const accountForCart = async (accID) => {
  try {
    let pool = await sql.connect(config);
    let info = await pool
      .request()
      .query(`select * from Account where AccountID = ${accID}`);
    return info.recordset;
  } catch (error) {
    throw error;
  }
};

const getInfoShop = async(shopName) => {
  try {
    let pool = await sql.connect(config)
    let result = await pool
      .request()
      .query(`select * from Shop where ShopID = ${shopName}`)
    return result.recordset
  } catch (error) {
    throw error
  }
}

const getVoucher = async() => {
  try {
    let pool= await sql.connect(config)
    let result = await pool
      .request()
      .query('select TOP 10 * from Vouchers V join PromotionProg P on (V.PromotionProgID = P.PromotionProgID) order by VoucherValue ASC ')
      return result.recordsets
    } catch (error) {
    throw error
  }
}

const createBill = async(body) => {
  try {
    console.log(body)
    let pool= await sql.connect(config)
    let result = await pool
        .request()
        .input('createdDate', sql.Date, new Date())
        .input('total', sql.Money, 0)
        .input('invoiceStatus', sql.Int, 3)
        .input('payment', sql.Int, body.paymentMethod)
        .input('customer', sql.Int, body.customer)
        .input('voucher', sql.Int, body.voucher.VoucherID)
        .input('ship', sql.Money, body.shipFee)
        .input('shop', sql.Int, body.shopID)
        .input('promotionID', sql.Int, body.voucher.PromotionProgID[0])
        .execute('createBill')
    let idBill = await pool
      .request()
      .query(`select max(InvoiceID) as ID from Invoices`)
    const id = idBill.recordsets[0][0].ID
    console.log('-------------------------------------------')
    console.log(id)
    for(var i = 0; i < body.listProduct.length; i++){
      console.log(body.listProduct[i].ProductPrice)
      console.log(body.listProduct[i].Qty)
      console.log(body.listProduct[i].Subtotal)
      let details = await pool
        .request()
        .input('id', sql.Int, id)
        .input('productID', sql.Int, body.listProduct[i].ProductID)
        .input('quantity', sql.Int, body.listProduct[i].Qty)
        .input('price', sql.Money, body.listProduct[i].ProductPrice)
        .input('reduced', sql.Money, 0)
        .input('sub', sql.Money, body.listProduct[i].Subtotal)
        .input('acc', sql.Int, body.customer)
        .execute('addProductToInvoices')
    }
    console.log(result)

    return result.rowsAffected
  } catch (error) {
    throw error
  }
}

const getBillForAccount = async(query) => {
  try {
    let pool= await sql.connect(config)
    let result = await pool
        .request()
        .query(`select I.InvoiceID, I.ShopID, O.OrderStatusName, I.InvoiceStatus
                from Invoices as I join OrderStatus as O
                on I.InvoiceStatus = O.OrderStatusID
                where CustomerAccountID = 1`)
    return result.recordset
  } catch (error) {
    throw error
  }
}

module.exports = {
  getProductForTestCart,
  addProductToCart,
  getBillByAccount,
  accountForCart,
  updateCart,
  getInfoShop,
  getVoucher,
  createBill,
  getBillForAccount
};
