const config = require("./DBConfig");
const sql = require("mssql");

const getProfile = async (accountID) => {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .query(`SELECT * FROM Account WHERE AccountID = ${accountID}`);

    return result.recordset;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getProfile,
};
