const express = require("express");
const router = express.Router();
const db = require("./database.js");
const path = require('path');

//Handle data from login form
router.post('/loginAuth', function(request, response){
    // response.send("Hello there");
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
				//response.send("Logged In");
				response.redirect('/dashboardRedirect');
			} 
            else {
                //Later, call a successMessage() function or something
                response.redirect('/');
			}			
			response.end();
		});
	} 
    else {
		//Go back to the login page and try again
        response.redirect('/');
		response.end();
	}

});

//Handle form data from the create account page
router.post('/createAcc', function(req, res){
	//Get the form values from the json body
    let email = req.body.email;
    let password = req.body.password;
	let firstName = req.body.firstName;
	let lastName = req.body.lastName;


	//Check if the values exist
	if(email && password && firstName && lastName)
	{
		//Check if there is a duplicate email with query
		//im gonna check where in my js i did those little css stuff when you see that error message pop up
		// on my FormValidator.js, it has all the error message setup
		//ahh i see.
		

		//Insert the new user to the table
		db.query('insert into Users(first_name, last_name, email, password) Values (?, ?, ?, ?)', [firstName, lastName, email, password], function(error, results, fields){
			// If there is an issue with the query, output the error
			if (error) throw error;
		});

		//Go back to login page if query successful
		res.redirect('/');
		res.end();
	}
	else
	{
		res.send('Insertion Failed');
		res.end();
	}
});

router.get('/dashboardRedirect', function(req, res){
	res.sendFile(path.join(__dirname, 'Views', 'DashboardViews', 'dashboard.html'));
});

module.exports = router;