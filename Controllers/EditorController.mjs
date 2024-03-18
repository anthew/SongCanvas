//Will have functions called by HTML actions

//Will do the document.getElementByID stuff for properties and creating shapes. The values will be passed to the EditorManager.
//import {createShape} from '/EditorManager.mjs';
//import {createLogo} from '/EditorManager.mjs';
//import {createBackground} from '/EditorManager.mjs';
//import {createLyrics} from '/EditorManager.mjs';

//import { Shape } from '../Models/Shape.mjs';
import {EditorManager} from './EditorManager.mjs';

//Create Manager Object
var EditorManagerObj = new EditorManager();

//Create event listner for key presses
createKeyboardListner();


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

    EditorManagerObj.createLogo(logoName, logoPic, logoWidth, logoHeight, logoX, logoY, logoOpacity);
}

// ----------------------- Shapes ----------------------------------------

//Function deticated to creating shapes based on user input
var addShapeToScreenButton = document.getElementById("shapeSubmit");
addShapeToScreenButton.addEventListener("click", requestCreateShape);

var ShapeArray=[];

var ShapeStartArray=[];
var ShapeStartIndex=0;;

var ShapeEndArray=[];
var ShapeEndIndex=0;

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

    // for some reason this didnt work, thats cool we can just do that in the testing
    // if(shapeX >= 1050 && shapeX <= 0) {
    //     alert(shapeX + " cannot be added. Out of range");
    // }
    // if(shapeY >= 500 && shapeY <= 0) {
    //     alert(shapeY + " cannot be added. Out of range");
    // }
    
    var duplicateFound = EditorManagerObj.createShape(shapeName, shapeWidth, shapeHeight, shapeFill_color, shapeStroke, shapeStrokeWidth, shapeX, shapeY, shapeSides, shapeAnimation_type, shapeOpacity, shapeStartTime, shapeEndTime, shapeType, shapeRadius);

    //If there is a duplicate don't make the new row
    if(duplicateFound!=true)
    {
        let table = document.getElementById("shapeHierarchy");

        let template = `
            <tr id="addedShapeRow${shapeName}" >
                <td id="editShape " style="border: 1px solid black;">
                    <button id="editShapeButton${shapeName}" onclick="showEditShapeSection('${shapeName}', '${shapeType}')" style="background-color: white; border: none;">${shapeName}</button>
                </td>
                <td id="addedShapeVisible" style="border: 1px solid black;">
                    <button id="addedShapeNameButton${shapeName}" onclick="requestShapeVisibility('${shapeName}')" style="background-color: white; border: none;"><img style="width: 26px;
                    height: 26px;" src='/LoginMedia/EyeShow.png' ></button>
                </td>
                <td id="deleteShape" style="border: 1px solid black;">
                    <button id="deleteShapeButton${shapeName}" onclick="requestDeleteShape('${shapeName}')" style="background-color: white; border: none;"><img src='/EditorMedia/TrashCan.png' style="width: 26px;
                    height: 26px; "></button>
                </td>
            </tr>
        `;

        table.innerHTML += template;

        ShapeArray= EditorManagerObj.getShapeArray();
        ShapeStartArray = EditorManagerObj.getShapeStartArray();
        ShapeEndArray = EditorManagerObj.getShapeEndArray();
    }
    else
        alert('Duplicate found ' + shapeName);
}

export function requestDeleteShape(shapeName)
{
    EditorManagerObj.deleteShape(shapeName);

    document.getElementById("shapeHierarchy").deleteRow(document.getElementById("addedShapeRow"+shapeName).rowIndex);

    ShapeArray = EditorManagerObj.getShapeArray();
    ShapeStartArray = EditorManagerObj.getShapeStartArray();
    ShapeEndArray = EditorManagerObj.getShapeEndArray();
}

