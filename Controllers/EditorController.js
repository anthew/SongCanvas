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

//Function deticated to creating shapes based on user input
var addShapeToScreenButton = document.getElementById("shapeSubmit");
addShapeToScreenButton.addEventListener("click", createPolygon);

//Array to hold shapes user has added 
let ShapeArray = []; //Holds the information of a shape and it's start time, end time, and animation
let ShapeArrayIndex = 0;

let ShapeStartArray = []; //Used to keep track of the shapes from earliest start time to latest start time
let ShapeStartIndex = 0;

let ShapeEndArray = []; //Used to keep track of the shapes from earliest end time to the latest end time
let ShapeEndIndex = 0;


function createPolygon()
{
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

    //Testing
    let shapeStartTime = document.getElementById("shapeStart-Time").value;
    let shapeEndTime = document.getElementById("shapeEnd-Time").value;
    //Note the offset variable is used to center the animations 
    var polygon = new Konva.RegularPolygon({
        name: shapeName,
        width: shapeWidth,
        height: shapeHeight,
        fill: shapeFill_color,
        stroke: shapeStroke,
        strokeWidth: shapeStrokeWidth,
        x: shapeX, 
        y: shapeY,
        sides: shapeSides, 
        visible: false, // Polygons are invisible by default
        opacity: shapeOpacity,
        offset: {
            shapeX: shapeWidth/2,
            shapeY: shapeHeight/2,
        },
    });    
    // 
    // assign animation to the shape based on user selection
    if(shapeAnimation_type!="None")
    {
        //Determine if it's any of these options
        if(shapeAnimation_type=="Clockwise")
        {
            
            shapeAnimation_type = new Konva.Animation(function (frame) {
                polygon.rotate(1.5);
            }, layer);
        }
        else if(shapeAnimation_type=="Counter-Clockwise")
        {
            shapeAnimation_type = new Konva.Animation(function (frame) {
                polygon.rotate(-1.5);
            }, layer);
        }
    }

    //Add the newly created shape to the canvas
    layer.add(polygon);

    //Add the newly created shape to the array
    var newShape = {
        "shapeStartTime" : shapeStartTime,
        "shapeEndTime" : shapeEndTime,
        "shape" : polygon, 
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

    //Inidacte to user that the shape was added
    alert("Shape created");
}

// ----------------------- Lyrics ----------------------------------------
//TextLayernp
//const lyricArray = ["I", "Am", "Wheezer's", "Number", "one", "fan", "Also a fellow Don Pollo Enjoyer"];
var complexText = new Konva.Text({
    x: 400,
    y: 180,
    text: "",
    fontSize: 18,
    fontFamily: 'Calibri',
    fill: '#555',
    width: 300, //without the width it will scale based on text
    padding: 20,
    align: 'center',
    id: 'P1',
    draggable: true,
});

layer.add(complexText);

let lyricArray = []; //Used to store the lines entered in pop-up
let indexVal = -1; //Start at the beggening of the array
var text = layer.find('#P1')[0]; //Used to find the text box and change it's attributes

//Populates the array with what the user has typed in and changes the text's properties
function createLyrics () {

    //Grab the values from the text area in the pop-up
    let lyricsTextAreaStuff = document.getElementById("lyricsTextArea").value;

    //Add the lines to the table
    lyricArray = lyricsTextAreaStuff.split('\n');

    //Set the properties (font-color, font-type, size, ...)
    text.setAttr("fontFamily", document.getElementById("lyricFontType").value);
    text.setAttr("fontSize", document.getElementById("lyricFontSize").value);
    text.setAttr("fill", document.getElementById("lyricFontColor").value);

    console.log(lyricArray);
}

//Function deticated to creating shapes based on user input
var addLyrics = document.getElementById("lyricSubmit");
addLyrics.addEventListener("click", createLyrics);


// -------------------------- Background --------------------------------------
//BackgroundLayer
let backgroundArray = [

    {
        "startTime" : "00:05.2",
        "contentFile" : "/EditorMedia/nature.jpg"
    },
    {
        "startTime" : "00:10.4",
        "contentFile" : "/EditorMedia/AmongUs.jpg"
    },
    {
        "startTime" : "00:15.1",
        "contentFile" : "/EditorMedia/squidward.gif"
    },
    {
        "startTime" : "00:16.2",
        "contentFile" : "/EditorMedia/CarrieUnderwood.mp4"
    },
    {
        "startTime" : "00:25.2",
        "contentFile" : "/EditorMedia/nature.jpg"
    },
]



let backgroundIndex = 0; //Keeps track of the current background were going to use
var imageCont = document.getElementById('imageContent'); //Used to acces the image element and manipulate it
var videoCont = document.getElementById('videoContent'); //Used to access the video element and manipulate it
videoCont.muted=true; //Ensure that there is no audio coming from video

//Audio
const audio = document.getElementById('musicPlayer');

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
                videoCont.pause();
                //alert(audioElement.currentTime);
            }
            else //If we are playing start the timer, video, and audio layers
            {
                //alert("playing");
                audio.play();
                videoCont.play();
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
    if(backgroundArray[backgroundIndex].startTime==formattedTime)
    {
        //if the current background elemnt to be displayed is a video load it to video element src
        if(backgroundArray[backgroundIndex].contentFile.includes("mp4"))
        {
            //load the video
            videoCont.src = backgroundArray[backgroundIndex].contentFile;

            //play the video
            videoCont.play();
        }
        //else load content to image src
        else
        {
            //Ensure there is no video playing and we got rid of the src
            videoCont.src = "";
            videoCont.pause();

            //Update the background image
            imageCont.src=backgroundArray[backgroundIndex].contentFile;
        }
        
        //Increment background index if current index is not at the end of array
        if(backgroundIndex < backgroundArray.length-1)
            backgroundIndex+=1;   
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
      console.log(deciseconds);

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
