const express = require("express");
const router = express.Router();
const db = require("./database.js");
const path = require('path');
const LoginDAO = require("./LoginDAO.js");

//Keeps track of who is currently logged in
var currentUser;

// var loginDAOObject = new LoginDAO();
var loginDAOObject = new LoginDAO();

//Keeps track of the current poject being used

//Handle data from login form
router.post('/loginAuth', async function(request, response){
	
    //Get the form values from the json body
    let email = request.body.email;
    let password = request.body.password;

	console.log("Email: " + email + ", Password: "+ password);

    //Check if the values exist
    if (email && password) {
		//Call the loginDao
		var wasLoginValid = await loginDAOObject.isLoginValid(email, password);

		
		if(wasLoginValid==true) {
			currentUser=email;
			response.json({msg: "true"});
		} else if(wasLoginValid==false) {
			response.json({msg: "false", alert: "Invalid login credentials"});
		}
		response.end();
		
	} 
    else {
		//Popup that says you need information in the fields
		response.json({msg: "false", alert: "Missing fields to log in"});
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
	let passwordConf = req.body.passwordConfirm;


	//Check if the values exist
	if(email && password && firstName && lastName && passwordConf)
	{
		//Check if the password is the same as confirmPassword
		if(passwordConf!=password)
		{
			res.json({msg: "false", alert: "Password and Confirm Password do not match."});
			res.end();
		}
		else if(password.length < 8 || !/\W/.test(password))
		{
			res.json({msg: "false", alert: "Your password does not fit the criteria."});
			res.end();
		}
		else if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)==false)
		{
			res.json({msg: "false", alert: "Invalid email address."});
			res.end();
		}
		else
		{
			//Check if there is a duplicate email with query
			db.query('SELECT * FROM Users WHERE email = ?', [email], function (error, results, fields) {

				// If there is an issue with the query, output the error
				if (error) throw error;

				// If the account exists
				if (results.length > 0) {
					// Go to dashboard
					res.json({ msg: "false", alert: "duplicate account found" });
				}
				else { //An account doesnt exist
					//Insert the new user to the table
					db.query('insert into Users(first_name, last_name, email, password) Values (?, ?, ?, ?)', [firstName, lastName, email, password], function (error, results, fields) {
						// If there is an issue with the query, output the error
						if (error) throw error;
					});

					//Later, call a successMessage() function or something
					//response.redirect('/');
					res.json({ msg: "true" });
				}
				//response.json({msg: ""})			
				res.end();
			});
		}
	}
	else
	{
		res.json({msg: "false", alert: "Missing fields"});
		res.end();
	}
});

//Retrieve project data from DB realted to user
router.post("/projectRetrival", function(req, res){
	console.log("In the request");

	//Add a db query to retetrive all rows related to user
	db.query('SELECT Project_ID, ProjectName, CreatedAt, updated_at FROM Project WHERE UserId=(SELECT id FROM Users WHERE email=?)', [currentUser], function(error, results, fields)
	{
		//Handle potentail error
		if (error) throw error;

		//console.log(results);

		//Have resposne store the array as a json object array and send back to client
		res.end();
	});

	// //Send the db result to dashboard (maybe res.json())
	// res.end();
});

//Create project based on what values where entered by user in dashboard pop-up
router.post("/createProject", function(req, res){

	//Grab the values from req (fileName and projectName)
	
	console.log("In the create project post");

	//Check if there is an existing project with same name?

	//Create project given values
	db.query('insert into Project (UserId, ProjectName, SongFile) Values (Select id FROM Users WHERE email=?, ?, ?)', [currentUser, projectName, filePath], function(error, results, fields){
		if(error) throw error;

		res.end();
	});

});

router.post("/something", function(req, res){
	console.log(req.body.shape);
	console.log(req.body.background);
	
	res.send({msg: "hello"});
	//res.end('{"success" : "Updated Successfully", "status" : 200}');
});

module.exports = router;