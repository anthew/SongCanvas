const db = require("./database.js");
const fs = require("fs");

class EditorDAO {
	async getProjectData()
	{
		return new Promise((resolve, reject) => {
            db.query('', [], function(error, results, fields)
	        {
		        //Handle potential error
		        if (error){
                    reject(error);
                    return;
                };

		        //Have response store the array as a json object array and send back to client
		        resolve(results);
	        });
        });
	}

	async getFileName(currentProjectID)
	{
		return new Promise((resolve, reject) => {
			db.query('Select SongFile FROM Project WHERE Project_ID=?', [currentProjectID], function(error, results, fields)	
			{
				if (error){
                    reject(error);
                    return;
                };

				resolve(results);
			});
		});
	}

	// *******************************************    Background    ******************************************
	async saveBackgroundElement(currentProjectID, backgroundObject)
	{
		return new Promise((resolve, reject)=>{
			db.query('insert into Background(Name, file_name, StartTime, ProjectID) Values(?, ?, ?, ?)', [backgroundObject.fileName, currentProjectID + "_BG_" + backgroundObject.fileName, backgroundObject.backgroundStartTime, currentProjectID], function(error, results, fields){
				if (error){
                    reject(error);
                    return;
                };
				
				resolve(true);
			});
		});
	}

	async deleteBackgroundElements(currentProjectID){
		return new Promise((resolve, reject)=>{
			db.query('DELETE FROM Background WHERE ProjectID=?', [currentProjectID], function(error, results, fields){
				if (error){
                    reject(error);
                    return;
                };
				
				resolve(true);
			});
		});
	}

	async getAllBackgroundElements(currentProjectID)
	{
		return new Promise((resolve, reject)=>{
			db.query('SELECT * FROM Background WHERE ProjectID=?', [currentProjectID], function(error, results, fields){
				if (error){
                    reject(error);
                    return;
                };
				
				resolve(results);
			});
		});
	}

	async getPreviousBackgroundFileNames(currentProjectID)
	{
		return new Promise((resolve, reject)=>{
			db.query('SELECT file_name FROM Background WHERE ProjectID=?', [currentProjectID], function(error, results, fields){
				if (error){
                    reject(error);
                    return;
                };
				
				resolve(results);
			});
		});
	}
	

	// ********************************************     Logo        ******************************************
	async saveLogoElement(currentProjectID, logoObject)
	{
		return new Promise((resolve, reject)=>{
			db.query('insert into Logo(Name, file_name, opacity, height, width, x, y, ProjectID) Values(?, ?, ?, ?, ?, ?, ?, ?)', [logoObject.LogoName, currentProjectID + "_Logo_" + logoObject.LogoFileName, logoObject.LogoOpacity, logoObject.LogoHeight, logoObject.LogoWidth, logoObject.LogoX, logoObject.LogoY, currentProjectID], function(error, results, fields){
				if (error){
					reject(error);
					return;
				};

				resolve(true);
			});
		});
	}

	async removeLogoElement(currentProjectID)
	{
		return new Promise((resolve, reject)=>{
			db.query('DELETE FROM Logo WHERE ProjectID=?', [currentProjectID], function(error, results, fields){
				if (error){
					reject(error);
					return;
				};

				resolve(true);
			});
		});
	}

	async getLogoElement(currentProjectID)
	{
		return new Promise((resolve, reject)=>{
			db.query('SELECT * FROM Logo WHERE ProjectID=?', [currentProjectID], function(error, results, fields){
				if (error){
					reject(error);
					return;
				};
	
				resolve(results);
			});
		});
	}



	// ********************************************     Lyrics      ******************************************
	async saveLyricsElement(currentProjectID, lyricObj)
	{
		return new Promise((resolve, reject)=>{

			db.query('insert into Lyrics(FontColor, TextContent, FontType, BGColor, FontSize, ProjectID) Values(?, ?, ?, ?, ?, ?)', [lyricObj.FontColor, lyricObj.TextContent, lyricObj.FontType, lyricObj.BGColor, lyricObj.FontSize, currentProjectID], function(error, results, fields)
			{
				if (error){
					reject(error);
					return;
				};
	
				resolve(true);
			});
		});
	}