export function requestShapeVisibility(shapeName)
{
    var shape = EditorManagerObj.getShapeObject(shapeName).getKonvaShape();
    //var shape = shapeObj.getKonvaShape();

    //shape.setAttr("visible",!shape.getAttr("visible"));

    EditorManagerObj.modifyShapeSight(shapeName);
}

// requests the shape object from the Model, then shows the properties section accordingly
export function showEditShapeSection(shapeName, shapeType)
{
    //Find the ShapeObject given the shapeNAme
    var ShapeObject = EditorManagerObj.getShapeObject(shapeName);

    //The Konva shape
    var shape = ShapeObject.getKonvaShape();

    //Hid any other pop ups in the properties section
    document.getElementById("editBackgroundPopUp").style.setProperty("display", "none"); 

    //Display the edit popup if not already
    document.getElementById("editShapePopUp").style.setProperty("display", "block");

    //Check what type of shape we selected
    if(ShapeObject.getShapeType()=="Rectangle")
    {
        //Hide the section not being used if not already (Polygon)
        document.getElementById("editPolygonValues").style.setProperty("display", "none");

        //Load the values into the exclusive rectangle inputs and display them
        document.getElementById("editShapeWidth").value = shape.getAttr("width");
        document.getElementById("editShapeHeight").value = shape.getAttr("height");

        document.getElementById("editRectangleValues").style.setProperty("display", "block");
    }
    else if(ShapeObject.getShapeType()=="Polygon")
    {
        //Hide the section not being used if not already (Rectangle)
        document.getElementById("editRectangleValues").style.setProperty("display", "none");

        //Load the values into the exclusive polygon inputs and display them
        document.getElementById("editShapeSides").value = shape.getAttr("sides");
        document.getElementById("editShapeRadius").value = shape.getAttr("radius");

        document.getElementById("editPolygonValues").style.setProperty("display", "block");
    }

    //Populate and display the rest of the other inputs
    document.getElementById("editShapeName").value = shape.getAttr("name");

    document.getElementById("editShapeFill").value = shape.getAttr("fill");

    document.getElementById("editShapeStroke").value = shape.getAttr("stroke");

    document.getElementById("editShapeStrokeWidth").value = shape.getAttr("strokeWidth");

    document.getElementById("editShapeX").value = shape.getAttr("x");

    document.getElementById("editShapeY").value = shape.getAttr("y");

    document.getElementById("editShapeOpacity").value = shape.getAttr("opacity");

    //Select the anim type of the current shape in selection
    var optionsList = document.getElementById('editShapeAnimation').options; //Iterate though anim options list to find the value
    for(let i=0; i < optionsList.length; i++)
    {
        if(optionsList[i].value==ShapeObject.getAnimationType())
        {
            document.getElementById('editShapeAnimation').selectedIndex = i;

        }
    }

    //Update the opcaity label to mathc the slider vlaue
    const shapeEditOpacityOutput = document.getElementById("editShapeOpacityValue");
    const shapeEditOpacityInput = document.getElementById("editShapeOpacity");

    //Have label display the starting value
    shapeEditOpacityOutput.innerText = shapeEditOpacityInput.value;

    // When you move to a diffrent value in the range update the label to current value
    shapeEditOpacityInput.addEventListener("input", (event) => {
    shapeEditOpacityOutput.innerText = event.target.value;
    });

    document.getElementById("editShapeStartTime").value = ShapeObject.getStartTime();//ShapeArray[ShapeArray.findIndex(p=>p.shapeName == shapeName)].shapeStartTime;

    document.getElementById("editShapeEndTime").value = ShapeObject.getEndTime();//ShapeArray[ShapeArray.findIndex(p=>p.shapeName == shapeName)].shapeEndTime;
    
    //Have a save button
    document.getElementById("saveChangeButton").onclick = function() {requestSaveShapeChanges(ShapeObject.getName(), shapeType)};
}

