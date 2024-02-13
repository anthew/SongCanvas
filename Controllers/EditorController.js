// ----------------------- Initializations and Konva canvas setup ----------------------------------------

//Create the stage
var stage = new Konva.Stage({
    container: 'KonvaCanvas',
    width: 1050,
    height: 500, 
});


//Create and add layer to the stage
var layer = new Konva.Layer();
stage.add(layer);

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


    //Determine which type of shape user selected
    if(shapeType=="Polygon")
    {
        var shape = new Konva.RegularPolygon({
            name: shapeName,
            fill: shapeFill_color,
            stroke: shapeStroke,
            strokeWidth: shapeStrokeWidth,
            x: shapeX, 
            y: shapeY,
            radius: shapeRadius,
            sides: shapeSides, 
            visible: false, // Polygons are invisible by default
            opacity: shapeOpacity,
            offset: { //Note the offset variable is used to center the animations 
                shapeX: shapeWidth/2,
                shapeY: shapeHeight/2,
            },
        });    
    }
    else if(shapeType=="Rectangle")
    {
        var shape = new Konva.Rect({
            name: shapeName,
            width: shapeWidth,
            height: shapeHeight,
            fill: shapeFill_color,
            stroke: shapeStroke,
            strokeWidth: shapeStrokeWidth,
            x: shapeX, 
            y: shapeY, 
            visible: false, // Polygons are invisible by default
            opacity: shapeOpacity,
            offset: {
                x: shapeWidth/2,
                y: shapeHeight/2,
            },
        });    
    }

    // assign animation to the shape based on user selection
    if(shapeAnimation_type!="None")
    {
        //Determine if it's any of these options
        if(shapeAnimation_type=="Clockwise")
        {
            shapeAnimation_type = new Konva.Animation(function (frame) {
                shape.rotate(1.5);
            }, layer);
        }
        else if(shapeAnimation_type=="Counter-Clockwise")
        {
            shapeAnimation_type = new Konva.Animation(function (frame) {
                shape.rotate(-1.5);
            }, layer);
        }
    }

    //Add the newly created shape to the canvas
    layer.add(shape);

    //Add the newly created shape to the array
    var newShape = {
        "shapeStartTime" : shapeStartTime,
        "shapeEndTime" : shapeEndTime,
        "shape" : shape, 
        "shapeAnimation" : shapeAnimation_type,
    }

    //Save the shape to array that will be used to store to database 
    ShapeArray.push(newShape);

    //Add the shape to an array that sorted by start time
    ShapeStartArray.push(newShape);
    ShapeStartArray.sort(function (a, b) {
        return a.shapeStartTime.localeCompare(b.shapeStartTime);
    });

    //Add the shape to an array that is sorted by end time
    ShapeEndArray.push(newShape);
    ShapeEndArray.sort(function (a, b) {
        return a.shapeEndTime.localeCompare(b.shapeEndTime);
    });

    let table = document.getElementById("shapeHierarchy");

    let template = `
        <tr id="addedShapeRow" >
            <td id="editShape" style="border: 1px solid black;">
                <button class="editShapeButton" onclick="editShape('${shapeName}', 
                '${shapeWidth}', '${shapeHeight}', '${shapeFill_color}', '${shapeStroke}', 
                '${shapeStrokeWidth}', '${shapeX}', '${shapeY}', '${shapeSides}', 
                '${shapeAnimation_type}', '${shapeOpacity}', '${shapeStartTime}', 
                '${shapeEndTime}', '${shapeType}', ${shapeRadius})" style="background-color: white; border: none;">${shapeName}</button>
            </td>
            <td id="addedShapeVisible" style="border: 1px solid black;">
                <button class="addedShapeNameButton" onclick="modifyShapeSight()" style="background-color: white; border: none;">${shapeWidth}</button>
            </td>
            <td id="deleteShape" style="border: 1px solid black;">
                <button class="deleteShapeButton" onclick="deleteShape()" style="background-color: white; border: none;">${shapeHeight}</button>
            </td>
        </tr>
    `;

    table.innerHTML += template;

    //Inidacte to user that the shape was added
    alert("Shape created");
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

let backgroundStartArray = [];
let backgroundStartArrayIndex = 0;

