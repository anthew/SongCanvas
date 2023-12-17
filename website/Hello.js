

//Used for the keypress event logic
let indexVal = -1; //Start at the beggening of the array
let paused = true; //Start it out as paused


/*
    Text Layer
*/
const textArray = ["I", "Am", "Wheezer's", "Number", "one", "fan", "Also a fellow Don Pollo Enjoyer"];


/*
    Dynamic Effects Layer
*/

var stage = new Konva.Stage({
    container: 'KonvaCanvas',
    width: 650,
    height: 500,
});


var layer = new Konva.Layer();

//layer.add(rect1);
stage.add(layer);


var shapes = new Konva.Rect({
    x: 50,
    y: 50,
    width: 100,
    height: 50,
    fill: 'green',
    stroke: 'black',
    strokeWidth: 4,
    name: "shape1",
});

let DynamicShapeArray = [
    {
        "startTime" : 10,
        "shape"     : shapes,
        "type" : "add"
    }
]

//var shape2 = stage.find('.shape1');

var newShapeEvent = {
    "startTime": 25, 
    "shape": shapes,
    "type":"delete"
}

DynamicShapeArray.push(newShapeEvent);
//DynamicShapeArray.push({startTime : 20, shape : stage.find('.' + "shape1"), type: "delete"});

let DesignElemIndex = 0;



/*
    Background Layer
*/
let backgroundArray = [
    {
        "startTime" : 0,
        "contentFile" : "Files/nature.jpg"
    },
    {
        "startTime" : 20,
        "contentFile" : "Files/AmongUs.jpg"
    },
    {
        "startTime" : 40,
        "contentFile" : "Files/squidward.gif"
    },
    {
        "startTime" : 50,
        "contentFile" : "Files/AmazingGrace.mp4"
    },
    {
        "startTime" : 60,
        "contentFile" : "Files/nature.jpg"
    },

]

let backgroundIndex = 0; //Keeps track of the current background were going to use

var imageCont = document.getElementById('imageContent'); //USed to acces the image element and manipulate it

var videoCont = document.getElementById('videoContent'); //Used to access the video element and manipulate it
videoCont.muted=true; //Ensure that there is no audio coming from video 


/*
    Audio
*/
var audioElement = document.getElementById('musicPlayer'); //Used to manipulate the audio element
var audioTracker = document.getElementById('audioTimeTracker'); //Display the current song time

//Read for any specific keys
document.addEventListener('keydown', function(event){
    switch(event.key)
    {
        //Display the next lyric
        case "ArrowRight":
            if(indexVal<textArray.length-1)
            {
                indexVal+=1;
                TextLayer.innerHTML = textArray[indexVal];
                //TextLayer.style["color"] = "white"; 
            }

            break;
        
        //Display the previous lyric
        case "ArrowLeft":
            if(indexVal>=1)
            {
                indexVal-=1;
                TextLayer.innerHTML = textArray[indexVal];
            }
            break;

        //Pause and play the project
        case "p":
            //Flip the state 
            paused=!paused;
           
            if(paused==true) //If we are pausing stop the timer, audio, video(if we are currently using it as background)
            {
                audioElement.pause();
                videoCont.pause();
                //alert(audioElement.currentTime);
            }
            else //If we are playing start the timer, video, and audio layers
            {
                //alert("playing");
                audioElement.play();
                videoCont.play();
            }

            break;

        default:
            return;
    }
});


//Function used to update screen with corresponding elements based on the audio's time
audioElement.ontimeupdate = function(){updateScreenElement()};

function updateScreenElement(){
    //Round the time to the lowest integer
    var audioTimeStamp = Math.floor(audioElement.currentTime);

    //Display the value to the paragraph. Use this for testing
    audioTracker.innerHTML = "Audio duration:" + audioTimeStamp;

    //Change Background content if the upcoming background element's start time mathces the audio time
    if(backgroundArray[backgroundIndex].startTime==audioTimeStamp)
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
        
        backgroundIndex+=1;   
    }

    //Add, modify, delete design elements
    if(DynamicShapeArray[DesignElemIndex].startTime==audioTimeStamp)
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

        DesignElemIndex+=1;
    }
}
//Modify Lyrics
