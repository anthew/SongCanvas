import {Polygon} from '/Polygon.js';
import {Rectangle} from '/Rectangle.js';

// ----------------------- Initializations and Konva canvas setup ----------------------------------------

//Calcualte the size of the stage
//console.log(window.innerWidth);
var canvasWidth = window.innerWidth * (parseInt(document.getElementById("CanvasColumn").getAttribute('width'))/100);
//canvasWidth-16 test this later
console.log(canvasWidth);
//Create the stage
var stage = new Konva.Stage({
    container: 'KonvaCanvas',
    width: 1050,
    height: 500, 
});

//console.log(document.getElementById("CanvasColumn").getAttribute('width'));
//Create and add layer to the stage
var layer = new Konva.Layer();
stage.add(layer);

// //Testing with animation 
// var anim = new Konva.Animation(function (frame) {
//     var angleDiff = (frame.timeDiff * 90) / 1000;
//     shapes.rotate(angleDiff);
//   }, layer);

// anim.start();

// var canvas = document.createElement('canvas');

// function onDrawFrame(ctx, frame) {
//     // update canvas size
//     canvas.width = 1050;
//     canvas.height = 500;
//     // update canvas that we are using for Konva.Image
//     ctx.drawImage(frame.buffer, 0, 0);
//     // redraw the layer
//     layer.draw();
// }

// gifler("/EditorMedia/squidward.gif").frames(canvas, onDrawFrame);

// var image = new Konva.Image({
//     image: canvas,
//     draggable: true,
// });
  
// layer.add(image);

//Testing with animation 
// var anim = new Konva.Animation(function (frame) {
//     var angleDiff = (frame.timeDiff * 90) / 1000;
//     shapes.rotate(angleDiff);
//   }, layer);

// anim.start();



// ---------------------- Logo ------------------------------------------
var addLogoToScreenButton = document.getElementById("logoSubmit");
addLogoToScreenButton.addEventListener("click", createLogo);

//Create the logo object once
var logo = new Konva.Image({
    // name: logoName,
    //x: Number(logoX), //Needed to
    //y: Number(logoY),
    //image: imageObj,
    //width: logoWidth,
    //height: logoHeight,
    //opacity: logoOpacity,
    draggable: true,
    id: "logo",    
});

// add the logo to the layer
layer.add(logo);

//Grab the logo object by it's id to edit it's attibutes
var logoObject = layer.find('#logo')[0];

//Boolean to check to dermine if a row has already been created
var logoCreated = false;

function createLogo(){
    //alert("Logo Selected");

    let logoName = document.getElementById("logoName").value;
    let logoPic = document.getElementById("logoInput").files[0];
    let logoWidth = document.getElementById("logoWidth").value;
    let logoHeight = document.getElementById("logoHeight").value;
    let logoX = document.getElementById("logoX").value;
    let logoY = document.getElementById("logoY").value;
    let logoOpacity = document.getElementById("logoOpacity").value;

    //alert(logoOpacity);
    //let logoBorderColor = document.getElementById("logoBorderColor").value;
    //let logoBorderWidth = document.getElementById("logoBorderWidth").value;

    var imageObj = new Image();
    imageObj.onload = function () {
        logoObject.setAttr("name",logoName);
        logoObject.setAttr("x",Number(logoX));
        logoObject.setAttr("y",Number(logoY));     
        logoObject.setAttr("image", imageObj);
        logoObject.setAttr("width", logoWidth);
        logoObject.setAttr("height", logoHeight);
        logoObject.setAttr("opacity",logoOpacity);
        logoObject.setAttr("draggable", true);


        // var logo = new Konva.Image({
        //     name: logoName,
        //     x: Number(logoX), //Needed to
        //     y: Number(logoY),
        //     image: imageObj,
        //     width: logoWidth,
        //     height: logoHeight,
        //     opacity: logoOpacity,
        //     draggable: true,
            
        // });
        // // add the logo to the layer
        // layer.add(logo);
    };
    
    imageObj.src = URL.createObjectURL(logoPic);
    
    let table = document.getElementById("logoHierarchy");

    let template = `
        <tr id="addedLogoRow">
            <td id="addedLogoName" style="border: 1px solid black;"> 
                <button class="addedLogoNameButton" onclick="editLogoAttributes('${logoName}')" style="background-color: white; border: none;">${logoName}</button>
            </td>
            <td id="addedLogoVisibility" style="border: 1px solid black;">
                <button class="addedLogoVisibilityButton" onclick="toggleLogoVisibility('${logoName}')" style="background-color: white; border: none;"><img style="width: 26px;
                height: 26px;" src='/LoginMedia/EyeShow.png' ></button>
            </td>
            <td id="deleteLogo" style="border: 1px solid black;">
                <button class="deleteLogoButton" onclick="deleteLogo('${logoName}')" style="background-color: white; border: none;" ><img src='/EditorMedia/TrashCan.png' style="width: 26px;
                height: 26px; "></button>
            </td>
        </tr>
    `;    
    table.innerHTML += template;
    document.getElementById("logoPlusButton").style.setProperty("display", "none");

    alert("Logo Added");
}

