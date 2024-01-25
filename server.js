const express = require('express');
const app = express();
const path = require('path');


app.use(express.static(path.join(__dirname, 'Views')));


//Used for reading form data from json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Bring over and execute the GET and POST route methods for login and create account
const CSQL_DAO_for_FormPosts = require("./CSQL_DAO");
app.use(CSQL_DAO_for_FormPosts);


// Specify the starting page (login)
app.get('/', function (req, res) { 
    // res.sendFile(path.join(__dirname, 'Client','html','login.html'));
    res.sendFile(path.join(__dirname + "/Views/LoginViews/login.html"));
}); 


// Undefined path
// app.use((req, res) => {
//     res.status(404); //error message
//     res.send(`<b>Technical Difficulties, Please come back later. -Fan</b>`);
// });

app.listen(8080, function()
{
    console.log('App deployed at port 8080')
});