export function requestSaveShapeChanges(shapeName, shapeType)
{
    //Pass all the attributes entered in the text fileds to EditorManagerObj.saveShapeChanges
    let newShapeName = document.getElementById("editShapeName").value
    let shapeWidth = document.getElementById("editShapeWidth").value;
    let shapeHeight = document.getElementById("editShapeHeight").value;
    let shapeFill_color = document.getElementById("editShapeFill").value;
    let shapeStroke = document.getElementById("editShapeStroke").value;
    let shapeStrokeWidth = document.getElementById("editShapeStrokeWidth").value;
    let shapeX = document.getElementById("editShapeX").value;
    let shapeY = document.getElementById("editShapeY").value;
    let shapeSides = document.getElementById("editShapeSides").value;
    let shapeAnimation_type = document.getElementById("editShapeAnimation").value;
    let shapeOpacity = document.getElementById("editShapeOpacity").value;
    let shapeStartTime = document.getElementById("editShapeStartTime").value;
    let shapeEndTime = document.getElementById("editShapeEndTime").value;
    let shapeRadius = document.getElementById("editShapeRadius").value;

    EditorManagerObj.saveShapeChanges(shapeName, shapeType, newShapeName, shapeWidth, shapeHeight, shapeFill_color, shapeStroke, shapeStrokeWidth, shapeX, shapeY, shapeSides, shapeAnimation_type, shapeOpacity, shapeStartTime, shapeEndTime, shapeRadius);

    //Update the name in the row
    document.getElementById("editShapeButton" + shapeName).innerHTML = document.getElementById("editShapeName").value;
    document.getElementById("addedShapeRow" + shapeName).id = "addedShapeRow" + document.getElementById("editShapeName").value;

    //Reasign the onclick and id of editShapeButton to the new name of the shape 
    document.getElementById("editShapeButton" + shapeName).setAttribute("onClick", `showEditShapeSection('${document.getElementById("editShapeName").value}','${shapeType}')`);
    document.getElementById("editShapeButton" + shapeName).id = "editShapeButton" + document.getElementById("editShapeName").value;

    //Reassign the new name to the shapeVisibilitybutton
    document.getElementById("addedShapeNameButton" + shapeName).setAttribute("onClick", `requestShapeVisibility('${document.getElementById("editShapeName").value}')`);
    document.getElementById("addedShapeNameButton" + shapeName).id = "addedShapeNameButton" + document.getElementById("editShapeName").value;

    //Reassign the new name to the delete button
    document.getElementById("deleteShapeButton" + shapeName).setAttribute("onClick", `requestDeleteShape('${document.getElementById("editShapeName").value}')`);
    document.getElementById("deleteShapeButton" + shapeName).id = "deleteShapeButton" + document.getElementById("editShapeName").value;

    ShapeArray = EditorManagerObj.getShapeArray();
    ShapeStartArray = EditorManagerObj.getShapeStartArray();
    ShapeEndArray = EditorManagerObj.getShapeEndArray();
}



// ----------------------- Lyrics ----------------------------------------
//Function dedicated to creating shapes based on user input
var addLyrics = document.getElementById("lyricSubmit");
addLyrics.addEventListener("click", requestCreateLyrics);

var lyricArray=[];
var text;
var indexVal = -1;

//Populates the array with what the user has typed in and changes the text's properties
function requestCreateLyrics () {
    //Grab the values from the text area in the pop-up
    let lyricsTextAreaStuff = document.getElementById("lyricsTextArea").value;
    let lyricBackgroundColor = "";

    var FontType = document.getElementById("lyricFontType").value;
    var FontSize = document.getElementById("lyricFontSize").value;
    var FontColor = document.getElementById("lyricFontColor").value;

    var lyricsBackgroundSelection = document.getElementsByName("lyricBackground");
    //Grab the radio buttons and check if the user had selected a colored background
    if(lyricsBackgroundSelection[1].checked)
        lyricBackgroundColor = document.getElementById("lyricbackgroundColor").value;

    //var lyricsBackgroundSelection = document.getElementsByName("lyricBackground");

    EditorManagerObj.createLyrics(lyricsTextAreaStuff, lyricBackgroundColor, FontColor, FontSize, FontType);

    lyricArray = EditorManagerObj.getLyricArray();
    text = EditorManagerObj.getTextObject();
    indexVal=-1;
}


