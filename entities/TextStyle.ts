export {
    TextStyle, isTextStyle
}

type TextStyle = {
    Font: String,
    SizeFont: Number,
    Color: Number,
    Align: String,
    isBold: false,
    isCurve: false
}

function isTextStyle(argument: any): argument is TextStyle {
    return argument.Font !== undefined
        && argument.SizeFont !== undefined
        && argument.Color !== undefined
        && argument.Align !== undefined
        && argument.isBold !== undefined
        && argument.isCurve !== undefined;
}
