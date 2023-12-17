const express = require('express');
const app = express();
const db = require("./database.js");
const path = require('path');

//Used for reading form data from json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'website')));


app.get('/', function (req, res) {  
    res.sendFile(path.join(__dirname + "/website/login.html"));
}); 

app.post('/something', function(req,res){
    console.log(req.body.fname +" "+ req.body.lname);
    res.end('{"success" : "Updated Successfully", "status" : 200}');
    //res.json({msg: 'Success'});
    //res.send("hello");
    //console.log("Hello there");
    //res.end();
});

app.listen(3000, function()
{
    console.log('App deployed at port 3000')

});