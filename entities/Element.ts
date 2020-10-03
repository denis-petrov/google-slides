import {isTextStyle, TextStyle} from './TextStyle'
import {isPoint, Point} from './Point'
import {Color} from "./Color";

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
    Id: number,
    Position: Point,
    scaleX: number,
    scaleY: number,
    angleRoute: number,
    BorderColor: Color,
    Type: ElementType
}

type Text = Element & {
    Text: String,
    TextStyle: TextStyle,
    Type: ElementType.text
}

type Triangle = Element & {
    A: Point,
    B: Point,
    C: Point,
    BackgroundColor: Color,
    Type: ElementType.triangle
}

type Rectangle = Element & {
    Width: number,
    Height: number,
    Center: Point,
    BackgroundColor: Color,
    Type: ElementType.rectangle
}

type Ellipse = Element & {
    Center: Point,
    RadiusX: number,
    RadiusY: number,
    BackgroundColor: Color,
    Type: ElementType.ellipse
}

type Image = Element & {
    Element: HTMLElement,
    Type: ElementType.image
}

/*example*/
/*
let text: { Text: string; Type: string } = {
    Text: 'hello',
    Type: 'text'
}

function foo(e: Text) {
    console.log(e)
    if (e.type == 'text')
    {
        e.Text = '123'
        console.log(e)
    }
}
*/


/*guards*/
function isElement(argument: any): argument is Element {
    return argument.Id !== undefined && typeof argument.Id === 'number'
        && argument.Position !== undefined
        && (argument.Type >= 0 && argument.Type <= 4)
}

function isText(argument: any): argument is Text {
    return argument.Text !== undefined && typeof argument.Text === 'string'
        && argument.TextStyle !== undefined && isTextStyle(argument.TextStyle)
        && argument.Type === 'text';
}

function isTriangle(argument: any): argument is Triangle {
    return argument.A !== undefined && isPoint(argument.A)
        && argument.B !== undefined && isPoint(argument.B)
        && argument.C !== undefined && isPoint(argument.C)
        && argument.Type === 'triangle'
}

function isRectangle(argument: any): argument is Rectangle {
    return argument.Width !== undefined && typeof argument.Width === 'number'
        && argument.Height !== undefined && typeof argument.Height === 'number'
        && argument.Center !== undefined && isPoint(argument.Center)
        && argument.Type === 'rectangle'
}

function isEllipse(argument: any): argument is Ellipse {
    return argument.Center !== undefined && isPoint(argument.Center)
        && argument.RadiusX !== undefined && typeof argument.RadiusX === 'number'
        && argument.RadiusY !== undefined && typeof argument.RadiusY === 'number'
        && argument.Type === 'ellipse'
}

function isImage(argument: any): argument is Image {
    return argument.Element !== undefined
        && argument.Type === 'image';
}