//I don't think we need this function right?
function updateShapeAttributes() // Still needs to be MVC
{
    let newType = document.getElementById('editShapeType').value;
    let newWidth = document.getElementById('editShapeWidth').value;
    let newHeight = document.getElementById('editShapeHeight').value;
    let newFill = document.getElementById('editShapeFill').value;
    let newStroke = document.getElementById('editShapeStroke').value;
    let newStrokeWidth = document.getElementById('editShapeStrokeWidth').value;
    let newX = document.getElementById('editShapeX').value;
    let newY = document.getElementById('editShapeY').value;
    let newSides = document.getElementById('editShapeSides').value;
    let newRadius = document.getElementById('editShapeRadius').value;
    let newAnimationType = document.getElementById('editShapeAnimation').value;
    let newOpacity = document.getElementById('editShapeOpacity').value;

    console.log(newWidth);
}


// ----------------------- Shapes ----------------------------------------

//Function deticated to creating shapes based on user input
var addShapeToScreenButton = document.getElementById("shapeSubmit");
addShapeToScreenButton.addEventListener("click", createShape);

//Array to hold shapes user has added 
let ShapeArray = []; //Holds the information of a shape and it's start time, end time, and animation
let ShapeArrayIndex = 0;

let ShapeStartArray = []; //Used to keep track of the shapes from earliest start time to latest start time
let ShapeStartIndex = 0;

let ShapeEndArray = []; //Used to keep track of the shapes from earliest end time to the latest end time
let ShapeEndIndex = 0;

