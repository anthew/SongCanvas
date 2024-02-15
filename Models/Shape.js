export class Shape { //should be Abstract class, if possible
    // name;
    // shapeType;
    // xLoc;
    // yLoc;
    // startTime;
    // endTime;
    // fillColor;
    // borderColor;
    // borderWidth;
    // animationType;
    // animation;
    // opacity;
    

    // Constructor not needed becaue Abstract class?

    constructor(name, xLoc, yLoc, startTime, endTime, fillColor, borderColor, borderWidth, animationType, opacity) {
        this.name = name;
        this.xLoc = xLoc;
        this.yLoc = yLoc;
        this.startTime = startTime;
        this.endTime = endTime;
        this.fillColor = fillColor;
        this.borderColor = borderColor;
        this.borderWidth = borderWidth;
        this.animationType = animationType;
        this.opacity = opacity;
    }

    instantiateKonvaShape() {}

    getKonvaShape() {}

    getStartTime() {}

    getEndTime() {}

    getaAnimationType() {}

    setAnimation() {}

    showKonvaShape() {}

    hideKonvaShape() {}
    
}