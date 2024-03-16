const express = require("express");
const router = express.Router();
const db = require("./database.js");
const path = require('path');
const LoginDAO = require("./LoginDAO.js");
const EditorDAO = require("./EditorDAO.js");

//Keeps track of who is currently logged in
var currentUser;

//Keeps track of which 
var currentProjectID;

var loginDAOObject = new LoginDAO();

var editorDAOObject = new EditorDAO();

//Keeps track of the current project being used


var customFileName;
const multer = require('multer');
const storage = multer.diskStorage({
	destination: function(req, file, cb)
	{
		cb(null, 'UserMedia/');
	}, 

	filename: function(req, file, cb){
		console.log("Hello world");
		cb(null, file.originalname); //Revert back to file.orginalname
	}
});
const upload = multer({storage: storage});

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
router.post('/createAcc', async function(req, res){
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
			//Try to add the new user
			var result = await loginDAOObject.isAccCreated(email, password, firstName, lastName);
			
			if(result==true) //Account has been created
			{
				res.json({msg: "true"});
			}
			else //Duplicate was found
			{
				res.json({msg: "false", alert:"duplicate account found"});
			}

			res.end();
		}
	}
	else
	{
		res.json({msg: "false", alert: "Missing fields"});
		res.end();
	}
});



/*--------------------------Section for Handling Requests from Dahsboard ------------------------------*/
//Retrieve project data from DB related to user
router.post("/dashboardProjectsRetrieval", async function(req, res){

	console.log("In the request dahsboardProjectRetrival");
	var result = await loginDAOObject.getExistingProjects(currentUser);
	
	//Use res json to return array to dashboard controller
	res.json({data: result});

	//Send the db result to dashboard (maybe res.json())
	res.end();
});


router.post("/openProject", async function(req, res){
	//Assign req value to currentProjectID
	currentProjectID = req.body.project_ID;

	res.end();
});

router.post("/deleteProject", async function(req, res){
	//Grab the Project Name to send
	var projID = req.body.project_ID;

	//Call query and pass in project id + currentUser
	await loginDAOObject.deleteProject(projID, currentUser)
	//End the 
	res.end();
});

//Create project based on what values where entered by user in dashboard pop-up
router.post("/createProject", upload.single('soundFile'), async function(req, res){
	//Grab the values from req (fileName and projectName)
	var projectName = req.body.projectName;
	var filePath = req.file.originalname;
	
	//Call query to create project
	var result = await loginDAOObject.isProjectCreated(currentUser, projectName, filePath);
	
	if(result==true) //Project Created
		res.json({msg: "true"});
	else //Duplicate Found
		res.json({msg: "false"});

	res.end();
});



/*--------------------------Get Project Data from DB----------------------------- */ 
router.post("/loadProjectElementData", async function(req, res){
	console.log(currentProjectID);
	

	//Get Design Element data from table related to currentProjectID
	var shapeArray = await editorDAOObject.getAllDesignElements(currentProjectID);

	//Get Lyrics element data from table related to currentProjectID
	var lyricsObj = await editorDAOObject.getLyricsElement(currentProjectID);

	//Get the sound file from database
	var soundFilepath = await editorDAOObject.getFileName(currentProjectID);
	


	//Get Background element data from table related to currentProjectID

	//Get Logo element data from table related to currentProjectID

	//Get Lyrics element data from table related to currentProjectID
	res.json({shapeImportArray: shapeArray, SongFile: soundFilepath, lyrics: lyricsObj});
	res.end();
});


/*--------------------------Save Project to DB----------------------------- */ 
router.post("/saveProjectData", async function(req, res){
	
	//Save Design Elements 
	var shapeArray = req.body.shape;

	if(shapeArray!=undefined)
	{ 			
		//Remove all DesignElement Data in the DB for new data
		await editorDAOObject.removeAllDesignElements(currentProjectID); 

		//Insert all design elements into Database
		for(var i=0; i<shapeArray.length; i++)
		{
			await editorDAOObject.saveDesignElement(currentProjectID, shapeArray[i]);
		}
	}

	//Save Lyrics
	var lyricsObj = req.body.lyrics;
	
	if(lyricsObj!=undefined)
	{
		//Remove any old existing lyric
		await editorDAOObject.removeLyricsElement(currentProjectID);

		//Add the lyrics object to table
		await editorDAOObject.saveLyricsElement(currentProjectID, lyricsObj);
	}

	//Grab the values from background array and send to Backgrounds Table using currentProjectID

	

	res.json({msg: "done"});
	res.end();
});



router.post("/something", function(req, res){
	console.log(req.body.shape);
	console.log(req.body.background);
	
	res.send({msg: "hello"});
	//res.end('{"success" : "Updated Successfully", "status" : 200}');
});

module.exports = router;