import {TextElement} from './Text';
import {Primitive} from './Primitive';
import {Image} from './Image';
import {Position} from './Position';

export {
    Element
}

type Element = {
    Id: Number,
    Entity: TextElement | Primitive | Image,
    Position: Position
}
