import {Color, isColor} from './Color'

export {
    TextStyle, isTextStyle
}

type TextStyle = {
    Font: string,
    SizeFont: number,
    Color: Color,
    Align: string,
    isBold: boolean,
    isCurve: boolean
}

function isTextStyle(argument: any): argument is TextStyle {
    return argument.Font !== undefined && typeof argument.Font === 'string'
        && argument.SizeFont !== undefined && typeof argument.SizeFont === 'number'
        && argument.Color !== undefined && isColor(argument.Color)
        && argument.Align !== undefined && typeof argument.Align === 'string'
        && argument.isBold !== undefined && typeof argument.isBold === 'boolean'
        && argument.isCurve !== undefined && typeof argument.isCurve === 'boolean'
}
