const express = require('express');
const app = express();
const db = require("./database.js");
//const session = require('express-session');
const path = require('path');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'website')));

app.get('/', function (req, res) { 
    
    res.sendFile(path.join(__dirname, 'website','login.html'));
    /*
    db.query("Select * From Users", (err, data) => {
        if(err) {
            console.error(err);
            return;
        }
        // rows fetch
        console.log(data);
    });

    res.send("hello");
    */
}); 

app.post('/website', function(request, response){
    //res.send("Hello");

    let email = request.body.email;
    let password = request.body.password;

    if (email && password) {
		// Execute SQL query that'll select the account from the database based on the specified username and password
		db.query('SELECT * FROM Users WHERE email = ? AND password = ?', [email, password], function(error, results, fields) {
			// If there is an issue with the query, output the error
			if (error) throw error;
			// If the account exists
			if (results.length > 0) {
				// Authenticate the user
				//request.session.loggedin = true;
				//request.session.username = username;
				// Redirect to home page
				response.send("Logged In")
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		//response.send('Please enter Username and Password!');
        response.redirect('/');
        //response.redirect(__dirname, 'website', 'login.html');
        //response.sendFile(path.join(__dirname, 'website','login.html'));
		response.end();
	}

});

app.listen(8000, function()
{
    console.log('App deployed at port 8000')

});