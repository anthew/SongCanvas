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

    setAnimation(animation) {
        this.animation = animation;
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