function createShape()
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

    //Check if there are any duplicate names
    var duplicatNameFound=false;

    //For every shape in ShapeArray
    for(var i = 0; i < ShapeArray.length; i++){
        //If the name is the 
        if(ShapeArray[i].shapeName==shapeName)
        {
            duplicatNameFound=true;
        }     
    }

    var shape;
    if(duplicatNameFound==false)
    { //No duplicate names were found 
     
        //Determine which type of shape user selected
        if(shapeType=="Polygon")
        {
            shape = new Polygon(shapeName, shapeType, shapeX, shapeY, shapeStartTime, shapeEndTime, shapeFill_color, shapeStroke, shapeStrokeWidth, shapeAnimation_type, shapeOpacity, shapeRadius, shapeSides);
            shape.instantiateKonvaShape();
        }
        else if(shapeType=="Rectangle")
        {
            shape = new Rectangle(shapeName, shapeType, shapeX, shapeY, shapeStartTime, shapeEndTime, shapeFill_color, shapeStroke, shapeStrokeWidth, shapeAnimation_type, shapeOpacity, shapeHeight, shapeWidth);
            shape.instantiateKonvaShape();
        }

        // assign animation to the shape based on user selection
        if(shapeAnimation_type!="None")
        {
            //Determine if it's any of these options
            if(shapeAnimation_type=="Clockwise")
            {
                shape.setAnimation(
                    new Konva.Animation(function (frame) {
                        shape.getKonvaShape().rotate(1.5);
                    }, layer)
                );
            }
            else if(shapeAnimation_type=="Counter-Clockwise")
            {
                shape.setAnimation(
                    new Konva.Animation(function (frame) {
                        shape.getKonvaShape().rotate(-1.5);
                    }, layer)
                );
            }
        }

        //Add the newly created shape to the canvas
        layer.add(shape.getKonvaShape());

        //Add the newly created shape to the array
        var newShape = {
            "shapeStartTime" : shape.getStartTime(),
            "shapeEndTime" : shape.getEndTime(),
            "shape" : shape, 
            "shapeAnimation" : shapeAnimation_type,
            "shapeName": shapeName,
        }

        //Save the shape to array that will be used to store to database 
        ShapeArray.push(newShape);

        //Add the shape to an array that sorted by start time
        ShapeStartArray.push(newShape);
        ShapeStartArray.sort(function (a, b) {
            return a.shape.getStartTime().localeCompare(b.shape.getStartTime());
        });

        //Add the shape to an array that is sorted by end time
        ShapeEndArray.push(newShape);
        ShapeEndArray.sort(function (a, b) {
            return a.shape.getEndTime().localeCompare(b.shape.getEndTime());
        });

        let table = document.getElementById("shapeHierarchy");

        let template = `
            <tr id="addedShapeRow${shapeName}" >
                <td id="editShape " style="border: 1px solid black;">
                    <button id="editShapeButton${shapeName}" onclick="showEditShapeSection('${shapeName}', '${shapeType}')" style="background-color: white; border: none;">${shapeName}</button>
                </td>
                <td id="addedShapeVisible" style="border: 1px solid black;">
                    <button id="addedShapeNameButton${shapeName}" onclick="modifyShapeSight('${shapeName}')" style="background-color: white; border: none;"><img style="width: 26px;
                    height: 26px;" src='/LoginMedia/EyeShow.png' ></button>
                </td>
                <td id="deleteShape" style="border: 1px solid black;">
                    <button id="deleteShapeButton${shapeName}" onclick="deleteShape('${shapeName}')" style="background-color: white; border: none;"><img src='/EditorMedia/TrashCan.png' style="width: 26px;
                    height: 26px; "></button>
                </td>
            </tr>
        `;

        table.innerHTML += template;

        // console.log(document.getElementById("addedShapeRow"+shapeName).rowIndex);
        //Inidacte to user that the shape was added
        alert("Shape created");
    } else {
        alert('Duplicate found ' + shapeName);
        duplicatNameFound = true;
    }

}

// Takes the information from the shapes and puts it in the modal
export function showEditShapeSection(shapeName, shapeType)
{
    //Grab the shape to access it's properites
    var shape = stage.find('.' + shapeName)[0];

    //Hid any other pop ups in the properties section
    document.getElementById("editBackgroundPopUp").style.setProperty("display", "none"); 

    //Display the edit popup if not already
    document.getElementById("editShapePopUp").style.setProperty("display", "block");

    //Check what type of shape we selected
    if(shapeType=="Rectangle")
    {
        //Hide the section not being used if not already (Polygon)
        document.getElementById("editPolygonValues").style.setProperty("display", "none");

        //Load the values into the exclusive rectangle inputs and display them
        document.getElementById("editShapeWidth").value = shape.getAttr("width");
        document.getElementById("editShapeHeight").value = shape.getAttr("height");

        document.getElementById("editRectangleValues").style.setProperty("display", "block");
    }
    else if(shapeType=="Polygon")
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

    document.getElementById("editShapeStartTime").value = ShapeArray[ShapeArray.findIndex(p=>p.shapeName == shapeName)].shapeStartTime;

    document.getElementById("editShapeEndTime").value = ShapeArray[ShapeArray.findIndex(p=>p.shapeName == shapeName)].shapeEndTime;

    //Have a save button
    document.getElementById("saveChangeButton").onclick = function() {saveShapeChanges(shapeName, shapeType)};
}

