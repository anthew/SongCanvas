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

    EditorManagerObj.createShape(shapeName, shapeWidth, shapeHeight, shapeFill_color, shapeStroke, shapeStrokeWidth, shapeX, shapeY, shapeSides, shapeAnimation_type, shapeOpacity, shapeStartTime, shapeEndTime, shapeType, shapeRadius);

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
}

export function requestDeleteShape(shapeName)
{
    EditorManagerObj.deleteShape(shapeName);
    document.getElementById("shapeHierarchy").deleteRow(document.getElementById("addedShapeRow"+shapeName).rowIndex);
}

export function requestShapeVisibility(shapeName)
{
    var shape = EditorManagerObj.getShapeObject(shapeName).getKonvaShape();
    //var shape = shapeObj.getKonvaShape();

    shape.setAttr("visible",!shape.getAttr("visible"));

    //EditorManagerObj.modifyShapeSight(shapeName);
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
    document.getElementById("saveChangeButton").onclick = function() {requestSaveShapeChanges(shapeName, shapeType)};
}

export function requestSaveShapeChanges(shapeName, shapeType)
{
    EditorManagerObj.saveShapeChanges(shapeName, shapeType);
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

    EditorManagerObj.createLyrics(lyricsTextAreaStuff, lyricsBackgroundSelection);
}


// -------------------------- Background --------------------------------------

let submitFile = document.getElementById('fileSubmit');
submitFile.addEventListener("click", requestCreateBackground);

function requestCreateBackground(){
    //Grab the inputed file
    var BackgroundFileInput = URL.createObjectURL(document.getElementById('imgInput').files[0]);
    
    var fileName = document.getElementById('imgInput').files[0].name;

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
}

export function requestShowEditBackgroundSection(fileName)
{
    EditorManagerObj.showEditBackgroundSection(fileName);
}

export function requestDeleteBackground(fileName)
{
    EditorManagerObj.deleteBackground(fileName);
}

export function requestSaveBackgroundChanges(fileName)
{
    EditorManagerObj.saveBackgroundChanges(fileName);
}