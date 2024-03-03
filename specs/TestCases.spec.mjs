import Konva from 'konva'; //Had to import this to avoid a konva is undefined error when runing the test command
import { Polygon } from '../Models/Polygon.mjs';
import { Rectangle } from '../Models/Rectangle.mjs';
import { EditorManager } from '../Models/EditorManager.mjs';
import {expect} from 'chai';

//Make a stage and layer for testing

describe("Design Element Logic Testing", function()
{
    //Create Manager Object to functions related to 
    var EditorManagerObj = new EditorManager();

    // add var for createShape here
    it("Determine if a shape will be created based on inputted values", function(){
        //Create rectangle using create shape
        var duplicateFound = EditorManagerObj.createShape("bob", 100, 100, "red", "blue", 2, "50", "50", "", "Clockwise", 0.8, "00:01.0", "00:09.7", "Rectangle", "");
        expect(duplicateFound).to.be.equal(false);

        //Check if the rectangle is added to the arrays
        expect(EditorManagerObj.getShapeArray().length).to.be.equal(1);
        expect(EditorManagerObj.getShapeStartArray().length).to.be.equal(1);
        expect(EditorManagerObj.getShapeEndArray().length).to.be.equal(1);

        //Create Polygon using an existing name
        duplicateFound = EditorManagerObj.createShape("bob", 100, 100, "red", "blue", 2, "50", "50", "7", "Clockwise", 0.8, "00:05.0", "00:06.7", "Polygon", "50");
        
        expect(duplicateFound).to.be.equal(true);
         
        //Create Polgygon with unique name and see if it's added to the shapeArrays
        duplicateFound = EditorManagerObj.createShape("steve", 100, 100, "red", "blue", 2, "50", "50", "7", "Clockwise", 0.8, "00:05.0", "00:06.7", "Polygon", "50");
        //btw you have two variables that have the same name "duplicateFound"
        expect(EditorManagerObj.getShapeArray().length).to.be.equal(2);
        expect(EditorManagerObj.getShapeStartArray().length).to.be.equal(2);
        expect(EditorManagerObj.getShapeEndArray().length).to.be.equal(2);
    });
    
    it("Checking range of x and y values for added shape", function(){
        
        var result = EditorManagerObj.createShape("rectangle", 100, 100, "red", "blue", 2, "600", "900", "", "Clockwise", 0.8, "00:01.0", "00:09.7", "Rectangle", "");
        expect(result).to.be.equal(true);
        //#########################################################################################################

        var result2 = EditorManagerObj.createShape("rectangle", 100, 100, "red", "blue", 2, "0", "0", "", "Clockwise", 0.8, "00:01.0", "00:09.7", "Rectangle", "");
        expect(result2).to.be.equal(false);

        //#########################################################################################################

        var result3 = EditorManagerObj.createShape("rectangle3", 100, 100, "red", "blue", 2, "400", "400", "", "Clockwise", 0.8, "00:01.0", "00:09.7", "Rectangle", "");
        expect(result3).to.be.equal(false); 
        //#########################################################################################################

        var result4 = EditorManagerObj.createShape("rectangle", 100, 100, "red", "blue", 2, "700", "2000", "", "Clockwise", 0.8, "00:01.0", "00:09.7", "Rectangle", "");
        expect(result4).to.be.equal(true);
        
    });

    it("Checking design element toggle", function(){
        var shapeNotCreated = EditorManagerObj.createShape("doug", 100, 100, "red", "blue", 2, "400", "400", "", "Clockwise", 0.8, "00:01.0", "00:09.7", "Rectangle", "");
        var shapeName = EditorManagerObj.getShapeObject("doug").getName();

        console.log(shapeNotCreated);
        
        //Toggle visibility to hide shape
        EditorManagerObj.modifyShapeSight(shapeName);
        
        expect(EditorManagerObj.getVisibility(shapeName)).to.be.equal(false);

        //Toggle visibility 
    });
    
    // it("Check that the start and end times of an added shape is within the duration of the audio file.", function(){
    //     EditorManagerObj.createShape("rectangle", 100, 100, "red", "blue", 2, "600", "900", "", "Clockwise", 0.8, "00:01.0", "00:09.7", "Rectangle", "");
        
    // });

});

describe("Background Element Logic Testing", function(){
    
});

describe("Logo Logic Testing", function(){
    
});

describe("Design Element Shape Inheritance Testing", function(){
    it("Polygon Inheritance Test", function(){
        //Create Polygon Object
        var polygon = new Polygon("joe", "Polygon","20", "20", "00:01.0", "00:02.0", "red", "blue", 2, "None", 0.8, 30, 5);

        //Test the inherited functions of shape class
        expect(polygon.getName()).to.be.equal("joe");
        expect(polygon.getShapeType()).to.be.equal("Polygon");
        expect(polygon.getEndTime()).to.be.equal("00:02.0");
        expect(polygon.getStartTime()).to.be.equal("00:01.0");
        expect(polygon.getAnimationType()).to.be.equal("None");
    });

    it("Rectangle Inheritance Test", function(){
        //Create Rectangle Object
        var rectangle = new Rectangle("phil", "Rectangle", "100", "200", "00:25.1", "00:27.3", "green", "purple", 3, "None", 1, 100, 40);

        //Test the inherited functions of shape class
        expect(rectangle.getName()).to.be.equal("phil");
        expect(rectangle.getShapeType()).to.be.equal("Rectangle");
        expect(rectangle.getEndTime()).to.be.equal("00:27.3");
        expect(rectangle.getStartTime()).to.be.equal("00:25.1");
        expect(rectangle.getAnimationType()).to.be.equal("None");
    });
});