export function saveShapeChanges(shapeName, shapeType) // Needs to change for MVC
{
    //Get the shape from the stage to set it's new attributes
    var shape = stage.find('.' + shapeName)[0];

    //Determine what type of shape were acessing
    if(shapeType == "Rectangle")
    {
        shape.setAttr("width", document.getElementById("editShapeWidth").value); 
        shape.setAttr("height", document.getElementById("editShapeHeight").value);
    }
    else if(shapeType == "Polygon")
    {
        shape.setAttr("sides", document.getElementById("editShapeSides").value);
        shape.setAttr("radius", document.getElementById("editShapeRadius").value);
    }

    //Handle the rest of the common attributes
    shape.setAttr("name", document.getElementById("editShapeName").value);

    shape.setAttr("fill", document.getElementById("editShapeFill").value);
    
    shape.setAttr("stroke", document.getElementById("editShapeStroke").value);
    
    shape.setAttr("strokeWidth", document.getElementById("editShapeStrokeWidth").value);
    
    shape.setAttr("x", document.getElementById("editShapeX").value);
    
    shape.setAttr("y", document.getElementById("editShapeY").value);
    
    shape.setAttr("opacity", document.getElementById("editShapeOpacity").value);

    //Update the name in the row
    document.getElementById("editShapeButton" + shapeName).innerHTML = document.getElementById("editShapeName").value;

    //Update the startTime, EndTime, and name for the shapeArray, shapeStartArray, and shapeEndArray
    var shapeIndex = ShapeArray.findIndex(p=>p.shapeName == shapeName);
    var shapeStartIndex = ShapeStartArray.findIndex(p=>p.shapeName == shapeName);
    var shapeEndIndex = ShapeEndArray.findIndex(p=>p.shapeName == shapeName);

    ShapeArray[shapeIndex].shapeName = document.getElementById("editShapeName").value;
    ShapeArray[shapeIndex].shapeStartTime = document.getElementById("editShapeStartTime").value;
    ShapeArray[shapeIndex].shapeEndTime = document.getElementById("editShapeEndTime").value;

    ShapeStartArray[shapeStartIndex].shapeName = document.getElementById("editShapeName").value;
    ShapeStartArray[shapeStartIndex].shapeStartTime = document.getElementById("editShapeStartTime").value;
    ShapeStartArray[shapeStartIndex].shapeEndTime = document.getElementById("editShapeEndTime").value;

    ShapeEndArray[shapeEndIndex].shapeName = document.getElementById("editShapeName").value;
    ShapeEndArray[shapeEndIndex].shapeStartTime = document.getElementById("editShapeStartTime").value;
    ShapeEndArray[shapeEndIndex].shapeEndTime = document.getElementById("editShapeEndTime").value;

    //Rename the id of the tr and buttons + functions to include the new name
    document.getElementById("editShapeButton" + shapeName).onclick = function() {showEditShapeSection(document.getElementById("editShapeName").value, shapeType)};
    document.getElementById("editShapeButton" + shapeName).id = "editShapeButton" + document.getElementById("editShapeName").value;

    //Reassign the onClick parameters to match the shapeName for visibility, delete, and name
    
    //Recall editShape to display the values *Might not need this
    //showEditShapeSection(document.getElementById("editShapeName").value, shapeType);
}

export function modifyShapeSight(shapeName)
{
    //Find the shape in the layer
    var shape = stage.find('.' + shapeName)[0];

    //Change the shape visibility
    shape.setAttr("visible",!shape.getAttr("visible"));
}

