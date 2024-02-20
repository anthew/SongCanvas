import { Shape } from "./Shape.js";

export class Rectangle extends Shape {
    // name: shapeName,
    // width: shapeWidth,
    // height: shapeHeight,
    // fill: shapeFill_color,
    // stroke: shapeStroke,
    // strokeWidth: shapeStrokeWidth,
    // x: shapeX, 
    // y: shapeY, 
    // visible: true, // Shapes are invisible by default
    // opacity: shapeOpacity,
    // offset: { //Note the offset variable is used to center the animations 
    //     x: shapeWidth/2,
    //     y: shapeHeight/2,
    // },

    constructor (name, shapeType, xLoc, yLoc, startTime, endTime, fillColor, borderColor, borderWidth, animationType, opacity, height, width) {

        super(name, xLoc, yLoc, startTime, endTime, fillColor, borderColor, borderWidth, animationType, opacity);

        this.shapeType = shapeType;
        this.height = height;
        this.width = width;
    }

    instantiateKonvaShape() {
        this.konvaShape = new Konva.Rect({
            name: this.name,
            width: this.width,
            height: this.height,
            fill: this.fillColor,
            stroke: this.borderColor,
            strokeWidth: this.borderWidth,
            x: this.xLoc, 
            y: this.yLoc, 
            visible: false, // Shapes are invisible by default
            opacity: this.opacity,
            offset: { //Note the offset variable is used to center the animations 
                x: this.width/2,
                y: this.height/2,
            },
        });  
    }

    //----------------------------------------Setters------------------------------------------
    setShapeWidth(width){
        this.width = width
    }

    setShapeHeight(height) {
        this.height = height;
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

    //----------------------------------------------------getters-----------------------------------------------
    
    getKonvaShape() {
        return this.konvaShape;
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

    getShapeType() {
        return this.shapeType;
    }

    // other functions

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