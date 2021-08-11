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

module.exports = {
  getProductById,
  getAllProducts
};