export function deleteShape(shapeName)
{
    //Find the shape in the layer
    var shape = stage.find('.' + shapeName)[0];

    //Delete entry relanted to shape in shapeArray, ShapeStartarray, and ShapeEndArray
    var shapeIndex = ShapeArray.findIndex(p=>p.shapeName == shapeName);
    var shapeStartIndex = ShapeStartArray.findIndex(p=>p.shapeName == shapeName);
    var shapeEndIndex = ShapeEndArray.findIndex(p=>p.shapeName == shapeName);

    ShapeArray.splice(shapeIndex, 1);
    ShapeStartArray.splice(shapeStartIndex, 1);
    ShapeEndArray.splice(shapeEndIndex, 1);

    // console.log("Shape Array: "+ ShapeArray);
    // console.log("Start Array: "+ ShapeStartArray);
    // console.log("End Array: " + ShapeEndArray);
    
    //Destory the shape
    shape.destroy();


    //Delete the row in the table tied to the shape
    //console.log(document.getElementById("addedShapeRow"+shapeName).rowIndex);
    document.getElementById("shapeHierarchy").deleteRow(document.getElementById("addedShapeRow"+shapeName).rowIndex);
    //var index = row.parentNode.parentNode.rowIndex;
    //document.getElementById("shapeHierarchy").deleteRow(index);
}

// ----------------------- Lyrics ----------------------------------------
//TextLayernp
//const lyricArray = ["I", "Am", "Wheezer's", "Number", "one", "fan", "Also a fellow Don Pollo Enjoyer"];

//Create Textbox by adding a Tag(background) and Text
var textBox = new Konva.Label({
    x: 400,
    y: 180,
    draggable: true,
});

textBox.add(
    new Konva.Tag({
        fill: 'yellow',
        id: 'textBackground',
    })
);

textBox.add(
    new Konva.Text({
        text: "",
        fontSize: 18,
        fontFamily: 'Calibri',
        fill: '#555',
        // padding: 20,
        align: 'center',
        id: 'P1',
        // draggable: true,
    })
);

layer.add(textBox);


// var complexText = new Konva.Text({
//     x: 400,
//     y: 180,
//     text: "",
//     fontSize: 18,
//     fontFamily: 'Calibri',
//     fill: '#555',
//     //width: 300, //without the width it will scale based on text
//     padding: 20,
//     align: 'center',
//     id: 'P1',
//     draggable: true,
// });

// layer.add(complexText);

let lyricArray = []; //Used to store the lines entered in pop-up
let indexVal = -1; //Start at the beggening of the array
var text = layer.find('#P1')[0]; //Used to find the text box and change it's attributes
var textBack = layer.find('#textBackground')[0]; //Used to modify the attributes of a text background

//Populates the array with what the user has typed in and changes the text's properties
function createLyrics () {

    //Grab the values from the text area in the pop-up
    let lyricsTextAreaStuff = document.getElementById("lyricsTextArea").value;

    //Grab the radio buttons and check if the user had selected a colored background
    var lyricBackgroundSelection = document.getElementsByName("lyricBackground");

    //Add the lines to the table
    lyricArray = lyricsTextAreaStuff.split('\n~~~\n');

    //Set the properties (font-color, font-type, size, ...)
    text.setAttr("fontFamily", document.getElementById("lyricFontType").value);
    text.setAttr("fontSize", document.getElementById("lyricFontSize").value);
    text.setAttr("fill", document.getElementById("lyricFontColor").value);

    //Set the properties of the background
    if(lyricBackgroundSelection[1].checked) //If user had selected enable background color 
        textBack.setAttr("fill", document.getElementById("lyricbackgroundColor").value);
    else
        textBack.setAttr("fill", "");

    console.log(lyricArray);
}

//Function dedicated to creating shapes based on user input
var addLyrics = document.getElementById("lyricSubmit");
addLyrics.addEventListener("click", createLyrics);


// -------------------------- Background --------------------------------------

//BackgroundLayer
// let backgroundArray = [
//     {
//         "startTime" : "00:05.2",
//         "contentFile" : "/EditorMedia/nature.jpg"
//     },
//     {
//         "startTime" : "00:10.4",
//         "contentFile" : "/EditorMedia/AmongUs.jpg"
//     },
//     {
//         "startTime" : "00:15.1",
//         "contentFile" : "/EditorMedia/squidward.gif"
//     },
//     {
//         "startTime" : "00:16.2",
//         "contentFile" : "/EditorMedia/CarrieUnderwood.mp4"
//     },
//     {
//         "startTime" : "00:25.2",
//         "contentFile" : "/EditorMedia/nature.jpg"
//     },
// ]

