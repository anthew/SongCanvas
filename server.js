const express = require('express');
const mysql = require('mysql2');
const path = require('path');
// import {UserDAO} from "./UserDAO.js";
// const expressSession = require("express-session");
// const dbcon = require ('database.js');

const app = express();

app.use(express.static(path.join(__dirname, 'website')));

const PORT = process.env.PORT || 8080;
app.listen(PORT, _ => {
    console.log('App deployed at Port 8080');
});


// HTTP request to the root
app.get('/', async (req,res) => { 
    res.sendFile(path.join(__dirname, 'website', 'login', 'login.html'));
    // UserDAO.listUsers();
});

// HTTP request to undefined route
app.use((req, res) => {
    res.status(404); //error message
    res.send(`
  <video src = "/videos/CarrieUnderwood.mp4" controls>
  </video>`);
});