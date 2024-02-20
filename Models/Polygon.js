import {Shape} from './Shape.js';

export class Polygon extends Shape {
    // //Shape common attributes:
    // P_name;
    // P_xLoc;
    // P_yLoc;
    // P_startTime;
    // P_endTime;
    // P_fillColor;
    // P_borderColor;
    // P_borderWidth;
    // animationType;
    // animation;
    // opacity;
    // visible = true;

    // // Konva shape that will be added to the canvas.
    // konvaShape;
    
    // //Polygon-specific attributes
    // radius;
    // sides;


    constructor(name, shapeType, xLoc, yLoc, startTime, endTime, fillColor, borderColor, borderWidth, animationType, opacity, radius, sides) {
        
        super(name, xLoc, yLoc, startTime, endTime, fillColor, borderColor, borderWidth, animationType, opacity);

        this.shapeType = shapeType;
        this.radius = radius;
        this.sides = sides;
    }

    instantiateKonvaShape() {
        this.konvaShape = new Konva.RegularPolygon({
            name: this.name,
            fill: this.fillColor,
            stroke: this.borderColor,
            strokeWidth: this.borderWidth,
            x: this.xLoc, 
            y: this.yLoc,
            radius: this.radius,
            sides: this.sides, 
            visible: false, // Polygons are invisible by default
            opacity: this.opacity,
        });
        return this.konvaShape;
    }

    // ------------------------------------------- Setters ------------------------------
    setShapeSides(sides){
        this.sides = sides;
    }

    setShapeRadius(radius){
        this.radius = radius;
    }
    
    setShapeFillColor(fillColor){
        this.fillColor = fillColor;
    }

    setX_loc(xLoc) {
        this.xLoc = xLoc;
    }

    setY_loc(yLoc) {
        this.yLoc = yLoc;
    }
    
    setShapeOpacity(opacity){
        this.opacity = opacity;        
    }
    
    setBorderColor(borderColor) {
        this.borderColor = borderColor;
    }

    setBorderWidth(borderWidth) {
        this.borderWidth = borderWidth;
    }
    
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

    showKonvaShape() {
        this.visible = true;
        this.konvaShape.show();
    }

    hideKonvaShape() {
        this.visible = false;
        this.konvaShape.hide();
    }

    startAnimation() {
        this.animation.start();
    }

    stopAnimation() {
        this.animation.stop();
    }
}