let backgroundArray = [];
let backgroundArrayIndex = 0; //Keeps track of the current background were going to use

// let backgroundStartArray = [];
// let backgroundStartArrayIndex = 0;

// let backgroundEndArray = [];
// let backgroundEndArrayIndex = 0;

var imageCont = document.getElementById('imageContent'); //Used to acces the image element and manipulate it
var videoCont = document.getElementById('videoContent'); //Used to access the video element and manipulate it
videoCont.muted=true; //Ensure that there is no audio coming from video

//Audio
const audio = document.getElementById('musicPlayer');

let submitFile = document.getElementById('fileSubmit');
submitFile.addEventListener("click", createBackground);

// let imageInput = document.getElementById('imgInput').files[0];

// var imageReader = new FileReader();
// imageReader.onload = function(e)  {
//     imageCont.src = e.target.result;
// }
 
// var videoReader = new FileReader();
// videoReader.onload = function(e) {
//     videoCont.src = e.target.result;
// }

// alert("Outside func");
function createBackground(){
    
    //Grab the inputed file
    var BackgroundFileInput = URL.createObjectURL(document.getElementById('imgInput').files[0]);
    var fileName = document.getElementById('imgInput').files[0].name;

    let backgroundStartTime = document.getElementById("backgroundStart").value;
    // let backgroundEndTime = document.getElementById("backgroundEnd").value;

    var backgroundObject = {
        "backgroundStartTime" : backgroundStartTime,
        // "backgroundEndTime"   : backgroundEndTime,
        //"theFile": document.getElementById('imgInput').files[0],
        "contentFile" : BackgroundFileInput,
        "fileName" : fileName,
    }

    backgroundArray.push(backgroundObject);

    //Add the shape to an array that sorted by start time
    
    backgroundArray.sort(function (a, b) {
        return a.backgroundStartTime.localeCompare(b.backgroundStartTime);
    });

    //Add the shape to an array that is sorted by end time
    // backgroundEndArray.push(backgroundObject);
    // backgroundEndArray.sort(function (a, b) {
    //     return a.backgroundEndTime.localeCompare(b.backgroundEndTime);
    // });

    alert("Added file");

    let table = document.getElementById("backgroundHierarchy");

    let template = `
        <tr id="addedBackgroundRow${fileName}" >
            <td id="addedBackgroundName" style="border: 1px solid black;">
                <button id="showBackgroundButton${fileName}" onclick="showEditBackgroundSection('${fileName}')" style="background-color: white; border: none; width: 70px; white-space: nowrap; overflow: hidden;">${fileName}</button>
            </td>
            <td id="addedBackgroundVisible" style="border: 1px solid black;">
                <button class="addedBackgroundNameButton" onclick="modifyBackgroundSight()" style="background-color: white; border: none;"><img style="width: 26px;
                height: 26px;" src='/LoginMedia/EyeShow.png' ></button>
            </td>
            <td id="deleteBackground" style="border: 1px solid black;">
                <button id="deleteBackgroundButton${fileName}" onclick="deleteBackground('${fileName}')" style="background-color: white; border: none;"><img src='/EditorMedia/TrashCan.png' style="width: 26px;
                height: 26px; "></button>
            </td>
        </tr>
    `;

    table.innerHTML += template;
    // imageCont.src = URL.createObjectURL(imageInput.files[0]);
}

