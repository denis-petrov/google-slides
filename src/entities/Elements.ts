import {Point} from './Point'
import {Color} from './Color'

export type {
    Element,
    Text,
    ImageElement
}

enum ElementType {
    text,
    triangle,
    rectangle,
    ellipse,
    image
}

export {
    ElementType
}


type Element = {
    id: string;
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

type TextStyle = {
    font: string,
    sizeFont: number,
    color: Color,
    align: string,
    isBold: boolean,
    isCurve: boolean,
    isUnderline: boolean
}

type ImageElement = Element & {
    link: string,
    type: ElementType.image
}
