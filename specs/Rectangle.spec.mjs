import Konva from 'konva'; //Had to import this to avoid a konva is undefined error when runing the test command
// while youre at it, i can add my changes here


//import helloThere from '../Controllers/thing.js';

//var helloThere = require("./Controllers/thing.js");

import { Polygon } from '../Models/Polygon.mjs';
//import { EditorManager } from '../Models/EditorManager.mjs';

import {expect} from 'chai';

describe("Test suite", function(){
    it("Test the add method", function(){
        var polygon = new Polygon("joe", "Polygon","20", "20", "00:01.0", "00:02.0", "red", "blue", 2, "None", 0.8, 30, 5);

        expect(myObj.add(1,2)).to.be.equal(3);

        expect(polygon.getKonvaShape().getAttr("name")).to.be.equal("joe");
    });
});