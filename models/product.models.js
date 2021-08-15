var config = require("./DBConfig");
// const sql = require("mssql/msnodesqlv8");
const sql = require("mssql"); // Nam

const getProductById = async (body) => {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("id", sql.Int, body.id)
      .execute("sp_getProductById");
    return result;
  } catch (error) {
    throw error;
  }
};

const getAllProducts = async (body) => {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("page", sql.Int, body)
      .execute("sp_getAllProducts");
    return result;
  } catch (error) {
    throw error;
  }
}

const searchProduct = async (body) => {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("tensp", sql.Char, body)
      .execute("sp_SearchProductByName");
    return result;
  } catch (error) {
    throw error;
  }
}

const deleteProduct = async (body) => {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("id", sql.Int, body.id)
      .execute("sp_DeleteProduct");
    return result;
  } catch (error) {
    throw error;
  }
}

const insertProduct = async (body) => {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("tensp", sql.Char, body.productName)
      .input("type", sql.Int, body.typeid)
      .input("des", sql.Char, body.description)
      .input("price", sql.Money, body.price)
      .input("stock", sql.Int, body.stockqty)
      .input("datepos", sql.Date, body.datePost)
      .input("img", sql.Char, body.imgurl)
      .input("shopid", sql.Char, body.shopid)
      .execute("sp_InsertProduct");
    console.log(result)
    return result;
  } catch (error) {
    throw error;
  }
}

const updateProduct = async (body) => {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("tensp", sql.Char, body.productName)
      .input("type", sql.Int, body.typeid)
      .input("des", sql.Char, body.description)
      .input("price", sql.Money, body.price)
      .input("stock", sql.Int, body.stockqty)
      .input("datepos", sql.Date, body.datePost)
      .input("img", sql.Char, body.imgurl)
      .execute("sp_InsertProduct");
    console.log(result)
    return result;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getProductById,
  getAllProducts,
  searchProduct,
  deleteProduct,
  insertProduct,
  updateProduct
};
