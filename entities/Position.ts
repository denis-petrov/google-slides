import {Point} from './Point'
import {isPoint} from './Point'

export {
    Position, isPosition
}

type Position = {
    Center: Point,
    scaleX: Number,
    scaleY: Number,
    angleRoute: Number
}

function isPosition(argument: any): argument is Position {
    return argument.Center !== undefined && isPoint(argument.Center)
        && argument.scaleX !== undefined && typeof argument.scaleX === 'number'
        && argument.scaleY !== undefined && typeof argument.scaleY === 'number'
        && argument.angleRoute !== undefined && typeof argument.angleRoute === 'number'
}