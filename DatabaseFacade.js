const express = require("express");
const router = express.Router();

const db = require("./database.js");
const path = require('path');

const LoginDAO = require("./LoginDAO.js");
const EditorDAO = require("./EditorDAO.js");

const fs = require('fs');

//Keeps track of who is currently logged in
var currentUser;

//Keeps track of which 
var currentProjectID;

var loginDAOObject = new LoginDAO();

var editorDAOObject = new EditorDAO();


var customFileName;
const multer = require('multer');
const storage = multer.diskStorage({
	destination: function(req, file, cb)
	{
		cb(null, 'UserMedia/');
	}, 

	filename: function(req, file, cb){
		console.log("Hello world");
		cb(null, file.originalname); //Revert back to file.originalname
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


router.post("/openProjectEditor", async function(req, res){
	//Assign req value to currentProjectID
	currentProjectID = req.body.project_ID;

	res.end();
});

router.post("/openProjectPlayer", async function(req, res){
	currentProjectID = req.body.project_ID;
	res.end();
});

router.post("/deleteProject", async function(req, res){
	//Grab the Project Name to send
	var projID = req.body.project_ID;

	//1. Remove the lyrics 
	await editorDAOObject.removeLyricsElement(projID);

	//2. Remove Design Elements
	await editorDAOObject.removeAllDesignElements(projID);

	//3. Remove Logo and it's file
	var LogoResult = await editorDAOObject.getLogoElement(projID);

	if(LogoResult.length !=0) //Check if there is a logo file to delete
	{
		//Remove logoFile from UserMedia 
		fs.unlink('UserMedia/' + LogoResult[0].file_name, function (err) {
			if (err) console.log(err);
			else
				console.log("File " + LogoResult[0].file_name + " deleted.");
		});
	}

	await editorDAOObject.removeLogoElement(projID);

	//4. Remove Backgrounds and it's elements
	var BackgroundFileNames = await editorDAOObject.getBackgroundFileNames(projID);

	if(BackgroundFileNames.length !=0) //Delete files of previous bg elements
	{
		for(var i=0; i<BackgroundFileNames.length; i++)
		{
			fs.unlink('UserMedia/' + BackgroundFileNames[i].file_name, function (err) {
				if (err) console.log(err);
				else
					console.log("Background File Deleted");
			});
		}
	}

	await editorDAOObject.deleteBackgroundElements(projID);


	//5. Remove Project and audio file
 	await loginDAOObject.deleteProject(projID, currentUser);

	//End the 
	res.end();
});

//Create project based on what values where entered by user in dashboard pop-up
router.post("/createProject", upload.single('soundFile'), async function(req, res, next){
	//Grab the values from req (fileName and projectName)
	var projectName = req.body.projectName;
	var filePath = req.file.originalname;
	
	//Call query to create project
	var result = await loginDAOObject.isProjectCreated(currentUser, projectName, filePath);

	//Get the project ID
	var projID = await loginDAOObject.getProjectID(currentUser, projectName); 

	//Get the newFileName
	var newFileName = await editorDAOObject.getFileName(projID[0].Project_ID);

	//Rename sound File to have projId_Sound_originalFileName
	fs.rename('UserMedia/' + filePath, 'UserMedia/'+newFileName[0].SongFile, function(err){
		if ( err ) console.log('ERROR: ' + err);
	});

	if(result==true) //Project Created
		res.json({msg: "true", newFileName: newFileName[0].SongFile, oldFileName: filePath});
	else //Duplicate Found
		res.json({msg: "false"});

	res.end();
});

/*--------------------------Get Project Data from DB----------------------------- */ 
router.post("/loadProjectElementData", async function(req, res){
	//Get Design Element data from table related to currentProjectID
	var shapeArray = await editorDAOObject.getAllDesignElements(currentProjectID);

	//Get Lyrics element data from table related to currentProjectID
	var lyricsObj = await editorDAOObject.getLyricsElement(currentProjectID);

	//Get Logo element data from table related to currentProjectID
	var logoObj = await editorDAOObject.getLogoElement(currentProjectID);

	//Get the Background Element data from table related to currentProjectID
	var backgroundArray = await editorDAOObject.getAllBackgroundElements(currentProjectID);

	//Get the sound file from database
	var soundFilepath = await editorDAOObject.getFileName(currentProjectID);
	

	//Send data to the editor controller
	res.json({backgroundImportArray: backgroundArray, shapeImportArray: shapeArray, SongFile: soundFilepath, lyrics: lyricsObj, logo: logoObj});
	res.end();
});

/*--------------------------Save Project to DB----------------------------- */ 
router.post("/saveProjectData", async function(req, res){
	
	//**************Save Design Elements******************* 
	var shapeArray = req.body.shape;

	//Remove all DesignElement Data in the DB for new data
	await editorDAOObject.removeAllDesignElements(currentProjectID);

	//check if there is any data to save for design elements
	if(shapeArray!=undefined)
	{ 			 
		//Insert all design elements into Database
		for(var i=0; i<shapeArray.length; i++)
		{
			await editorDAOObject.saveDesignElement(currentProjectID, shapeArray[i]);
		}
	}

	//***********************Save Lyrics*****************
	var lyricsObj = req.body.lyrics;

	//Remove any old existing lyric
	await editorDAOObject.removeLyricsElement(currentProjectID);

	//Add the lyrics object to the db if available
	if(lyricsObj!=undefined)
	{
		//Add the lyrics object to table
		await editorDAOObject.saveLyricsElement(currentProjectID, lyricsObj);
	}

	//**************************Save Logo************************
	var logoObject = req.body.logo;
	var oldLogoFileName="";

	//Get the name of the previous logo element
	var LogoResult= await editorDAOObject.getLogoElement(currentProjectID);

	//Remove any old existing logo
	await editorDAOObject.removeLogoElement(currentProjectID);

	//Add logo object to the table if available
	if(logoObject!=undefined)
	{
		await editorDAOObject.saveLogoElement(currentProjectID, logoObject);
	}

	//Check if there is any files to delete
	if(LogoResult.length !=0)
	{
		console.log("In the logo delete function");
		oldLogoFileName = LogoResult[0].file_name;

		//Check if the old file_name still exists in the table 
		var LogoExistResult = await editorDAOObject.ifLogoElementExists(currentProjectID, oldLogoFileName);

		//Remove logoFile from UserMedia 
		if(LogoExistResult==false)
		{
			fs.unlink('UserMedia/' + oldLogoFileName, function (err) {
				if (err) console.log(err);
				else
					console.log("File " + oldLogoFileName + " deleted.");
			});
		}
	}

	//******************Save Background*****************
	var backgroundArray = req.body.background;

	//Get the file names of any pre-exisitng background objects
	var PreviousBGResult = await editorDAOObject.getBackgroundFileNames(currentProjectID);
	
	//Remove all background objects belonging to project
	await editorDAOObject.deleteBackgroundElements(currentProjectID);

	if(backgroundArray !=undefined)
	{
		//Add background objects to table and to User Media
		for(let i=0; i<backgroundArray.length; i++)
		{
			await editorDAOObject.saveBackgroundElement(currentProjectID, backgroundArray[i]);
		}
	}

	//Delete files of previous bg elements
	if(PreviousBGResult.length !=0)
	{
		for(var i=0; i<PreviousBGResult.length; i++)
		{
			var result = await editorDAOObject.ifBackgroundFileExists(currentProjectID, PreviousBGResult[i].file_name);

			//Delete file if it doesnt exist in the table
			if(result==false)
			{
				fs.unlink('UserMedia/' + PreviousBGResult[i].file_name, function(err){
					if (err) console.log(err);
					else
						console.log("Background File Deleted");
				});
			}
		}
	}

	
	//Return the old fileNames of Logo
	res.json({msg: "done"});
	res.end();
});

router.post("/uploadLogo", upload.single('LogoFile'), async function(req, res){
	//Get the name of the logo file
	var newFileName = currentProjectID + "_Logo_" + req.file.originalname;

	//Have the db update the logo file_name
	await editorDAOObject.updateLogoFileName(currentProjectID, newFileName);

	//Rename sound File to have projId_Sound_originalFileName
	fs.rename('UserMedia/' + req.file.originalname, 'UserMedia/'+ newFileName, function(err){
		if ( err ) console.log('ERROR: ' + err);
	});

	res.end();
});

router.post("/uploadBackgrounds", upload.any(), async function(req, res){
	//Get the name of the 
	console.log("In the upload BG function");

	req.files.forEach((file)=>{
		fs.rename('UserMedia/'+file.originalname, 'UserMedia/'+currentProjectID+"_BG_"+file.originalname, function(err){
			if (err) 
				console.log('ERROR: ' + err);
			else
				console.log('BGFile ' + currentProjectID+"_BG_"+file.originalname + " uploaded");
		});
	});

	res.end();
});

router.post("/something", function(req, res){
	console.log(req.body.shape);
	console.log(req.body.background);
	
	res.send({msg: "hello"});
	//res.end('{"success" : "Updated Successfully", "status" : 200}');
});

module.exports = router;