//const {connectionString, sql} = require('./connectionDB')
//const sql = require('mssql')
var config = require("./DBConfig");
const sql = require("mssql/msnodesqlv8");

const getProductType = async () => {
  try {
    let pool = await sql.connect(config);
    let products = await pool.request().query("select * from ProductType");
    return products.recordset;
  } catch (err) {
    throw err;
  }
};

// const getProductType = async(callback) => {
//     // var query = 'select * from ProductType'
//     // return await sql.query(connectionString, query, (err, data) => {
//     //     if(err){
//     //         console.log(err)
//     //         callback(true, null)
//     //     }
//     //     callback(null, data)
//     // });

// }

module.exports = {
  getProductType,
};
