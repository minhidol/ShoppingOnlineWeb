<<<<<<< HEAD

//cua Minh
const config = {
=======
/* const config = {
>>>>>>> 955427c7db541186ca89612f199cc7d2b899ea7c
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
}

//của Khoa
<<<<<<< HEAD
// const sql = require("mssql");
// require("msnodesqlv8");
// var config = {
//     driver: 'msnodesqlv8',
//     connectionString: 'Driver={SQL Server Native Client 11.0};Server={KHOADO-PC\\SQLEXPRESS};Database={ShoppingOnlineWeb};Trusted_Connection={yes};',
//   };
=======
  const sql = require("mssql");
  require("msnodesqlv8");
  var config = {
    driver: 'msnodesqlv8',
    connectionString: 'Driver={SQL Server Native Client 11.0};Server={KHOADO-PC\\SQLEXPRESS};Database={ShoppingOnlineWeb};Trusted_Connection={yes};',
 };

// module.exports = config
>>>>>>> 955427c7db541186ca89612f199cc7d2b899ea7c

// Nam
// const config = {
//   user: "sa",
//   password: "Password123@jkl#",
//   server: "localhost",
//   database: "ShoppingOnlineWeb",
//   options: {
//     encrypt: true,
//     trustServerCertificate: true,
//   },
//   port: 1433,
// };

const config = {
  user: "han181",
  password: "123456",
  server: "LAPTOP-IQKFBUD7\\HAN181",
/* const config = {
  user: "sa",
  password: "Password123@jkl#",
  server: "localhost",
  database: "ShoppingOnlineWeb",
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
  port: 1433,
}; */


module.exports = config;
