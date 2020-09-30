export {
    Point, isPoint
}

type Point = {
    X: Number,
    Y: Number
}

function isPoint(argument: any): argument is Point {
    return argument.X !== undefined && typeof argument.X === 'number'
        && argument.Y !== undefined && typeof argument.Y === 'number'
}