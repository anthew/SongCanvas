const mysql = require('mysql2/promise');
const { Connector } = require('@google-cloud/cloud-sql-connector');

const getIpType = () =>
  process.env.PRIVATE_IP === '1' || process.env.PRIVATE_IP === 'true'
    ? 'PRIVATE'
    : 'PUBLIC';

const connectWithConnector = async () => {
  console.log('Connecting with Cloud SQL Connector...');
  const connector = new Connector();
  const clientOpts = await connector.getOptions({
    instanceConnectionName: process.env.INSTANCE_CONNECTION_NAME,
    ipType: getIpType(),
  });
  const dbConfig = {
    ...clientOpts,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  };
  const pool = mysql.createPool(dbConfig);
  console.log('Connection pool created.');
  return pool;
};

const run = async () => {
  try {
    const pool = await connectWithConnector();
    console.log('Connected to the database.');

    try {
      console.log('Acquiring connection...');
      const connection = await pool.getConnection();
      console.log('Connection acquired.');

      try {
        console.log('Executing query...');
        const [rows, fields] = await connection.query("SELECT * FROM Users");
        console.log('Query result:', rows);
      } finally {
        connection.release();
        console.log('Connection released.');
      }
    } catch (err) {
      console.error('Error acquiring connection:', err);
    } finally {
      pool.end();
      console.log('Connection pool closed.');
    }
  } catch (err) {
    console.error('Error connecting to the database:', err);
  }
};

run();




// const mysql = require('mysql2/promise');
// const { Connector } = require('@google-cloud/cloud-sql-connector');

// console.log("Hello, starting connection...");

// const getIpType = () =>
//   process.env.PRIVATE_IP === '1' || process.env.PRIVATE_IP === 'true'
//     ? 'PRIVATE'
//     : 'PUBLIC';

// const connectWithConnector = async () => {
//   const connector = new Connector();
//   const clientOpts = await connector.getOptions({
//     instanceConnectionName: process.env.INSTANCE_CONNECTION_NAME,
//     ipType: getIpType(),
//   });
//   const dbConfig = {
//     ...clientOpts,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     database: process.env.DB_NAME,
//   };
//   const pool = mysql.createPool(dbConfig);
//   return pool;
// };

// // Wrap the code in an async function to use await
// const run = async () => {
//   const pool = await connectWithConnector();

//   try {
//     const connection = await pool.getConnection();
//     try {
//       const [rows, fields] = await connection.query("SELECT * FROM Users");
//       console.log(rows);
//     } finally {
//       connection.release(); // Release the connection back to the pool
//     }
//   } catch (err) {
//     console.error('Error executing query', err);
//   } finally {
//     pool.end(); // Close the connection pool
//   }
// };

// run(); // Call the async function to start the process




// const mysql = require('mysql2/promise');
// const {Connector} = require('@google-cloud/cloud-sql-connector');
// const Pool = require('mysql2/typings/mysql/lib/Pool');

// // In case the PRIVATE_IP environment variable is defined then we set
// // the ipType=PRIVATE for the new connector instance, otherwise defaults
// // to public ip type.

// console.log("Helloghtdhte");

// const getIpType = () =>
//   process.env.PRIVATE_IP === '1' || process.env.PRIVATE_IP === 'true'
//     ? 'PRIVATE'
//     : 'PUBLIC';

// // connectWithConnector initializes a connection pool for a Cloud SQL instance
// // of MySQL using the Cloud SQL Node.js Connector.
// const connectWithConnector = async config => {
//     console.log(" edhte");
//   // Note: Saving credentials in environment variables is convenient, but not
//   // secure - consider a more secure solution such as
//   // Cloud Secret Manager (https://cloud.google.com/secret-manager) to help
//   // keep secrets safe.
//   const connector = new Connector();
//   const clientOpts = await connector.getOptions({
//     instanceConnectionName: process.env.INSTANCE_CONNECTION_NAME,
//     ipType: getIpType(),
//   });
//   const dbConfig = {
//     ...clientOpts,
//     user: process.env.DB_USER, // e.g. 'my-db-user'
//     password: process.env.DB_PASS, // e.g. 'my-db-password'
//     database: process.env.DB_NAME, // e.g. 'my-database'
//     // ... Specify additional properties here.
//     ...config,
//   };
//   // Establish a connection to the database.
//   const thePool =  mysql.createPool(dbConfig);

