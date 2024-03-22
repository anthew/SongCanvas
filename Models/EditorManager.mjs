import {Polygon} from './Polygon.mjs';
import {Rectangle} from './Rectangle.mjs';
import { Logo } from './Logo.mjs';
import { Background } from './Background.mjs';
import { Lyrics } from './Lyrics.mjs';
import { Clockwise } from './Clockwise.mjs';
import { CounterClockwise } from './CounterClockwise.mjs';
import { AnimationStrategy } from './Strategy.mjs';
import { Bouncing } from './Bouncing.mjs';
import { Circular } from './Circular.mjs';

//C:\Users\valle\Desktop\EJ's Code\SongCanvas\node_modules\konva

//import { stage, layer } from '//EditorController.mjs';
//import { stage, layer } from '../Controllers/EditorController.mjs';
// ----------------------- Initializations and Konva canvas setup ----------------------------------------

//Calcualte the size of the stage

//var canvasWidth = window.innerWidth * (parseInt(document.getElementById("CanvasColumn").getAttribute('width'))/100);
//canvasWidth-16 test this later
//console.log(canvasWidth);

//Create the stage

//console.log(Konva.isBrowser);

//Determine if we are running on browser (true). Or testing using node (false)
if(Konva.isBrowser==true)
{
    var stage = new Konva.Stage({
        container: 'KonvaCanvas',
        width: 1050,
        height: 500, 
    });

    //Create and add layer to the stage
    var layer = new Konva.Layer();
    stage.add(layer);
}
else
{
    var stage = new Konva.Stage({
        width: 1050,
        height: 500, 
    });
    
    var layer = new Konva.Layer();
    stage.add(layer);
}

// var canvas = document.createElement('canvas');

// // Use gifler to parse and draw the GIF animation
// function onDrawFrame(ctx, frame) {
//     // Update canvas size
//     canvas.width = 100;
//     canvas.height = 100;

//     // Draw the frame onto the canvas
//     ctx.drawImage(frame.buffer, 0, 0);

//     // Redraw the Konva layer
//     layer.draw();
// }

// // Load the GIF (replace with your own GIF URL)
// gifler('/EditorMedia/squidward.gif').frames(canvas, onDrawFrame);

// // Draw the resulting canvas as a Konva.Image
// var image = new Konva.Image({
//     image: canvas,
//     draggable: true,
// });

// layer.add(image);

// ---------------------- Logo ------------------------------------------

// ----------------------- Shapes ----------------------------------------

//Array to hold shapes user has added 
//let ShapeArray = []; //Holds the information of a shape and it's start time, end time, and animation
let ShapeArrayIndex = 0;

//let ShapeStartArray = []; //Used to keep track of the shapes from earliest start time to latest start time
let ShapeStartIndex = 0;

//let ShapeEndArray = []; //Used to keep track of the shapes from earliest end time to the latest end time
let ShapeEndIndex = 0;


// -------------------------- Background --------------------------------------

//let backgroundArray = [];
let backgroundArrayIndex = 0; //Keeps track of the current background were going to use

// ----------------------- Lyrics ----------------------------------------
let lyricArray = []; //Used to store the lines entered in pop-up
let indexVal = -1; //Start at the beggening of the array
var text; //= layer.find('#P1')[0]; //Used to find the text box and change it's attributes

//var textBack = layer.find('#textBackground')[0]; //Used to modify the attributes of a text background
var lyricsObj;


//EditorManager Class
export class EditorManager{

    constructor()
    {
        this.backgroundArray = [];

        this.ShapeArray = [];
        this.ShapeStartArray = [];
        this.ShapeEndArray = [];
    }