export function showEditBackgroundSection(fileName) {
    alert("In the function edit "+ fileName);
    var backgroundObjectFound;

    //Make sure the file input of a prevous edit is gone 
    document.getElementById('editFileInput').value='';

    //Hide the shapePop or others if there not already
    document.getElementById("editShapePopUp").style.setProperty("display", "none");
    

    //Display backgroundpop up if not already
    document.getElementById("editBackgroundPopUp").style.setProperty("display", "block");


    //Find the object that has the fileName
    for(var i=0; i < backgroundArray.length; i++)
    {
        if(backgroundArray[i].fileName==fileName)
            backgroundObjectFound = backgroundArray[i];
    }

    //Populate the fields with the the objects properties
    //Populate the fields with the the objects properties
    document.getElementById('editStartTime').value = backgroundObjectFound.backgroundStartTime;

    //Change the function parementers in button for fileName
    document.getElementById("saveBackgroundButton").onclick = function() {saveBackgroundChanges(fileName)};

    console.log(document.getElementById("saveBackgroundButton"));
}

export function saveBackgroundChanges(fileName){
    var backgroundObjectFound;

    //Find the background object to update
    for(var i=0; i < backgroundArray.length; i++)
    {
        if(backgroundArray[i].fileName==fileName)
            backgroundObjectFound = backgroundArray[i];
    }

    //Change the background objects attributes with the input fieds from the properites panel
    backgroundObjectFound.backgroundStartTime = document.getElementById("editStartTime").value;

    if(document.getElementById('editFileInput').files.length != 0) //If the user has selected a file then don't chnage the objexts propties for the file 
    {
        //Update the background object's file 
        backgroundObjectFound.contentFile = URL.createObjectURL(document.getElementById('editFileInput').files[0]);
        backgroundObjectFound.fileName = document.getElementById('editFileInput').files[0].name;
    
        //Update the file name
        document.getElementById("showBackgroundButton" + fileName).innerHTML = backgroundObjectFound.fileName;
    
        //Update the functions with the new file name

        
        //document.getElementById("showBackgroundButton" + fileName).setAttribute("onclick");

        //document.getElementById('showBackgroundButton' + fileName).removeAttribute('onclick'); //Use this incase the parameters are not being passed. Remove and placing it seemed to do the trick

        document.getElementById("showBackgroundButton" + fileName).setAttribute("onClick", `showEditBackgroundSection('${backgroundObjectFound.fileName}')`);
        //document.getElementById('showBackgroundButton'+fileName).onclick = function() {showEditBackgroundSection(backgroundObjectFound.fileName)}
        document.getElementById("showBackgroundButton" + fileName).id = "showBackgroundButton" + backgroundObjectFound.fileName;
        
        document.getElementById("deleteBackgroundButton" + fileName).setAttribute("onClick", `deleteBackground('${backgroundObjectFound.fileName}')`);
        //document.getElementById("deleteBackgroundButton" + fileName).onclick = function() {deleteBackground(backgroundObjectFound.fileName);};
        document.getElementById("deleteBackgroundButton" + fileName).id = "deleteBackgroundButton" + backgroundObjectFound.fileName;

        //Update the tr id 
        document.getElementById("addedBackgroundRow" + fileName).id = "addedBackgroundRow" + backgroundObjectFound.fileName;

        // console.log(document.getElementById("showBackgroundButton" + backgroundObjectFound.fileName));
        // console.log(document.getElementById("deleteBackgroundButton" + backgroundObjectFound.fileName));
    }
}

export function deleteBackground(fileName) {
    //console.log("Before: " + backgroundArray);
    alert(fileName);
    //Loop through bacround array to find the object that contains file name and delete it
    for(var i = 0; i < backgroundArray.length; i++)
    {
        //compare the current element's filename with the parameter if true delete the object at the index
        if(backgroundArray[i].fileName==fileName)
        {
            //console.log("Found filename");
            backgroundArray.splice(i, 1);
        }
    }
    //console.log("after: " + backgroundArray);

    //Delete the row of the file
    document.getElementById("backgroundHierarchy").deleteRow(document.getElementById("addedBackgroundRow"+fileName).rowIndex);

    //Set the filepath of imageCont and videoCont to be empty so that the background stops showing if it's currently showing when being deleted
    imageCont.src = '';
    videoCont.src = '';

    alert('Delete image');
}

// submitFile.addEventListener("", createBackground);

//Keyboard Event Listner
let paused = true; //Start it out as paused

