class MyClass{
    constructor(){
        console.log("initaite");
    }

    add (arg1, arg2)
    {
        var result;
        result = arg1 + arg2;
        return result;
    }
}

module.exports = MyClass;