    //****************************************************Logo Functions and properites**********************************************
    createLogo(logoName, logoPic, logoWidth, logoHeight, logoX, logoY, logoOpacity){
        if(logoX >= 1050 && logoX <= 0) {
            alert(logoX + " cannot be added. Dimensions are out of range.");
        }
    
        if(logoY >= 500 && logoY <= 0) {
            alert(logoY + " cannot be added. Dimensions are out of range.");
        }
    
        //Create the logo object
        this.LogoObject = new Logo(logoName, logoPic, logoWidth, logoHeight, logoX, logoY, logoOpacity);
    
        //Add the new logo object to the stage
        layer.add(this.LogoObject.getKonvaLogo());
    }

    getLogoObject()
    {
        return this.LogoObject;
    }

    changeLogoVisibility()
    {
        this.LogoObject.getKonvaLogo().setAttr("visible",!this.LogoObject.getKonvaLogo().getAttr("visible"));
    }

    deleteLogo()
    {
        //Remove logo object from stage
        this.LogoObject.getKonvaLogo().destroy();

        //Set logoObject to undefined
        this.LogoObject = undefined;
    }

    

    //Design Element functions and properties
    checkOutOfBounds(shapeX, shapeY)
    {
        if(shapeX > 1050 || shapeX < 0) {
            //alert(shapeX + " cannot be added. Out of range");
            return true;
        }
        
        if(shapeY > 500 || shapeY < 0) {
            //alert(shapeY + " cannot be added. Out of range");
            return true;
        }

        //Shape is not out of bounds
        return false;
    }

    //*************************************************Design Element Functions and properites******************************************
    createShape(shapeName, shapeWidth, shapeHeight, shapeFill_color, shapeStroke, shapeStrokeWidth, shapeX, shapeY, shapeSides, shapeAnimation_type, shapeOpacity, shapeStartTime, shapeEndTime, shapeType, shapeRadius)
    {
        //For every shape in ShapeArray check if there are any duplicates
        for(var i = 0; i < this.ShapeArray.length; i++){

            //If the name is already existing 
            if(this.ShapeArray[i].shapeName==shapeName)
            {
                return true;//duplicatNameFound=true;
            } //
        }

        //Check if the x and y are within the stage
        if(this.checkOutOfBounds(shapeX, shapeY)==true)
        {
            return true;
        }

        var shape;
        
        //Determine which type of shape user selected
        if(shapeType=="Polygon")
        {
            shape = new Polygon(shapeName, shapeType, shapeX, shapeY, shapeStartTime, shapeEndTime, shapeFill_color, shapeStroke, shapeStrokeWidth, shapeAnimation_type, shapeOpacity, shapeRadius, shapeSides);
            //shape.instantiateKonvaShape();
        }
        else if(shapeType=="Rectangle")
        {
            shape = new Rectangle(shapeName, shapeType, shapeX, shapeY, shapeStartTime, shapeEndTime, shapeFill_color, shapeStroke, shapeStrokeWidth, shapeAnimation_type, shapeOpacity, shapeHeight, shapeWidth);
            //shape.instantiateKonvaShape();
        }

        var AnimationStrat;

        // assign animation to the shape based on user selection
        if(shapeAnimation_type!="None")
        {
            //Determine if it's any of these options
            if(shapeAnimation_type=="Clockwise")
            {
                AnimationStrat = new AnimationStrategy(new Clockwise(), layer);
                // shape.setAnimation(
                //     // new Konva.Animation(function (frame) {
                //     //     shape.getKonvaShape().rotate(1.5);
                //     // }, layer)
                //     //animationObject;
                //     AnimationStrat.getAnimationObjectStrategy(shape)
                // );

                AnimationStrat.getAnimationObjectStrategy(shape);

                //shape.setAnimation(animation);

                //console.log(shape.getAnimation());
            }
            else if (shapeAnimation_type == "Counter-Clockwise") {
                //AnimationStrat = new AnimationStrategy(new CounterClockwise());
                // shape.setAnimation(
                //     new Konva.Animation(function (frame) {
                //         shape.getKonvaShape().rotate(-1.5);
                //     }, layer)
                   
                // );
                // var CCStrat;
                AnimationStrat = new AnimationStrategy(new CounterClockwise(), layer);
                AnimationStrat.getAnimationObjectStrategy(shape);
            }
            else if(shapeAnimation_type =="Bouncing")
            {
                // console.log("In the bounce");

                AnimationStrat = new AnimationStrategy(new Bouncing(), layer);
                AnimationStrat.getAnimationObjectStrategy(shape);
                // shape.startAnimation(
                //     AnimationStrat.getAnimationObjectStrategy(shape)
                // );
            }
            else if(shapeAnimation_type == "Circular")
            {
                AnimationStrat = new AnimationStrategy(new Circular(), layer);
                AnimationStrat.getAnimationObjectStrategy(shape);
            }
        }

        //Add the newly created shape to the canvas
        layer.add(shape.getKonvaShape());

        //Add the newly created shape to the array
        var newShape = {
            "shapeStartTime": shape.getStartTime(),
            "shapeEndTime": shape.getEndTime(),
            "shape": shape,
            "shapeAnimation": shapeAnimation_type,
            "shapeName": shapeName,
            "shapeType" : shapeType,
        }

        //Save the shape to array that will be used to store to database 
        this.ShapeArray.push(newShape);

        //Add the shape to an array that sorted by start time
        this.ShapeStartArray.push(newShape);
        this.ShapeStartArray.sort(function (a, b) {
            return a.shape.getStartTime().localeCompare(b.shape.getStartTime());
        });

        //Add the shape to an array that is sorted by end time
        this.ShapeEndArray.push(newShape);
        this.ShapeEndArray.sort(function (a, b) {
            return a.shape.getEndTime().localeCompare(b.shape.getEndTime());
        });

        return false;
    }

