//Create the stage
var stage = new Konva.Stage({
    container: 'KonvaCanvas',
    width: 1050,
    height: 500, 
});


//Create and add layer to the stage
var layer = new Konva.Layer(); 
stage.add(layer);

//Test if the canvas is working
var shapes = new Konva.Rect({
    x: 0,
    y: 0,
    width: 100,
    height: 50,
    fill: 'green',
    stroke: 'black',
    strokeWidth: 1,
    name: "shape1",
});

layer.add(shapes);

//Testing with animation 
// var anim = new Konva.Animation(function (frame) {
//     var angleDiff = (frame.timeDiff * 90) / 1000;
//     shapes.rotate(angleDiff);
//   }, layer);

// anim.start();

//Function deticated to creating shapes based on user input
var addShapeToScreenButton = document.getElementById("shapeSubmit");
addShapeToScreenButton.addEventListener("click", createRectangle);

//
let ShapeArray = []

function createRectangle()
{
    let name = document.getElementById("name").value;
    let width = document.getElementById("width").value;
    let height = document.getElementById("height").value;
    let fill_color = document.getElementById("fill").value;
    let stroke = document.getElementById("stroke").value;
    let strokeWidth = document.getElementById("strokeWidth").value;
    let x = document.getElementById("x").value;
    let y = document.getElementById("y").value;

    //Testing
    
     
    alert("Shape added");
    var rect = new Konva.Rect({
        name: name,
        width: width,
        height: height,
        fill: fill_color,
        stroke: stroke,
        strokeWidth: strokeWidth,
        x: x,
        y: y,
        visable: false
    });

    //Add the newly created shape to the canvas
    layer.add(rect);

    // //Add the newly created shape to the array
    // var newShape = {
    //     "startTime":
    // }
}

//TextLayer
const lyricArray = ["I", "Am", "Wheezer's", "Number", "one", "fan", "Also a fellow Don Pollo Enjoyer"];
let indexVal = -1; //Start at the beggening of the array

//BackgroundLayer
let backgroundArray = [
    {
        "startTime" : "00:05.20",
        "contentFile" : "/Files/nature.jpg"
    },
    {
        "startTime" : "00:10.40",
        "contentFile" : "/Files/AmongUs.jpg"
    },
    {
        "startTime" : "00:15.10",
        "contentFile" : "/Files/squidward.gif"
    },
    {
        "startTime" : "00:16.20",
        "contentFile" : "/Files/CarrieUnderwood.mp4"
    },
    {
        "startTime" : "00:54.27",
        "contentFile" : "/Files/nature.jpg"
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
                TextLayer.innerHTML = lyricArray[indexVal];
                //TextLayer.style["color"] = "white"; 
            }

            break;
        
        //Display the previous lyric
        case "ArrowLeft":
            if(indexVal>=1)
            {
                indexVal-=1;
                TextLayer.innerHTML = lyricArray[indexVal];
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

        default:
            return;
    }
});

//Function to display elements at specific times. Called by setInterval
function updateProjectElements(formattedTime){
    console.log(formattedTime);
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
        
        if(backgroundIndex < backgroundArray.length-1)
            backgroundIndex+=1;   
    } 

    /*
    //Add, modify, delete design elements
    if(DynamicShapeArray[DesignElemIndex].startTime==formattedTime)
    {

        //If the type is Add
        if(DynamicShapeArray[DesignElemIndex].type == "add")
            layer.add(DynamicShapeArray[DesignElemIndex].shape);

        //If the type is Modify
        else if(DynamicShapeArray[DesignElemIndex].type == "modify")
        {

        }
        //If the type is delete
        else 
        {
            DynamicShapeArray[DesignElemIndex].shape.destroy();
            layer.draw();
        }

        if(DesignElemIndex < DynamicShapeArray.length-1)
            DesignElemIndex+=1;
    }
    */
} 

    //Get the span element and update the time to it
    const timeDisplay = document.getElementById('audioTimestamp');

    // Update time display every centisecond (10 milliseconds)
    const updateTimer = setInterval(() => {
      const currentTime = audio.currentTime * 100;
      const minutes = Math.floor(currentTime / 6000);
      const seconds = Math.floor((currentTime % 6000) / 100);
      const centiseconds = Math.floor((currentTime % 100));

      // Format time string with leading zeros
      const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;

      timeDisplay.textContent = formattedTime;
    
      updateProjectElements(formattedTime);
      
    }, 10);

    // When audio stops, timer stops
    audio.addEventListener('ended', () => {
      clearInterval(updateTimer);
    });