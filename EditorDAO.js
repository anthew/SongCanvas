const express = require("express");
const router = express.Router();
const db = require("./database.js");
const path = require('path');

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

module.exports = router;