export class Background{
    constructor(BackgroundFileInput, fileName, backgroundStartTime)
    {
        this.backgroundObject = {
            "backgroundStartTime" : backgroundStartTime,
            "theFile": "", //document.getElementById('imgInput').files[0], //USed to store the file into the user media folder
            "contentFile" : BackgroundFileInput,
            "fileName" : fileName,
        }
    }

    getBackgroundObject()
    {
        return this.backgroundObject;
    }

    setBackgroundInputFile(fileInput)
    {
        this.backgroundObject.theFile = fileInput;
    }

    getBackgroundStartTime()
    {
        return this.backgroundObject.backgroundStartTime;
    }

    getBackgroundFileName()
    {
        return this.backgroundObject.fileName;
    }

    getBackgroundContentFile()
    {
        return this.backgroundObject.contentFile;
    }

    getBackgroundFileInput()
    {
        return this.backgroundObject.theFile;
    }
}