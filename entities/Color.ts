export {
    Color, isColor
}

type Color = {
    Red: number,
    Green: number,
    Blue: number
}

function isColor(argument: any): argument is Color {
    return argument.Red !== undefined && typeof argument.Red === 'number'
        && argument.Green !== undefined && typeof argument.Green === 'number'
        && argument.Blue !== undefined && typeof argument.Blue === 'number'
}