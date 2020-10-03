export {
    Point, isPoint
}

type Point = {
    X: number,
    Y: number
}

function isPoint(argument: any): argument is Point {
    return argument.X !== undefined && typeof argument.X === 'number'
        && argument.Y !== undefined && typeof argument.Y === 'number'
}