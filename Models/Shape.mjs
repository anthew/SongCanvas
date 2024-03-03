export class Shape { //should be Abstract class, if possible

    // Constructor not needed becaue Abstract class?

    constructor(name, shapeType, startTime, endTime, animationType) {
        this.name = name;
        this.animationType = animationType;
        this.shapeType = shapeType;
        this.startTime = startTime;
        this.endTime = endTime;
    }

    instantiateKonvaShape() {}

    getKonvaShape() {}

    getName() {}

    getStartTime() {}

    getEndTime() {}

    getAnimationType() {}

    getShapeType() {}

    setAnimation() {}

    showKonvaShape() {}

    hideKonvaShape() {}
    
}