let backgroundEndArray = [];
let backgroundEndArrayIndex = 0;

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
    let backgroundEndTime = document.getElementById("backgroundEnd").value;

    var backgroundObject = {
        "backgroundStartTime" : backgroundStartTime,
        "backgroundEndTime"   : backgroundEndTime,
        "contentFile" : BackgroundFileInput,
        "fileName" : fileName,
    }

    backgroundArray.push(backgroundObject);

    //Add the shape to an array that sorted by start time
    backgroundStartArray.push(backgroundObject);
    backgroundStartArray.sort(function (a, b) {
        return a.backgroundStartTime.localeCompare(b.backgroundStartTime);
    });

    //Add the shape to an array that is sorted by end time
    backgroundEndArray.push(backgroundObject);
    backgroundEndArray.sort(function (a, b) {
        return a.backgroundEndTime.localeCompare(b.backgroundEndTime);
    });

    alert("Added file");

    let table = document.getElementById("backgroundHierarchy");

    let template = `
        <tr id="addedBackgroundRow" >
            <td id="addedBackgroundName" style="border: 1px solid black;">
                <button class="addedBackgroundNameButton" onclick="addBackgroundName('${fileName}')" style="background-color: white; border: none;">${fileName}</button>
            </td>
            <td id="addedBackgroundVisible" style="border: 1px solid black;">
                <button class="addedBackgroundNameButton" onclick="modifyBackgroundSight()" style="background-color: white; border: none;">${backgroundStartTime}</button>
            </td>
            <td id="deleteBackground" style="border: 1px solid black;">
                <button class="deleteBackgroundButton" onclick="deleteBackground()" style="background-color: white; border: none;">${backgroundEndTime}</button>
            </td>
        </tr>
    `;

    table.innerHTML += template;
    // imageCont.src = URL.createObjectURL(imageInput.files[0]);
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
    if(backgroundStartArray.length!=0 && backgroundStartArray[backgroundStartArrayIndex].backgroundStartTime==formattedTime)
    {
        //reader.readAsDataURL(backgroundArray[backgroundIndex].contentFile);
        //if the current background elemnt to be displayed is a video load it to video element src
        if(backgroundStartArray[backgroundStartArrayIndex].fileName.includes("mp4"))
        {
            //Display and play video
            videoCont.src = backgroundStartArray[backgroundStartArrayIndex].contentFile;
            videoCont.play();
        }
        //else load content to image src
        else
        {
            //Stop video
            videoCont.src="";
            videoCont.pause();

            //Display image
            imageCont.src = backgroundStartArray[backgroundStartArrayIndex].contentFile;
        }
        
        //Increment background index if current index is not at the end of array
        if(backgroundStartArrayIndex < backgroundStartArray.length-1)
            backgroundStartArrayIndex+=1;   
    }
    
    // //Stop displaying video or image
    if(backgroundEndArray.length!=0 && backgroundEndArray[backgroundEndArrayIndex].backgroundEndTime==formattedTime)
    {
        if(backgroundEndArray[backgroundEndArrayIndex].fileName.includes("mp4"))
        {
            //Display and play video
            videoCont.src = "";
            videoCont.pause();
        }
        //else load content to image src
        else
        {
            //Display image
            imageCont.src = "";
        }


        if(backgroundEndArrayIndex < backgroundEndArray.length-1)
            backgroundEndArrayIndex+=1;
    }


    /******************Manage shapes******************/ /*Note to self might need to work on formatted time. Program to slow to make changes in time*/
    if(ShapeStartArray.length!=0 && ShapeStartArray[ShapeStartIndex].shapeStartTime==formattedTime) //Display shape when it's start time meets formattedTime
    {
        //Display the shape
        ShapeStartArray[ShapeStartIndex].shape.show();

        //Check if there is any animations for this shape
        //ShapeStartArray[ShapeStartIndex].animation.start(); 
        if(ShapeStartArray[ShapeStartIndex].shapeAnimation!="None")
            ShapeStartArray[ShapeStartIndex].shapeAnimation.start();

        //Move to the next shape wating to be displayed. Check if we had exceeded the array boundry
        if(ShapeStartIndex < ShapeArray.length-1)
            ShapeStartIndex+=1;
    }

    if(ShapeArray.length!=0 && ShapeEndArray[ShapeEndIndex].shapeEndTime==formattedTime)
    {
        //Hide the shape
        ShapeEndArray[ShapeEndIndex].shape.hide();

        //Stop the shapes animation if applicable
        if(ShapeEndArray[ShapeEndIndex].shapeAnimation!="None")
            ShapeEndArray[ShapeEndIndex].shapeAnimation.stop();
        
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