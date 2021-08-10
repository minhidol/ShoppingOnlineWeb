
/* const config = {
    user: 'sa',
    password: '123456',
    server: 'localhost',
    database: 'ShoppingOnlineWeb',
    options: {
        trustedconnection: true,
        enableArithAbort: true,
        instancename:'SQLEXPRESS',
        trustServerCertificate: true
    },
    port : 1433
} */

//của Khoa
const sql = require("mssql");
require("msnodesqlv8");
var config = {
    driver: 'msnodesqlv8',
    connectionString: 'Driver={SQL Server Native Client 11.0};Server={KHOADO-PC\\SQLEXPRESS};Database={ShoppingOnlineWeb};Trusted_Connection={yes};',
  };


module.exports = config