    deleteShape(shapeName)
    {
        //Find the shape in the layer
        var shape;
        
        var ShapeClassObject; 
        //Do a for loop to find the shape based on shape name
        for(var i = 0; i < this.ShapeArray.length; i++){
            if(this.ShapeArray[i].shapeName == shapeName)
            {
                shape = this.ShapeArray[i].shape.getKonvaShape();
                ShapeClassObject = this.ShapeArray[i];
            }
        }

        //Delete entry relanted to shape in shapeArray, ShapeStarAarray, and ShapeEndArray
        var shapeIndex = this.ShapeArray.findIndex(p=>p.shapeName == shapeName);
        var shapeStartIndex = this.ShapeStartArray.findIndex(p=>p.shapeName == shapeName);
        var shapeEndIndex = this.ShapeEndArray.findIndex(p=>p.shapeName == shapeName);

        this.ShapeArray.splice(shapeIndex, 1);
        this.ShapeStartArray.splice(shapeStartIndex, 1);
        this.ShapeEndArray.splice(shapeEndIndex, 1);
        
        //Destory the shape
        shape.destroy();
    }

    modifyShapeSight(shapeName)
    {
        var shape = this.getShapeObject(shapeName).getKonvaShape();

        //Change the shape visibility
        shape.setAttr("visible",!shape.getAttr("visible"));
    }

    getVisibility(shapeName)
    {
        return this.getShapeObject(shapeName).getKonvaShape().getAttr("visible");
    }

    //Move a majority of this function to the controller since it's just polulating the fields of an existing shapes attributes. 
    // Should just return the shape from the for loop to the requestShowEditShapeSection in the Controller
    getShapeObject(shapeName)
    {
        //Grab the shape to access it's properites
        // var shape = stage.find('.' + shapeName)[0];
        var ShapeClassObject;
        for(var i = 0; i < this.ShapeArray.length; i++){
            if(this.ShapeArray[i].shapeName == shapeName)
            {
                //shape = ShapeArray[i].shape.getKonvaShape();
                ShapeClassObject = this.ShapeArray[i].shape;
            }
        }
        
        return ShapeClassObject;
    }

