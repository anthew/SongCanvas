export class Bouncing{
    getAnimationObject(ShapeClassObject, layer)
    {
        var xVelocity = 3; 
        var yVelocity = 3; 
        var shape = ShapeClassObject.getKonvaShape(); 

        var animationObject = new Konva.Animation(function (frame) {
            const dist = xVelocity;
            const yDist = yVelocity;

            shape.move({x: dist, y : yDist});

            if (shape.y() < 20 || shape.y() > 500 - 20)
            {
                yVelocity *= -1;
            }

            if(shape.x() < 20 || shape.x() > 1050 - 20)
            {
                xVelocity *=-1;
            }

        }, layer);

        ShapeClassObject.setAnimation(animationObject);

        return animationObject;
    }
}
    //Bouncing animation
//var xVelocity = 3;
//var yVelocity = 3;

// const anim = new Konva.Animation((frame) => {
//     const dist = xVelocity; // Calculate distance
//     const yDist = yVelocity;

//     hexagon.move({ x: dist, y: yDist }); // Move the ball horizontally

//     // Bounce off the canvas edges
//     if (hexagon.x() < 0 + 20  hexagon.x() > stage.width() - 20) {
//         xVelocity *= -1; // Reverse velocity
//     }

// if (hexagon.y() < 0 + 20  hexagon.y() > stage.height() - 20)
// {
//     yVelocity *= -1;
// }

// }, layer);

// anim.start();
