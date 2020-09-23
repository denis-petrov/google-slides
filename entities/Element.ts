import {Text} from './Text.ts';
import {Primitive} from './Primitive.ts';
import {Image} from './Image.ts';
import {Position} from './Position.ts';

export {
    Element
}

type Element = {
    Id: Number,
    Entity: Text | Primitive | Image,
    Position: Position
}
