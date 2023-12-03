const express = require('express');
const app = express();
const db = require("./database.js");
const path = require('path');

//Used for reading form data from json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'website')));


//Specify the starting page (login)
app.get('/', function (req, res) { 
    res.sendFile(path.join(__dirname, 'website','html','login.html'));
}); 

//Handle data from login form
app.post('/website', function(request, response){

    //Get the form values from the json body
    let email = request.body.email;
    let password = request.body.password;

    //Check if the values exist
    if (email && password) {
		// Execute SQL query that'll select the account from the database based on the specified username and password
		db.query('SELECT * FROM Users WHERE email = ? AND password = ?', [email, password], function(error, results, fields) {

			// If there is an issue with the query, output the error
			if (error) throw error;
			
            // If the account exists
			if (results.length > 0) {
				// Authenticate the user
				response.send("Logged In")
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
	
        response.redirect('/');
		response.end();
	}

});

app.listen(8000, function()
{
    console.log('App deployed at port 8000')

});