//Will have functions called by HTML actions

//Will do the document.getElementByID stuff for properties and creating shapes. The values will be passed to the EditorManager.

import {createShape} from '/EditorManager.js';
import {createLogo} from '/EditorManager.js';
import {createBackground} from '/EditorManager.js';
import {createLyrics} from '/EditorManager.js';

// ---------------------- Logo ------------------------------------------
var addLogoToScreenButton = document.getElementById("logoSubmit");
addLogoToScreenButton.addEventListener("click", requestCreateLogo);

function requestCreateLogo(){

    let logoName = document.getElementById("logoName").value;
    let logoPic = document.getElementById("logoInput").files[0];
    let logoWidth = document.getElementById("logoWidth").value;
    let logoHeight = document.getElementById("logoHeight").value;
    let logoX = document.getElementById("logoX").value;
    let logoY = document.getElementById("logoY").value;
    let logoOpacity = document.getElementById("logoOpacity").value;

    createLogo(logoName, logoPic, logoWidth, logoHeight, logoX, logoY, logoOpacity);
}

// ----------------------- Shapes ----------------------------------------

//Function deticated to creating shapes based on user input
var addShapeToScreenButton = document.getElementById("shapeSubmit");
addShapeToScreenButton.addEventListener("click", requestCreateShape);

function requestCreateShape()
{
    //Grab all the values from the input fields in the pop-up
    let shapeName = document.getElementById("shapeName").value;
    let shapeWidth = document.getElementById("shapeWidth").value;
    let shapeHeight = document.getElementById("shapeHeight").value;
    let shapeFill_color = document.getElementById("shapeFill").value;
    let shapeStroke = document.getElementById("shapeStroke").value;
    let shapeStrokeWidth = document.getElementById("shapeStrokeWidth").value;
    let shapeX = document.getElementById("shapeX").value;
    let shapeY = document.getElementById("shapeY").value;
    let shapeSides = document.getElementById("shapeSides").value;
    let shapeAnimation_type = document.getElementById("shapeAnimation").value;
    let shapeOpacity = document.getElementById("shapeOpacity").value;
    let shapeStartTime = document.getElementById("shapeStart-Time").value;
    let shapeEndTime = document.getElementById("shapeEnd-Time").value;
    let shapeType = document.getElementById("shapeType").value;
    let shapeRadius = document.getElementById("shapeRadius").value;

    createShape(shapeName, shapeWidth, shapeHeight, shapeFill_color, shapeStroke, shapeStrokeWidth, shapeX, shapeY, shapeSides, shapeAnimation_type, shapeOpacity, shapeStartTime, shapeEndTime, shapeType, shapeRadius);

}


// ----------------------- Lyrics ----------------------------------------



//Function dedicated to creating shapes based on user input
var addLyrics = document.getElementById("lyricSubmit");
addLyrics.addEventListener("click", requestCreateLyrics);

//Populates the array with what the user has typed in and changes the text's properties
function requestCreateLyrics () {
    //Grab the values from the text area in the pop-up
    let lyricsTextAreaStuff = document.getElementById("lyricsTextArea").value;

    //Grab the radio buttons and check if the user had selected a colored background
    var lyricsBackgroundSelection = document.getElementsByName("lyricBackground");

    createLyrics(lyricsTextAreaStuff, lyricsBackgroundSelection);
}


// -------------------------- Background --------------------------------------

let submitFile = document.getElementById('fileSubmit');
submitFile.addEventListener("click", requestCreateBackground);

function requestCreateBackground(){
    //Grab the inputed file
    var BackgroundFileInput = URL.createObjectURL(document.getElementById('imgInput').files[0]);
    
    var fileName = document.getElementById('imgInput').files[0].name;

    let backgroundStartTime = document.getElementById("backgroundStart").value;

    createBackground(BackgroundFileInput, fileName, backgroundStartTime);
}