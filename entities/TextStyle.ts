import {Color, isColor} from './Color'

export {
    TextStyle, isTextStyle
}

type TextStyle = {
    font: string,
    sizeFont: number,
    color: Color,
    align: string,
    isBold: boolean,
    isCurve: boolean
}

function isTextStyle(argument: any): argument is TextStyle {
    return argument.font !== undefined && typeof argument.font === 'string'
        && argument.sizeFont !== undefined && typeof argument.sizeFont === 'number'
        && argument.color !== undefined && isColor(argument.color)
        && argument.align !== undefined && typeof argument.align === 'string'
        && argument.isBold !== undefined && typeof argument.isBold === 'boolean'
        && argument.isCurve !== undefined && typeof argument.isCurve === 'boolean'
}
