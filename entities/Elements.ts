import {isTextStyle, TextStyle} from './TextStyle'
import {isPoint, Point} from './Point'
import {Color} from './Color'

export {
    Elements, isElement,
    Text, isText,
    Triangle, isTriangle,
    Rectangle, isRectangle,
    Image, isImage,
    Ellipse, isEllipse,
    ElementType
}

enum ElementType {
    text,
    triangle,
    rectangle,
    ellipse,
    image
}

type Elements = {
    id: number,
    position: Point,
    scaleX: number,
    scaleY: number,
    angleRoute: number,
    borderColor: Color,
    type: ElementType
}

type Text = Elements & {
    text: string,
    textStyle: TextStyle,
    type: ElementType.text,
}

type Triangle = Elements & {
    a: Point,
    b: Point,
    c: Point,
    backgroundColor: Color,
    type: ElementType.triangle
}

type Rectangle = Elements & {
    width: number,
    height: number,
    backgroundColor: Color,
    type: ElementType.rectangle
}

type Ellipse = Elements & {
    radiusX: number,
    radiusY: number,
    backgroundColor: Color,
    type: ElementType.ellipse
}

type Image = Elements & {
    element: HTMLElement,
    type: ElementType.image
}


/*guards*/
function isElement(argument: any): argument is Elements {
    return argument.id !== undefined && typeof argument.id === 'number'
        && argument.position !== undefined
        && (argument.type >= 0 && argument.type <= 4)
}

function isText(argument: any): argument is Text {
    return argument.Text !== undefined && typeof argument.Text === 'string'
        && argument.TextStyle !== undefined && isTextStyle(argument.TextStyle)
        && argument.type === 'text'
}

function isTriangle(argument: any): argument is Triangle {
    return argument.a !== undefined && isPoint(argument.a)
        && argument.b !== undefined && isPoint(argument.b)
        && argument.c !== undefined && isPoint(argument.c)
        && argument.type === 'triangle'
}

function isRectangle(argument: any): argument is Rectangle {
    return argument.Width !== undefined && typeof argument.Width === 'number'
        && argument.Height !== undefined && typeof argument.Height === 'number'
        && argument.center !== undefined && isPoint(argument.center)
        && argument.type === 'rectangle'
}

function isEllipse(argument: any): argument is Ellipse {
    return argument.center !== undefined && isPoint(argument.center)
        && argument.radiusX !== undefined && typeof argument.radiusX === 'number'
        && argument.radiusY !== undefined && typeof argument.radiusY === 'number'
        && argument.type === 'ellipse'
}

function isImage(argument: any): argument is Image {
    return argument.Element !== undefined
        && argument.type === 'image'
}
