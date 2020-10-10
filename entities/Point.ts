export type {
    Point
}
export {
    isPoint
}

type Point = {
    x: number,
    y: number
}

function isPoint(argument: any): argument is Point {
    return argument.x !== undefined && typeof argument.x === 'number'
        && argument.y !== undefined && typeof argument.y === 'number'
}