    saveShapeChanges(shapeName, shapeType, newShapeName, shapeWidth, shapeHeight, shapeFill_color, shapeStroke, shapeStrokeWidth, shapeX, shapeY, shapeSides, shapeAnimation_type, shapeOpacity, shapeStartTime, shapeEndTime, shapeRadius)
    {
        var ShapeClassObject; 

        //Do a for loop to find the shape based on shape name
        for(var i = 0; i < this.ShapeArray.length; i++){
            if(this.ShapeArray[i].shapeName == shapeName)
            {
                ShapeClassObject = this.ShapeArray[i].shape;
            }
        }
        
        //Determine what type of shape we're acessing
        if(shapeType == "Rectangle")
        {
            //Modify the konva shape values 
            ShapeClassObject.getKonvaShape().setAttr('width', shapeWidth);
            ShapeClassObject.getKonvaShape().setAttr('height', shapeHeight);

            //Update the offset tof the konva shape to ensure it still amintains it's center point
            ShapeClassObject.getKonvaShape().setAttr("offset", {x: shapeWidth/2, y: shapeHeight/2});
        }
        else if(shapeType == "Polygon")
        {
            ShapeClassObject.getKonvaShape().setAttr("sides", shapeSides);
            ShapeClassObject.getKonvaShape().setAttr("radius", shapeRadius);
        }

        //Handle the rest of the common attributes

        ShapeClassObject.setShapeName(newShapeName);

        ShapeClassObject.getKonvaShape().setAttr("fill", shapeFill_color);
        
        ShapeClassObject.getKonvaShape().setAttr("stroke", shapeStroke);
        
        //ShapeClassObject.setBorderWidth(document.getElementById("editShapeStrokeWidth").value);
        ShapeClassObject.getKonvaShape().setAttr("strokeWidth", shapeStrokeWidth);
        
        //ShapeClassObject.setX_loc(document.getElementById("editShapeX").value);
        ShapeClassObject.getKonvaShape().setAttr("x", Number(shapeX));
        
        //ShapeClassObject.setY_loc(document.getElementById("editShapeY").value);
        ShapeClassObject.getKonvaShape().setAttr("y", Number(shapeY));
        
        //ShapeClassObject.setShapeOpacity(document.getElementById("editShapeOpacity").value);
        ShapeClassObject.getKonvaShape().setAttr("opacity", shapeOpacity);

        // Get the selected animation type from the dropdown
        const shapeAnimationType = shapeAnimation_type;

        // Apply animation based on the selected type
        // if (shapeAnimationType != "None") {
            let animationObject;
            let AnimationStrat;

            if(ShapeClassObject.getAnimationType()!="None")
                ShapeClassObject.stopAnimation();

            if (shapeAnimationType == "Clockwise") {
                // Apply Clockwise animation logic here

                //ShapeClassObject.stopAnimation();

                AnimationStrat = new AnimationStrategy(new Clockwise(), layer);

                AnimationStrat.getAnimationObjectStrategy(ShapeClassObject);
                // animationObject = new Konva.Animation(function (frame) {
                //     ShapeClassObject.getKonvaShape().rotate(1.5);
                // }, layer);

                ShapeClassObject.setAnimationType("Clockwise");
            } else if (shapeAnimationType == "Counter-Clockwise") {
                // Apply Counter-Clockwise animation logic here
                //ShapeClassObject.stopAnimation();

                AnimationStrat = new AnimationStrategy(new CounterClockwise(), layer);
                AnimationStrat.getAnimationObjectStrategy(ShapeClassObject); 

                // animationObject = new Konva.Animation(function (frame) {
                //     ShapeClassObject.getKonvaShape().rotate(-1.5);
                // }, layer);

                ShapeClassObject.setAnimationType("Counter-Clockwise");
            } 
            else if (shapeAnimationType == "Bouncing"){
                AnimationStrat = new AnimationStrategy(new Bouncing, layer);
                AnimationStrat.getAnimationObjectStrategy(ShapeClassObject); 

                ShapeClassObject.setAnimationType("Bouncing");
            }
            else if(shapeAnimationType == "Circular"){
                AnimationStrat = new AnimationStrategy(new Circular(), layer);
                AnimationStrat.getAnimationObjectStrategy(ShapeClassObject);

                ShapeClassObject.setAnimationType("Circular");
            }
            else if (shapeAnimationType == "None") { //When the animatiion type is none
                // animationObject = new Konva.Animation(function (frame) {
                //     ShapeClassObject.getKonvaShape().rotate(0);
                // }, layer);

                //If the current shape is using clockwise, ccw, bouncing, circular call stop
                if(ShapeClassObject.getAnimationType()!="None")
                    ShapeClassObject.getAnimation().stop();

                ShapeClassObject.setAnimationType("None");
            }
            // else if (shapeAnimationType == "Bounce")
        
            // Set the animation object
            //ShapeClassObject.setAnimation(animationObject);
        
            // Start the animation
            if(ShapeClassObject.getAnimationType()!="None")
                ShapeClassObject.getAnimation().start();

        // } else {
        //     // If the selected animation type is "None", remove any existing animation
        //     ShapeClassObject.setAnimation(null);
        // }

        ShapeClassObject.setStartTime(shapeStartTime);
        ShapeClassObject.setEndTime(shapeEndTime);
        

        //Update the startTime, EndTime, and name for the shapeArray, shapeStartArray, and shapeEndArray
        var shapeIndex = this.ShapeArray.findIndex(p=>p.shapeName == shapeName);
        var shapeStartIndex = this.ShapeStartArray.findIndex(p=>p.shapeName == shapeName);
        var shapeEndIndex = this.ShapeEndArray.findIndex(p=>p.shapeName == shapeName);

        this.ShapeArray[shapeIndex].shapeName = newShapeName;
        this.ShapeArray[shapeIndex].shapeStartTime = shapeStartTime;
        this.ShapeArray[shapeIndex].shapeEndTime = shapeEndTime;
        this.ShapeArray[shapeIndex].shapeAnimation = shapeAnimationType;

        this.ShapeStartArray[shapeStartIndex].shapeName = newShapeName;
        this.ShapeStartArray[shapeStartIndex].shapeStartTime = shapeStartTime;
        this.ShapeStartArray[shapeStartIndex].shapeEndTime = shapeEndTime;
        this.ShapeStartArray[shapeStartIndex].shapeAnimation = shapeAnimationType;

        this.ShapeEndArray[shapeEndIndex].shapeName = newShapeName;
        this.ShapeEndArray[shapeEndIndex].shapeStartTime = shapeStartTime;
        this.ShapeEndArray[shapeEndIndex].shapeEndTime = shapeEndTime;
        this.ShapeEndArray[shapeEndIndex].shapeAnimation = shapeAnimationType;
    }