//   return thePool;
// };

// // const conn = connectWithConnector.getConnection();
// // const [result] =  connectWithConnector.query("SELECT * FROM Users");
// // console.log(result);

// connectWithConnector().then((pool) => {
//     pool.query("SELECT * FROM Users").then(([rows, fields]) => {
//         console.log("Query Result", rows);

//         pool.end();
//     });
// });

// module.exports = connectWithConnector;





// import mysql from 'mysql2/promise';
// import {Connector} from '@google-cloud/cloud-sql-connector';

// const connector = new Connector();
// const instanceConnectionName = process.env.INSTANCE_CONNECTION_NAME;
// const clientOpts = await connector.getOptions({
//   instanceConnectionName,
// //   ipType: 'PUBLIC',
//     authType: 'IAM',
// });
// const pool = await mysql.createPool({
//   ...clientOpts,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME,
// });
// const conn = await pool.getConnection();
// const [result] = await conn.query(`SELECT NOW();`);
// console.table(result); // prints returned time value from server

// await pool.end();
// connector.close();

// const mysql = require('mysql2');

// const connection = mysql.createPool({
//     port: process.env.DB_PORT,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     database: process.env.DB_NAME,
//     host: process.env.DB_HOST,
//     connectTimeout: 10000,
//     acquireTimeout: 10000,
//     waitForConnections: true,
//     queueLimit: 0
//   });
  
//   const result = connection.query("SELECT * FROM Users");
//   console.log(result);

// const createUnixSocketPool = async config => {
//     return mysql.createPool({
//         user: process.env.DB_USER,
//         password: process.env.DB_PASS,
//         database: process.env.DB_NAME,
//         socketPath: process.env.DB_INSTANCE_UNIX_SOCKET
//     });
// };

// const queryDatabase = async (pool, sql, values) => {
//     const connection = await pool.getConnection();

//     try {
//         const results = await connection.query(sql, values);
//         return results;
//     } finally {
//         connection.release(); // Release the connection back to the pool
//     }
// };

// const main = async () => {
//     try {
//         const pool = await createUnixSocketPool();

//         try {
//             // Your SQL query
//             const sqlQuery = 'SELECT * FROM USERS';

//             // Placeholder values (if any)
//             const queryValues = [];

//             const results = await queryDatabase(pool, sqlQuery, queryValues);
//             console.log('Query results:', results);
//         } catch (error) {
//             console.error('Error executing query:', error);
//         } finally {
//             pool.end(); // Close the connection pool when you are done with it
//         }
//     } catch (error) {
//         console.error('Error creating database pool:', error);
//     }
// };

// // Call the main function
// main();



// 'use strict';

// const mysql = require('promise-mysql');

// const createUnixSocketPool = async config => {
//     return mysql.createPool({
//         user: process.env.DB_USER,
//         password: process.env.DB_PASS,
//         database: process.env.DB_NAME,
//         socketPath: process.env.DB_INSTANCE_UNIX_SOCKET
//     });
// };

// const queryDatabase = async (pool, sql, values) => {
//     const connection = await pool.getConnection();

//     try {
//         const results = await connection.query(sql, values);
//         return results;
//     } finally {
//         connection.release(); // Release the connection back to the pool
//     }
// };

// module.exports = {
//     createUnixSocketPool,
//     queryDatabase
// };

// const result = createUnixSocketPool.query("SELECT * FROM Users");
// console.log(result);

// (async () => {
//     const connectionPool = await createUnixSocketPool();
//     const result = await connectionPool.query('SELECT * FROM Users');
//     console.log(result);
//   })();