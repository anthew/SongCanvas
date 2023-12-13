const express = require('express');
const path = require('path');
// import {UserDAO} from "./UserDAO.js";
const UserDAO = require("./UserDAO.js")
// const expressSession = require("express-session");
const app = express();

//use to read textfields
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'website')));

// Deploying Node.js server to port 8080
const PORT = process.env.PORT || 8080;
app.listen(PORT, _ => {
    console.log('App deployed at Port 8080');
});

// HTTP request to the root (default link) goes to the login page.
app.get('/', function (req,res) { 
    res.sendFile(path.join(__dirname, 'website', 'html', 'login', 'login.html'));
});

// HTTP request to go to the dashboard page.
app.get('/dashboardRedirect', function(req, res){
	res.sendFile(path.join(__dirname, 'website', 'html', 'dashboard', 'dashboard.html'));
});

//handle the post method from line 48 in login.html to retrieve the action /loginAuth
app.post('/loginAuth', function(request, response){

    //Get the form values from the json body
    let email = request.body.email;
    let password = request.body.password;

    //Check if the values exist
    if (email && password) {
		// Execute SQL query that'll select the account from the database based on the specified username and password
		UserDAO.query('SELECT * FROM Users WHERE email = ? AND password = ?', [email, password], function(error, results, fields) {

			// If there is an issue with the query, output the error
			if (error) throw error;
			
            // If the account exists
			if (results.length > 0) {
				// Authenticate the user
				//response.send("Logged In");
				response.redirect('/dashboardRedirect');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		//Go back to the login page and try again
        response.redirect('/');
		response.end();
	}

});

//Handle form data from the create account page
app.post('/createAcc', function(req, res){

	//Get the form values from the json body
    let email = req.body.email;
    let password = req.body.password;
	let firstName = req.body.firstName;
	let lastName = req.body.lastName;

	console.log(email + ' ' + password);

	//Check if the values exist
	if(email && password && firstName && lastName)
	{
		//Insert the new user to the table
		UserDAO.query('insert into Users(first_name, last_name, email, password) Values (?, ?, ?, ?)', [firstName, lastName, email, password], function(){
			// If there is an issue with the query, output the error
			if (error) throw error;
		});

		//Go back to login page if query successful
		res.redirect('/');
	}
	else
	{
		res.send('Insertion Failed');
	}
});

// HTTP request to undefined route
app.use((_req, res) => {
    res.status(404); //error message
    res.send(`Whoopsies, technical difficulties`);
});