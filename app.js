const express = require('express');
const app = express();
const db = require("./database.js");


app.get('/', function (req, res) {  
    db.query("Select * From Users", (err, data) => {
        if(err) {
            console.error(err);
            return;
        }
        // rows fetch
        console.log(data);
    });

    res.send("hello");
}); 

app.listen(8000, function()
{
    console.log('App deployed at port 8000')

});