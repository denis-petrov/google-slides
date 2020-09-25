import {Triangle} from './Triangle'
import {Ellipse} from './Ellipse'
import {Rectangle} from './Rectangle'

export {
    Primitive
}

type Primitive = {
    Shape: Triangle | Ellipse | Rectangle,
    Color: Number,
}