	async removeLyricsElement(currentProjectID)
	{
		return new Promise((resolve, reject)=>{
			db.query('Delete FROM Lyrics WHERE ProjectID=?', [currentProjectID], function(error, results, fields)
			{
				if (error){
					reject(error);
					return;
				};
	
				resolve(true);
			});
		});
	}

	async getLyricsElement(currentProjectID)
	{
		return new Promise((resolve, reject)=>{
			db.query('SELECT * FROM Lyrics WHERE ProjectID=?', [currentProjectID], function(error, results, fields){
				if (error){
					reject(error);
					return;
				};
	
				resolve(results);
			});
		});
	}

	// ******************************************** Design Elements ******************************************
	async saveDesignElement(currentProjectID, shapeArray)
	{
		return new Promise((resolve, reject) => {
            db.query('insert into DesignElement(Width, BorderColor, X, AnimType, Opacity, BorderWidth, EndTime, Sides, DesignElement_Name, FillColor, shapeType, Height, Y, Radius, StartTime, ProjectID) Values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ', [shapeArray.width, shapeArray.stroke, shapeArray.x, shapeArray.shapeAnimation, shapeArray.opacity, shapeArray.strokeWidth, shapeArray.shapeEndTime, shapeArray.sides, shapeArray.shapeName, shapeArray.fill, shapeArray.shapeType, shapeArray.height, shapeArray.y, shapeArray.radius, shapeArray.shapeStartTime, currentProjectID], function(error, results, fields)
	        {
		        //Handle potential error
				
		        if (error){
                    reject(error);
                    return;
                };

		        //Have response store the array as a json object array and send back to client
		        resolve(true);
	        });
        });
	}

	async removeAllDesignElements(currentProjectID)
	{
		return new Promise((resolve, reject)=>{
			db.query('DELETE FROM DesignElement WHERE ProjectID=?', [currentProjectID], function(error, results, fields){
				if (error){
                    reject(error);
                    return;
                };

				resolve(true);
			});
		});
	}

	async getAllDesignElements(currentProjectID) {
		return new Promise((resolve, reject) =>{
			db.query('SELECT * FROM DesignElement WHERE ProjectID=?', [currentProjectID], function(error, results, fields)
	        {
		        //Handle potential error
				
		        if (error){
                    reject(error);
                    return;
                };

		        //Have response store the array as a json object array and send back to client
		        resolve(results);
	        });
		}) ;
	}
}
//Retrieve project data from DB related to user
// router.post("/dashboardProjectsRetrieval", function(req, res){
// 	console.log("In the request");

// 	//Add a db query to retetrive all rows related to user
// 	db.query('SELECT Project_ID, ProjectName, CreatedAt, updated_at FROM Project WHERE UserId=(SELECT id FROM Users WHERE email=?)', [currentUser], function(error, results, fields)
// 	{
// 		//Handle potentail error
// 		if (error) throw error;

// 		//console.log(results);

// 		//Have resposne store the array as a json object array and send back to client
// 		res.end();
// 	});

// 	// //Send the db result to dashboard (maybe res.json())
// 	// res.end();
// });

// //Create project based on what values were entered by user in dashboard pop-up
// router.post("/createProject", function(req, res){

// 	//Grab the values from req (fileName and projectName)
	
// 	console.log("In the create project post");

// 	//Check if there is an existing project with same name?

// 	//Create project given values
// 	db.query('insert into Project (UserId, ProjectName, SongFile) Values (Select id FROM Users WHERE email=?, ?, ?)', [currentUser, projectName, filePath], function(error, results, fields){
// 		if(error) throw error;

// 		res.end();
// 	});

// });

module.exports = EditorDAO;