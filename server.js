const express = require('express');
const mysql = require('mysql2');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'website')));

const PORT = process.env.PORT || 8080;
app.listen(PORT, _ => {
    console.log('App deployed at Port 8080');
});

// HTTP request to the root
app.get('/', async (req,res) => { 
    res.sendFile(path.join(__dirname, 'website', 'login', 'login.html'));
});

// HTTP request to undefined route
app.use((req, res) => {
    res.status(404); //error message
    res.send(`
  <video src = "/videos/CarrieUnderwood.mp4" controls>
  </video>`);
});

const mysql = require('mysql2/promise');
const {Connector} = require('@google-cloud/cloud-sql-connector');

// In case the PRIVATE_IP environment variable is defined then we set
// the ipType=PRIVATE for the new connector instance, otherwise defaults
// to public ip type.
const getIpType = () =>
  process.env.PRIVATE_IP === '1' || process.env.PRIVATE_IP === 'true'
    ? 'PRIVATE'
    : 'PUBLIC';

// connectWithConnector initializes a connection pool for a Cloud SQL instance
// of MySQL using the Cloud SQL Node.js Connector.
const connectWithConnector = async config => {
  // Note: Saving credentials in environment variables is convenient, but not
  // secure - consider a more secure solution such as
  // Cloud Secret Manager (https://cloud.google.com/secret-manager) to help
  // keep secrets safe.
  const connector = new Connector();
  const clientOpts = await connector.getOptions({
    instanceConnectionName: process.env.INSTANCE_CONNECTION_NAME,
    ipType: getIpType(),
  });
  const dbConfig = {
    ...clientOpts,
    user: process.env.DB_USER, // e.g. 'my-db-user'
    password: process.env.DB_PASS, // e.g. 'my-db-password'
    database: process.env.DB_NAME, // e.g. 'my-database'
    // ... Specify additional properties here.
    ...config,
  };
  // Establish a connection to the database.
  const thePool =  mysql.createPool(dbConfig);

  const conn = await thePool.getConnection();
  const [result] = await thePool.query("SELECT * FROM Users");
  console.log(result);
  console.log("Hello");

  return thePool;
};

// const connection = mysql.createPool({
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME,
//   host: process.env.DB_HOST,
//   connectTimeout: 10000,
//   acquireTimeout: 10000,
//   waitForConnections: true,
//   queueLimit: 0,
// });

// const result = connection.query("SELECT * FROM Users")
// console.log(result);

// import mysql from 'mysql2/promise';
// import {Connector} from '@google-cloud/cloud-sql-connector';

// const connector = new Connector();
// const clientOpts = await connector.getOptions({
//   instanceConnectionName: process.env.INSTANCE_CONNECTION_NAME,
//   ipType: 'PUBLIC',
// });
// const pool = await mysql.createPool({
//   // ...clientOpts,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME,
// });
// const conn = await pool.getConnection();
// const [result] = await conn.query(`SELECT NOW();`);
// console.table(result); // prints returned time value from server

// await pool.end();
// connector.close();

// try {
    //     const users = await connection.query('SELECT * FROM Users');
    //     console.log(users)
    //     res.json(users);
    //   } catch (error) {
    //     console.error(error);
    //     res.status(500).send('Internal Server Error');
    //   }


// const connection = mysql.createConnection({
//   host: '34.168.103.146',
//   // port: 3306,
//   user: 'root',
//   password: 'songFanCanvas',
//   database: 'songCanvas'
// });

// app.get('/Users', async (req, res) => {
//     try {
//       const users = await connection.query('SELECT * FROM Users');
//       console.log(users)
//       res.json(users);
//     } catch (error) {
//       console.error(error);
//       res.status(500).send('Internal Server Error');
//     }
// });
  
//   app.post('/users', async (req, res) => {
//     const { name, email } = req.body;
  
//     try {
//       await connection.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);
//       res.status(201).send('User created');
//     } catch (error) {
//       console.error(error);
//       res.status(500).send('Internal Server Error');
//     }
//   });