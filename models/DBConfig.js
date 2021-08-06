// const sql = require("msnodesqlv8");
//const connectionString = "server=localhost,1433;Database=ShoppingOnlineWeb;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0};trustServerCertificate=true;integratedSecurity=true";

// module.exports = {
//     sql: sql,
//     connectionString: connectionString
// }

// const sql = require("msnodesqlv8");

// const connectionString = "server=.;Database=ShoppingOnlineWeb;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";
// const query = "SELECT name FROM sys.databases";
// const pool = new sql.Pool({
//     connectionString: connectionString
//   })
// pool.on('open', () => {
//     console.log(`ready options`)
//   })
const config = {
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

module.exports = config

// const sql = require("mssql/msnodesqlv8");

// const connectionString = "server=.;Database=ShoppingOnlineWeb;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";
// const ConnectDB = async () => {
//     try{
//         return sql.connect(connectionString)
//     }catch(err){
//         console.log('Error when connect DB ', err)
//         return null
//     }
// }
// module.exports = {
//     ConnectDB: ConnectDB,
//     sql: sql
// }

// // const query = "SELECT * FROM ProductType";

// // const conn = new sql.ConnectionPool(connectionString).connect().then(pool => {
// //     return pool;
// // })

// // module.exports = conn;
// // // sql.query(connectionString, query, (err, rows) => {
// // //     console.log(rows);
// // // });
// // // sql.on('error', function(error){
// // //     console.log('Somethings were wrongs when connect to DB')
// // // })

// // const sql = require('mssql/msnodesqlv8')

// // // const sqlConnect = async () => {
// // //     try {
// // const config = {
// //     user: '...',
// //     password: '...',
// //     server: './',
// //     database: 'ShoppingOnlineWeb',
// //     Trusted_Connection: 'Yes',
// //     driver: 'msnodesqlv8',
// // }
// // const connectionString = "server=.;Database=ShoppingOnlineWeb;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";

// // const conn = new sql.ConnectionPool(connectionString)
// //     .connect()
// //     .then(pool => {
// //         return pool
// //     })
// // module.exports = {
// //     conn: conn,
// //     sql: sql
// // }
// //         return await sql.connect(connectionString);
// //     } catch (err) {
// //         console.log(err)
// //     }
// // }
// // const connectionString = "server=.;Database=ShoppingOnlineWeb;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";
// // sql.connect({connectionString, beforeConnect: (conn, err) => {
// //     console.log(conn)
// //     //if(err)
// //     //    console.log(err)
// //     //console.log('Connect to database successfully')
// //     // conn.once('connect', err => { err ? console.error(err) : console.log('mssql connected')})
// //     // conn.once('end', err => { err ? console.error(err) : console.log('mssql disconnected')})
// //   }})

// //module.exports = sqlConnect

// // const Connection = require('tedious').Connection;


// // var connectDB = new Connection(connectionString)

// // connectDB.on('connect', function(err){
// //     if(err){
// //         console.log(err)
// //     }
// //     console.log('Connect to database successfully!')
// // })

// // connectionDB.connect();

// // module.exports = connectionDB
