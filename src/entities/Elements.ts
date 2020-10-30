import {TextStyle} from './TextStyle'
import {Point} from './Point'
import {Color} from './Color'

export type {
    Element,
    Text
}
export {
    ElementType
}

enum ElementType {
    text,
    triangle,
    rectangle,
    ellipse
}


type Element = {
    id: number;
    center: Point;
    topLeftPoint: Point;
    bottomRightPoint: Point;
    borderColor: Color;
    borderWidth: number;
    backgroundColor: Color | null;
    type: ElementType
}

type Text = Element & {
    text: string,
    textStyle: TextStyle,
    type: ElementType.text,
}