// -------------------------- Background --------------------------------------
var imageCont = document.getElementById('imageContent'); //Used to acces the image element and manipulate it
var videoCont = document.getElementById('videoContent');
videoCont.muted=true;

var backgroundArray=[];
var backgroundArrayIndex=0;

let submitFile = document.getElementById('fileSubmit');
submitFile.addEventListener("click", requestCreateBackground);

function requestCreateBackground(){

    //Grab the inputed file and 
    var BackgroundFileInput = URL.createObjectURL(document.getElementById('imgInput').files[0]);
    var fileName = document.getElementById('imgInput').files[0].name;

    //
    let backgroundStartTime = document.getElementById("backgroundStart").value;

    EditorManagerObj.createBackground(BackgroundFileInput, fileName, backgroundStartTime);

    let table = document.getElementById("backgroundHierarchy");
    
    let template = `
        <tr id="addedBackgroundRow${fileName}" >
            <td id="addedBackgroundName" style="border: 1px solid black;">
                <button id="showBackgroundButton${fileName}" onclick="requestShowEditBackgroundSection('${fileName}')" style="background-color: white; border: none; width: 70px; white-space: nowrap; overflow: hidden;">${fileName}</button>
            </td>
            <td id="addedBackgroundVisible" style="border: 1px solid black;">
                <button class="addedBackgroundNameButton" onclick="modifyBackgroundSight()" style="background-color: white; border: none;"><img style="width: 26px;
                height: 26px;" src='/LoginMedia/EyeShow.png' ></button>
            </td>
            <td id="deleteBackground" style="border: 1px solid black;">
                <button id="deleteBackgroundButton${fileName}" onclick="requestDeleteBackground('${fileName}')" style="background-color: white; border: none;"><img src='/EditorMedia/TrashCan.png' style="width: 26px;
                height: 26px; "></button>
            </td>
        </tr>
    `;
    
    table.innerHTML += template;

    //Get the new backgroundArray
    backgroundArray = EditorManagerObj.getBackgroundArray();
}

export function requestShowEditBackgroundSection(fileName)
{
    //EditorManagerObj.showEditBackgroundSection(fileName); 
    var backgroundObjectFound;
    
    //Make sure the file input of a prevous edit is gone 
    document.getElementById('editFileInput').value = '';

    //Hide the shapePop or others if there not already
    document.getElementById("editShapePopUp").style.setProperty("display", "none");

    //Display backgroundpop up if not already
    document.getElementById("editBackgroundPopUp").style.setProperty("display", "block");

    //Find the background object to update
    backgroundObjectFound = EditorManagerObj.getBackgroundObject(fileName);

    //Populate the fields with the the objects properties
    document.getElementById('editStartTime').value = backgroundObjectFound.backgroundStartTime;
    
    //Change the function parementers in button for fileName
    document.getElementById("saveBackgroundButton").onclick = function() {requestSaveBackgroundChanges(backgroundObjectFound.fileName)};

}

export function requestDeleteBackground(fileName)
{
    EditorManagerObj.deleteBackground(fileName);

     //Delete the row of the file
     document.getElementById("backgroundHierarchy").deleteRow(document.getElementById("addedBackgroundRow"+fileName).rowIndex);
    
     //Set the filepath of imageCont and videoCont to be empty so that the background stops showing if it's currently showing when being deleted
     imageCont.src = '';
     videoCont.src = '';

     //Get the new backgroundArray
     backgroundArray = EditorManagerObj.getBackgroundArray();
}

