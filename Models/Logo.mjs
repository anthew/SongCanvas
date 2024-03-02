export class Logo{
    constructor(logoName, logoPic, logoWidth, logoHeight, logoX, logoY, logoOpcaity)
    {
        
        var imageObj = new Image();

        //Populate the konva image with the specified properties 
        this.konvaLogo = new Konva.Image({
            draggable: true,
            name: logoName,
            x: Number(logoX),
            y: Number(logoY),
            image: imageObj, 
            width: logoWidth,
            height: logoHeight,
            opacity: logoOpcaity,
            id: "logo",
        });  

        //Add the fileInput to the imageObj
        imageObj.src = URL.createObjectURL(logoPic);
    }

    getKonvaLogo()
    {
        return this.konvaLogo;
    }
}