    getShapeArray()
    {
        return this.ShapeArray;
    }

    getShapeStartArray()
    {
        return this.ShapeStartArray;
    }

    getShapeEndArray()
    {
        return this.ShapeEndArray;
    }

    hideAllShapes()
    {
        for(var i = 0; i < this.ShapeArray.length; i++){
            
            //shape = ShapeArray[i].shape.getKonvaShape();
            this.ShapeArray[i].shape.getKonvaShape().setAttr("visible", false);
        }
    }

    //*****************************Lyrics functions and properties************************************************
    createLyrics(lyricsTextAreaStuff, lyricBackgroundColor, FontColor, FontSize, FontType){
        //Add the lines to the table
        lyricArray = lyricsTextAreaStuff.split('\n~~~\n');
    
        //Create the Lyrics
        this.lyricsObj = new Lyrics(lyricBackgroundColor, FontColor, FontType, FontSize);
    
        //Add lyrics to the stage and get the text object
        layer.add(this.lyricsObj.getKonvaTextBox());
        text = this.lyricsObj.getKonvaText();
    }

    removeLyrics()
    {
        //Delete the text box from the stage
        this.lyricsObj.getKonvaTextBox().destroy();

        //Set the lyric array to empty
        lyricArray = [];
    }

    changeLyricVisibility()
    {
        this.lyricsObj.getKonvaTextBox().setAttr("visible",! this.lyricsObj.getKonvaTextBox().getAttr("visible"));
    }

