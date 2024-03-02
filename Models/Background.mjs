export class Background{
    constructor(BackgroundFileInput, fileName, backgroundStartTime)
    {
        this.backgroundObject = {
            "backgroundStartTime" : backgroundStartTime,
            "theFile": document.getElementById('imgInput').files[0], //USed to store the file into the user media folder
            "contentFile" : BackgroundFileInput,
            "fileName" : fileName,
        }
    }

    getBackgroundObject()
    {
        return this.backgroundObject;
    }
}