export function requestSaveBackgroundChanges(fileName)
{
    //var BackgroundFileInput = URL.createObjectURL(document.getElementById('imgInput').files[0]);
    let backgroundFileInput = document.getElementById('editFileInput').files[0];

    let backgroundFileContent;
    let backgroundStartTime = document.getElementById("editStartTime").value;
    let backgroundFileInputName;
    let fileInputLength = document.getElementById('editFileInput').files.length;

    //Check if there is a file in the input
    if(fileInputLength==1)
    {
        backgroundFileInputName = backgroundFileInput.name;
        backgroundFileContent = URL.createObjectURL(backgroundFileInput);
    }

    EditorManagerObj.saveBackgroundChanges(fileName, backgroundStartTime, backgroundFileContent, backgroundFileInputName, fileInputLength);

    if(fileInputLength != 0)
    {
        //Update the file name
        document.getElementById("showBackgroundButton" + fileName).innerHTML = backgroundFileInput.name;
            
        //Update the functions with the new file name
        document.getElementById("showBackgroundButton" + fileName).setAttribute("onClick", `requestShowEditBackgroundSection('${backgroundFileInput.name}')`);
        document.getElementById("showBackgroundButton" + fileName).id = "showBackgroundButton" +backgroundFileInput.name;
        
        document.getElementById("deleteBackgroundButton" + fileName).setAttribute("onClick", `requestDeleteBackground('${backgroundFileInput.name}')`);
        document.getElementById("deleteBackgroundButton" + fileName).id = "deleteBackgroundButton" + backgroundFileInput.name;

        //Update the tr id 
        document.getElementById("addedBackgroundRow" + fileName).id = "addedBackgroundRow" + backgroundFileInput.name;
    }

    //Get the new backgroundArray
    backgroundArray = EditorManagerObj.getBackgroundArray();
}

//********************************Event Listners************************************** 
//Keyboard Event Listner
let paused = true;

function keyboardEnabled(event) {

    switch (event.key) {
        //Display the next lyric
        case "ArrowRight":
            if (indexVal < lyricArray.length - 1) {
                indexVal += 1;
                //TextLayer.innerHTML = lyricArray[indexVal];
                //complexText.text = "Hello there partner";
                text.setAttr('text', lyricArray[indexVal]);
                //layer.draw();
            }

            break;

        //Display the previous lyric
        case "ArrowLeft":
            if (indexVal >= 1) {
                indexVal -= 1;
                text.setAttr('text', lyricArray[indexVal]);
                //TextLayer.innerHTML = lyricArray[indexVal];
            }
            break;

        //Pause and play the project
        case "p":
            //Flip the state 
            paused = !paused;

            if (paused == true) //If we are pausing stop the timer, audio, video(if we are currently using it as background)
            {
                audio.pause();

                if (videoCont.src != "")
                    videoCont.pause();
            }
            else //If we are playing start the timer, video, and audio layers
            {
                audio.play();
                if (videoCont.src != "")
                    videoCont.play();
            }

            break;

        //If any other button do nothing
        // restart button
        case "r":
            //Set the timer
            audio.currentTime = 0;

            //Handle the background
            if (videoCont.src !== "") {
                videoCont.currentTime = 0;
            }

            imageCont.src = "";
            videoCont.src = "";

            backgroundArrayIndex=0;

            //Set the shape start and end index to 0
            ShapeStartIndex=0;
            ShapeEndIndex=0;

            //Hide all the shapes
            EditorManagerObj.hideAllShapes();
            
            break;

        // full screen
        case "f":
            toggleFullScreen();
            break;

        default:
            return;
    }
}

function handler(event)
{
    keyboardEnabled(event);
}

export function createKeyboardListner()
{
    document.addEventListener('keydown', handler);
}


export function disableKeyboardListner(){
    document.removeEventListener('keydown', handler);
}


// Add event listeners for play, pause, and restart buttons
document.getElementById('playVideo').addEventListener('click', function(event) {
    // Handle play button click
    event.preventDefault();
    paused = false;
    audio.play();
    
    if (videoCont.src !== "") {
        videoCont.play();
    }
});

