import MyClass from '../MVCTutorial/Model/myClass.js';
var myObj = new MyClass();
//import chai from 'chai';
//var expect = chai.expect;

import {expect} from 'chai';

describe("Test suite", function(){
    it("Test the add method", function(){
        expect(myObj.add(1,2)).to.be.equal(3);
    });
});