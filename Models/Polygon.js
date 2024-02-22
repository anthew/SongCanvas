import {Shape} from './Shape.js';

export class Polygon extends Shape {

    constructor(name, shapeType, xLoc, yLoc, startTime, endTime, fillColor, borderColor, borderWidth, animationType, opacity, radius, sides) {
       
        super(shapeType, startTime, endTime, animationType);
        
        this.konvaShape = new Konva.RegularPolygon({
            name: name,
            fill: fillColor,
            stroke: borderColor,
            strokeWidth: borderWidth,
            x: xLoc, 
            y: yLoc,
            radius: radius,
            sides: sides, 
            visible: false, // Polygons are invisible by default
            opacity: opacity,
        });
    } // so instead of storing all the values in separa

    showKonvaShape() {
        this.konvaShape.show();
    }

    hideKonvaShape() {
        this.konvaShape.hide();
    }

    startAnimation() {
        this.animation.start();
    }

    stopAnimation() {
        this.animation.stop();
    }

    // ------------------------------------------- Setters ------------------------------
    
    setStartTime(startTime){
        this.startTime = startTime;
    }
    
    setEndTime(endTime) {
        this.endTime = endTime;
    }

    setAnimation(animation) {
        this.animation = animation;
    }

    setAnimationType(animationType) {
        this.animationType = animationType;
    }

    setShapeName(name){
        this.name = name;
        this.konvaShape.setAttr('name', name);
    }

    setAnimation(animation) {
        this.animation = animation;
    }

    // ------------------------------------------- Getters ------------------------------
    getKonvaShape() {
        return this.konvaShape;
    }

    getShapeName() {
        return this.name;
    }

    getStartTime() {
        return this.startTime;
    }

    getEndTime() {
        return this.endTime;
    }

    getAnimationType() {
        return this.animationType;
    }

    getAnimation(){
        return this.animation;
    }
}