document.getElementById('pauseVideo').addEventListener('click', function(event) {
    // Handle pause button click
    event.preventDefault();
    paused = true;
    audio.pause();

    if (videoCont.src !== "") {
        videoCont.pause();
    }
});

document.getElementById('restartVideo').addEventListener('click', function(event) {
    // Handle restart button click
    event.preventDefault();
    audio.currentTime = 0;

    if (videoCont.src !== "") {
        videoCont.currentTime = 0;
    }

    imageCont.src = "";
    videoCont.src = "";

    backgroundArrayIndex=0;

    //Set the shape start and end index to 0
    ShapeStartIndex = 0;
    ShapeEndIndex = 0;

    //Hide all the shapes
    EditorManagerObj.hideAllShapes();
});

//Function to display elements at specific times. Called by setInterval
function updateProjectElements(formattedTime){
    //Change Background content if the upcoming background element's start time mathces the audio time
    if(backgroundArray.length!=0 && backgroundArray[backgroundArrayIndex].backgroundStartTime==formattedTime)
    {
        
        //if the current background elemnt to be displayed is a video load it to video element src
        if(backgroundArray[backgroundArrayIndex].fileName.includes("mp4"))
        {
            //Display and play video
            videoCont.src = backgroundArray[backgroundArrayIndex].contentFile;
            videoCont.play();
        }
        //else load content to image src
        else
        {
            //Stop video
            videoCont.src="";
            videoCont.pause();

            //Display image
            imageCont.src = backgroundArray[backgroundArrayIndex].contentFile;
        }
        
        //Increment background index if current index is not at the end of array
        if(backgroundArrayIndex < backgroundArray.length-1)
            backgroundArrayIndex+=1;   
    }

    /******************Manage shapes******************/ 
    if(ShapeStartArray.length!=0 && ShapeStartArray[ShapeStartIndex].shapeStartTime==formattedTime) //Display shape when it's start time meets formattedTime
    {
        //Display the shape
        ShapeStartArray[ShapeStartIndex].shape.showKonvaShape();

        //Check if there is any animations for this shape 
        if(ShapeStartArray[ShapeStartIndex].shape.getAnimationType()!="None")
            ShapeStartArray[ShapeStartIndex].shape.startAnimation();

        //Move to the next shape wating to be displayed. Check if we had exceeded the array boundry
        if(ShapeStartIndex < ShapeArray.length-1)
            ShapeStartIndex+=1;
    }

    if(ShapeArray.length!=0 && ShapeEndArray[ShapeEndIndex].shapeEndTime==formattedTime)
    {
        //Hide the shape
        ShapeEndArray[ShapeEndIndex].shape.hideKonvaShape();

        //Stop the shapes animation if applicable
        if(ShapeEndArray[ShapeEndIndex].shapeAnimation!="None")
            ShapeEndArray[ShapeEndIndex].shape.stopAnimation();
        
        //Move to the next shape if it is available
        if(ShapeEndIndex < ShapeArray.length-1)
            ShapeEndIndex+=1;
    }
}

