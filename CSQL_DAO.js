const express = require("express");
const router = express.Router();
const db = require("./database.js");
const path = require('path');

// const app = express();
// app.use(express.json());

//Handle data from login form
router.post('/loginAuth', function(request, response){
	
    //Get the form values from the json body
    let email = request.body.email;
    let password = request.body.password;

	console.log("Email: " + email + ", Password: "+ password);

    //Check if the values exist
    if (email && password) {
		// Execute SQL query that'll select the account from the database based on the specified username and password
		db.query('SELECT * FROM Users WHERE email = ? AND password = ?', [email, password], function(error, results, fields) {

			// If there is an issue with the query, output the error
			if (error) throw error;
			
            // If the account exists
			if (results.length > 0) {
				// Go to dashboard
				response.json({msg: "true"});
				//response.redirect('/dashboardRedirect');
			} 
            else {
                //Later, call a successMessage() function or something
                //response.redirect('/');
				response.json({msg: "false"});
			}
			//response.json({msg: ""})			
			response.end();
		});
	} 
    else {
		//Go back to the login page and try again
        //response.redirect('/');
		response.end('{"success" : "Updated Successfully", "status" : 200}');
	}

});

//Handle form data from the create account page
router.post('/createAcc', function(req, res){
	//Get the form values from the json body
    let email = req.body.email;
    let password = req.body.password;
	let firstName = req.body.firstName;
	let lastName = req.body.lastName;

	console.log("Create Account => Email: " + email + ". Password: " + password);
	//Ahmad	Rahman  joeBiden  rahma020@csusm.edu
	// test123a!	TheRealDouglass@gmail.com

	//Check if the values exist
	if(email && password && firstName && lastName)
	{
		//Check if there is a duplicate email with query
		db.query('SELECT * FROM Users WHERE email = ?', [email], function(error, results, fields) {

			// If there is an issue with the query, output the error
			if (error) throw error;
			
            // If the account exists
			if (results.length > 0) {
				// Go to dashboard
				res.json({msg: "false"});
				//res.end();
				//response.redirect('/dashboardRedirect');
			} 
            else { //An account doesnt exist
				//Insert the new user to the table
				db.query('insert into Users(first_name, last_name, email, password) Values (?, ?, ?, ?)', [firstName, lastName, email, password], function(error, results, fields){
					// If there is an issue with the query, output the error
					if (error) throw error;
				});
				
                //Later, call a successMessage() function or something
                //response.redirect('/');
				res.json({msg: "true"});
			}
			//response.json({msg: ""})			
			res.end();
		});
		// //Go back to login page if query successful
		// //res.redirect('/');
		// res.json({msg: "true"});
		// res.end();
	}
	else
	{
		res.json({msg: "false"});
		res.end();
	}
});

router.post("/something", function(req, res){
	console.log(req.body.shape);
	console.log(req.body.background);
	
	res.send({msg: "hello"});
	//res.end('{"success" : "Updated Successfully", "status" : 200}');
});


router.get('/dashboardRedirect', function(req, res){
	res.sendFile(path.join(__dirname, 'Views', 'DashboardViews', 'dashboard.html'));
});

module.exports = router;