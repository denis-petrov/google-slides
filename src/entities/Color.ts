export type {
    Color
}
export {
    isColor
}

type Color = {
    red: number,
    green: number,
    blue: number
}

function isColor(argument: any): boolean {
    return argument.red !== undefined && typeof argument.red === 'number'
        && argument.green !== undefined && typeof argument.green === 'number'
        && argument.blue !== undefined && typeof argument.blue === 'number'
}