//Audio
const audio = document.getElementById('musicPlayer');

    //Get the span element and update the time to it
    const timeDisplay = document.getElementById('audioTimestamp');

    //Get the input type to control the time of video
    const timeSlider = document.getElementById('timeSlider');

    // Update time display every decisecond (100 milliseconds)
    const updateTimer = setInterval(() => {
    const minutes = Math.floor(audio.currentTime / 60);
    const seconds = Math.floor(audio.currentTime % 60);
    const deciseconds = Math.floor((audio.currentTime * 10)) % 10;

    // Format time string with leading zeros
    const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${deciseconds.toString().padStart(1, '0')}`;

    timeDisplay.textContent = formattedTime;

    // Update slider position
    const percentage = (audio.currentTime / audio.duration) * 100;
    timeSlider.value = percentage;

    updateProjectElements(formattedTime);
    }, 10);

    // When audio stops, timer stops
    audio.addEventListener('ended', () => {
    clearInterval(updateTimer);
    });

    // Add event listener to handle slider change
    timeSlider.addEventListener('input', () => {
    const percentage = timeSlider.value;
    const newTime = (percentage / 100) * audio.duration;
    audio.currentTime = newTime;
    });

const canvasColumn = document.getElementById('CanvasColumn');

// Function to toggle fullscreen
function toggleFullScreen() {
    if (!document.fullscreenElement) {
        // If not in fullscreen mode, request fullscreen
        if (canvasColumn.requestFullscreen) {
            canvasColumn.requestFullscreen();
        } else if (canvasColumn.mozRequestFullScreen) {
            canvasColumn.mozRequestFullScreen(); // Firefox
        } else if (canvasColumn.webkitRequestFullscreen) {
            canvasColumn.webkitRequestFullscreen(); // Chrome, Safari and Opera
        } else if (canvasColumn.msRequestFullscreen) {
            canvasColumn.msRequestFullscreen(); // IE/Edge
        }
    } else {
        // If in fullscreen mode, exit fullscreen
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen(); // Firefox
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen(); // Chrome, Safari and Opera
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen(); // IE/Edge
        }
    }
}




//============================================================================================================



//Ajax request 
$(document).ready(function(){

    //Once page loads in, get all existing data from project
    
/*--------------------------Get Project Data from DB----------------------------- */ 
    $.ajax({
        url: "/loadProjectElementData",
        method: "POST",
    }).done(response => {
        //createShape(shapeName, shapeWidth, shapeHeight, shapeFill_color, shapeStroke, shapeStrokeWidth, shapeX, shapeY, shapeSides, shapeAnimation_type, shapeOpacity, shapeStartTime, shapeEndTime, shapeType, shapeRadius)
        //Respsonse Values from post request
        var shapes = response.shapeImportArray;
      
        //Set the src for the audio element
        //document.getElementById('musicPlayer').setAttribute('src', "/" + response.SongFile[0].SongFile);
        document.getElementById('musicPlayer').setAttribute('src', "https://storage.cloud.google.com/songcanvas.appspot.com/" + response.SongFile[0].SongFile);

        //https://storage.cloud.google.com/songcanvas.appspot.com/Unknown-2.png
        //Once you get the shapeImportArray call the editor manager createShape function and iterate throguh array
        for(var i=0; i < shapes.length; i++)
        {
            EditorManagerObj.createShape(shapes[i].DesignElement_Name, shapes[i].Width, shapes[i].Height, shapes[i].FillColor, shapes[i].BorderColor, shapes[i].BorderWidth, shapes[i].X, shapes[i].Y, shapes[i].Sides, shapes[i].AnimType, shapes[i].Opacity, shapes[i].StartTime, shapes[i].EndTime, shapes[i].ShapeType, shapes[i].Radius);
            let table = document.getElementById("shapeHierarchy");

            let template = `
                <tr id="addedShapeRow${shapes[i].DesignElement_Name}" >
                    <td id="editShape " style="border: 1px solid black;">
                        <button id="editShapeButton${shapes[i].DesignElement_Name}" onclick="showEditShapeSection('${shapes[i].DesignElement_Name}', '${shapes[i].ShapeType}')" style="background-color: white; border: none;">${shapes[i].DesignElement_Name}</button>
                    </td>
                    <td id="addedShapeVisible" style="border: 1px solid black;">
                        <button id="addedShapeNameButton${shapes[i].DesignElement_Name}" onclick="requestShapeVisibility('${shapes[i].DesignElement_Name}')" style="background-color: white; border: none;"><img style="width: 26px;
                        height: 26px;" src='/LoginMedia/EyeShow.png' ></button>
                    </td>
                    <td id="deleteShape" style="border: 1px solid black;">
                        <button id="deleteShapeButton${shapes[i].DesignElement_Name}" onclick="requestDeleteShape('${shapes[i].DesignElement_Name}')" style="background-color: white; border: none;"><img src='/EditorMedia/TrashCan.png' style="width: 26px;
                        height: 26px; "></button>
                    </td>
                </tr>
            `;

            table.innerHTML += template;

            ShapeArray= EditorManagerObj.getShapeArray();
            ShapeStartArray = EditorManagerObj.getShapeStartArray();
            ShapeEndArray = EditorManagerObj.getShapeEndArray();

            console.log(ShapeArray.length);
        }

        //Create lyrics with loaded data
        var lyrics = response.lyrics;

        if(lyrics[0]!=undefined)
        {
            EditorManagerObj.createLyrics(lyrics[0].TextContent, lyrics[0].BGColor, lyrics[0].FontColor, lyrics[0].FontSize, lyrics[0].FontType);

            lyricArray = EditorManagerObj.getLyricArray();
            text = EditorManagerObj.getTextObject();
            indexVal=-1;
        }
        alert("Project Loaded");
    });


    
    // $.ajax({
    //     url: '/openProject',
    //     method: 'POST',
    //     data: {
    //         project_ID: theProjID,
    //     },
    // }).done(response=>{
    //     window.location.href = "/EditorViews/editor.html";
    // });
    
    const $saveToDB_Button = $('#saveToDB_Button');
    $saveToDB_Button.on("click", submitHandler);

    function submitHandler(e){
        e.preventDefault();

        //Perform a copy of the Shape Array
        var copyShapeArray=[];
        for(var i=0; i< ShapeArray.length; i++)
        {
            var shape = ShapeArray[i].shape.getKonvaShape();

            var sides = 0;
            var radius = 0;
            var width = 0;
            var height = 0;

            if(ShapeArray[i].shapeType == "Rectangle")
            {
                width = shape.getAttr("width");
                height = shape.getAttr("height");
            }
            else if(ShapeArray[i].shapeType == "Polygon")
            {
                sides = shape.getAttr("sides");
                radius = shape.getAttr("radius");
            }

            var copyObject = {
                "shapeStartTime": ShapeArray[i].shapeStartTime,
                "shapeEndTime": ShapeArray[i].shapeEndTime,
                "shapeAnimation": ShapeArray[i].shapeAnimation,
                "shapeName": ShapeArray[i].shapeName,
                "shapeType" : ShapeArray[i].shapeType,
                "fill": shape.getAttr("fill"),
                "stroke": shape.getAttr("stroke"),
                "strokeWidth": shape.getAttr("strokeWidth"),
                "x": shape.getAttr("x"),
                "y": shape.getAttr("y"),
                "opacity": shape.getAttr("opacity"),
                "width": width,
                "height": height,
                "sides": sides,
                "radius": radius,
            }

            copyShapeArray.push(copyObject);
        }

        //Copy content of lyric object
        var textContent;
        var lyricObjectCopy;

        if(lyricArray.length!=0) //Check if there is any content to add
        {
            textContent = lyricArray[0];

            //Iterate throught the rest of the array and add dividers (\n~~~\n)
            for(let i=1; i<lyricArray.length; i++)
            {
                textContent = textContent + "\n~~~\n" + lyricArray[i];
            }

            lyricObjectCopy = {
                "TextContent": textContent,
                "FontColor": text.getAttr('fill'),
                "FontType": text.getAttr('fontFamily'),
                "BGColor": EditorManagerObj.getLyricObject().getKonvaBackground().getAttr('fill'),
                "FontSize": text.getAttr('fontSize'),
            }
        }


/*--------------------------Save Project to DB----------------------------- */ 
        $.ajax({
            url: '/saveProjectData',
            method: 'POST',
            dataType: 'json',
            data: {
                shape: copyShapeArray,
                lyrics: lyricObjectCopy,

                //background: EditorManagerObj.getBackgroundArray(),
            }
        }).done(response => {
            console.log(response.msg);
            alert("Hello world");
            //window.location.href = "Hello.html"
        });
    }
});