document.addEventListener('keydown', function(event){
    switch(event.key)
    {
        //Display the next lyric
        case "ArrowRight":
            if(indexVal<lyricArray.length-1)
            {
                indexVal+=1;
                //TextLayer.innerHTML = lyricArray[indexVal];
                //complexText.text = "Hello there partner";
                text.setAttr('text', lyricArray[indexVal]);
                //layer.draw();
            }

            break;
        
        //Display the previous lyric
        case "ArrowLeft":
            if(indexVal>=1)
            {
                indexVal-=1;
                text.setAttr('text', lyricArray[indexVal]);
                //TextLayer.innerHTML = lyricArray[indexVal];
            }
            break;

        //Pause and play the project
        case "p":
            //Flip the state 
            paused=!paused;
           
            if(paused==true) //If we are pausing stop the timer, audio, video(if we are currently using it as background)
            {
                audio.pause();

                if(videoCont.src!="")
                    videoCont.pause();
                //videoCont.pause();
                //alert(audioElement.currentTime);
            }
            else //If we are playing start the timer, video, and audio layers
            {
                //alert("playing");
                audio.play();

                if(videoCont.src!="")
                    videoCont.play();
                //videoCont.play();
            }

            break;

        //If any other button do nothing
        // restart button
        // case "r":

        default:
            return;
    }
});

//Function to display elements at specific times. Called by setInterval
function updateProjectElements(formattedTime){
    //console.log(formattedTime);
    //console.log(text.getAttr('x'));

    //Round the time to the lowest integer
    //var audioTimeStamp = Math.floor(audioElement.currentTime);

    //Display the value to the paragraph. Use this for testing
    // audioTracker.innerHTML = "Audio duration:" + audioTimeStamp;

    //Change Background content if the upcoming background element's start time mathces the audio time
    if(backgroundArray.length!=0 && backgroundArray[backgroundArrayIndex].backgroundStartTime==formattedTime)
    {
        //reader.readAsDataURL(backgroundArray[backgroundIndex].contentFile);
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
    
    // //Stop displaying video or image
    // if(backgroundEndArray.length!=0 && backgroundEndArray[backgroundEndArrayIndex].backgroundEndTime==formattedTime)
    // {
    //     if(backgroundEndArray[backgroundEndArrayIndex].fileName.includes("mp4"))
    //     {
    //         //Display and play video
    //         videoCont.src = "";
    //         videoCont.pause();
    //     }
    //     //else load content to image src
    //     else
    //     {
    //         //Display image
    //         imageCont.src = "";
    //     }


    //     if(backgroundEndArrayIndex < backgroundEndArray.length-1)
    //         backgroundEndArrayIndex+=1;
    // }


    /******************Manage shapes******************/ 
    if(ShapeStartArray.length!=0 && ShapeStartArray[ShapeStartIndex].shapeStartTime==formattedTime) //Display shape when it's start time meets formattedTime
    {
        //Display the shape
        ShapeStartArray[ShapeStartIndex].shape.showKonvaShape();

        //Check if there is any animations for this shape
        //ShapeStartArray[ShapeStartIndex].animation.start(); 
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

    //Get the span element and update the time to it
    const timeDisplay = document.getElementById('audioTimestamp');

    // Update time display every decisecond (100 milliseconds)
    const updateTimer = setInterval(() => {
    //   const currentTime = audio.currentTime * 100;
      //console.log(audio.currentTime);
      const minutes = Math.floor(audio.currentTime / 60);
      const seconds = Math.floor(audio.currentTime % 60);
      const deciseconds = Math.floor((audio.currentTime * 10)) % 10;
    //   console.log(deciseconds);

      // Format time string with leading zeros
      const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${deciseconds.toString().padStart(1, '0')}`;

      timeDisplay.textContent = formattedTime;
    
      updateProjectElements(formattedTime);
      
    }, 10);

    // When audio stops, timer stops
    audio.addEventListener('ended', () => {
      clearInterval(updateTimer);
    });

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------