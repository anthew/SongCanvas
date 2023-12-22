//Used for the keypress event logic
let indexVal = -1; //Start at the beggening of the array
let paused = true; //Start it out as paused


/*
    Text Layer
*/
const lyricArray = ["I", "Am", "Wheezer's", "Number", "one", "fan", "Also a fellow Don Pollo Enjoyer"];


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


var shape = new Konva.Rect({
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
        "startTime" : "00:10.20",
        "shape" : shape,
        "type" : "add"
    }
]

//var shape2 = stage.find('.shape1');

var newShapeEvent = {
    "startTime" : "00:13.29", 
    "shape" : shape,
    "type" : "delete"
}

DynamicShapeArray.push(newShapeEvent);
//DynamicShapeArray.push({startTime : 20, shape : stage.find('.' + "shape1"), type: "delete"});

let DesignElemIndex = 0;



/*
    Background Layer
*/
let backgroundArray = [
    {
        "startTime" : "00:05.20",
        "contentFile" : "Files/nature.jpg"
    },
    {
        "startTime" : "00:10.40",
        "contentFile" : "Files/AmongUs.jpg"
    },
    {
        "startTime" : "00:15.10",
        "contentFile" : "Files/squidward.gif"
    },
    {
        "startTime" : "00:16.20",
        "contentFile" : "Files/AmazingGrace.mp4"
    },
    {
        "startTime" : "00:17.27",
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
//var audioElement = document.getElementById('musicPlayer'); //Used to manipulate the audio element
//var audioTracker = document.getElementById('audioTimeTracker'); //Display the current song time

const audio = document.getElementById('musicPlayer');
//Read for any specific keys
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


//Function used to update screen with corresponding elements based on the audio's time
// audioElement.ontimeupdate = function(){updateProjectElements(formattedTime)};

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
} 

/**
 * Anthony's Code
 */
    
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