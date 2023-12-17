var stage = new Konva.Stage({
    container: 'KonvaCanvas',
    width: 650,
    height: 500,
});

var layer = new Konva.Layer(); 

stage.add(layer);

var shapes = new Konva.Rect({
    x: 50,
    y: 50,
    width: 100,
    height: 50,
    fill: 'green',
    stroke: 'black',
    strokeWidth: 4,
    name: "shape1",
});

layer.add(shapes);