    getLyricArray()
    {
        return lyricArray;
    }

    getTextObject()
    {
        return text;
    }

    getLyricObject()
    {
        return this.lyricsObj;
    }

    //*********************************************Background functions and properties******************************************
    createBackground(BackgroundFileInput, fileName, backgroundStartTime){
        var backgroundObject = new Background(BackgroundFileInput, fileName, backgroundStartTime);
        
        this.backgroundArray.push(backgroundObject.getBackgroundObject());
    
        //Add the shape to an array that sorted by start time
        
        this.backgroundArray.sort(function (a, b) {
            return a.backgroundStartTime.localeCompare(b.backgroundStartTime);
        });
    }

    // showEditBackgroundSection(fileName) {
    //     //alert("In the function edit "+ fileName);
    //     var backgroundObjectFound;
    
    //     //Make sure the file input of a prevous edit is gone 
    //     document.getElementById('editFileInput').value='';
    
    //     //Hide the shapePop or others if there not already
    //     document.getElementById("editShapePopUp").style.setProperty("display", "none");
        
    //     //Display backgroundpop up if not already
    //     document.getElementById("editBackgroundPopUp").style.setProperty("display", "block");
    
    
    //     //Find the object that has the fileName
    //     for(var i=0; i < backgroundArray.length; i++)
    //     {
    //         if(backgroundArray[i].fileName==fileName)
    //             backgroundObjectFound = backgroundArray[i];
    //     }
    
    //     //Populate the fields with the the objects properties
    //     document.getElementById('editStartTime').value = backgroundObjectFound.backgroundStartTime;
    
    //     //Change the function parementers in button for fileName
    //     document.getElementById("saveBackgroundButton").onclick = function() {requestSaveBackgroundChanges(backgroundObjectFound.fileName)};
    
    //     console.log(document.getElementById("saveBackgroundButton"));
    // }

    deleteBackground(fileName) {
        //console.log("Before: " + backgroundArray);
        // alert(fileName);
        //Loop through bacround array to find the object that contains file name and delete it
        for(var i = 0; i < this.backgroundArray.length; i++)
        {
            //compare the current element's filename with the parameter if true delete the object at the index
            if(this.backgroundArray[i].fileName==fileName)
            {
                //console.log("Found filename");
                this.backgroundArray.splice(i, 1);
            }
        }
    
        // //Delete the row of the file
        // document.getElementById("backgroundHierarchy").deleteRow(document.getElementById("addedBackgroundRow"+fileName).rowIndex);
    
        // //Set the filepath of imageCont and videoCont to be empty so that the background stops showing if it's currently showing when being deleted
        // imageCont.src = '';
        // videoCont.src = '';
    
        // alert('Delete image');
    }

    getBackgroundObject(fileName)
    {
        //Find the background object to update
        for(var i=0; i < this.backgroundArray.length; i++)
        {
            if(this.backgroundArray[i].fileName==fileName)
                return this.backgroundArray[i];
        }
    }

    getBackgroundArray()
    {
        return this.backgroundArray;
    }

    saveBackgroundChanges(fileName, backgroundStartTime, backgroundFileInput, backgroundFileInputName, FileInputlength){
        var backgroundObjectFound;
    
        
        //Find the background object to update
        for(var i=0; i < this.backgroundArray.length; i++)
        {
            if(this.backgroundArray[i].fileName==fileName)
            {
                backgroundObjectFound = this.backgroundArray[i];
            }
        }
    
        //Change the background objects attributes with the input fieds from the properites panel
        backgroundObjectFound.backgroundStartTime = backgroundStartTime;
    
        if(FileInputlength != 0) //If the user has selected a file then don't chnage the objexts propties for the file 
        {
            //Update the background object's file 
            backgroundObjectFound.contentFile = backgroundFileInput;

            backgroundObjectFound.fileName = backgroundFileInputName;
        }
    }
}
