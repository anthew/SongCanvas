// const konva = document.getElementById("KonvaCanvas");

// let kwidth = this.konva.style.width = 650;
// let kheight = this.konva.style.height = 500;


var stage = new Konva.Stage({
    container: 'KonvaCanvas',
    // width: 650,  
    // height: 500, 
});

// can i replace whats in the parenthesis with this i higlight
stage.width(1050);
stage.height(500);

var layer = new Konva.Layer(); 

stage.add(layer);

var shapes = new Konva.Rect({
    x: 50,
    y: 50,
    width: 50,
    height: 50,
    fill: 'green',
    stroke: 'black',
    strokeWidth: 1,
    name: "shape1",
});

layer.add(shapes);

//Function deticated to creating shapes based on user input
var addShapeToScreenButton = document.getElementById("shapeSubmit");
addShapeToScreenButton.addEventListener("click", createRectangle);

function createRectangle()
{
    let name = document.getElementById("name").value;
    let width = document.getElementById("width").value;
    let height = document.getElementById("height").value;
    let fill_color = document.getElementById("fill").value;
    let stroke = document.getElementById("stroke").value;
    let strokeWidth = document.getElementById("strokeWidth").value;
    let x = document.getElementById("x").value;
    let y = document.getElementById("y").value;
     
    alert("Shape added");
    var rect = new Konva.Rect({
        name: name,
        width: width,
        height: height,
        fill: fill_color,
        stroke: stroke,
        strokeWidth: strokeWidth,
        x: x,
        y: y,
    });

    //Add the newly created shape to the canvas
    layer.add(rect);
    // 
}


//Save Shapes to DB

