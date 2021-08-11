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

module.exports = {
  getRating,
};
