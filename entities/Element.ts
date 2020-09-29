import {TextStyle} from './TextStyle'
import {Position} from './Position'
import {Point} from "./Point";

export {
    Element,
    Text, isText,
    Triangle,
    Rectangle,
    Image, isImage,
    Ellipse
}

type ElementType = 'text' | 'triangle' | 'rectangle' | 'ellipse'  | 'image'


type Element = {
    Id: Number,
    Position: Position
    Type: ElementType
}

type Text = Element & {
    Text: String,
    TextStyle: TextStyle,
    Type: 'text',
}

type Triangle = Element & {
    A: Point,
    B: Point,
    C: Point,
    Type: 'triangle'
}

type Rectangle = Element & {
    Width: Number,
    Height: Number,
    Center: Point,
    Type: 'rectangle'
}

type Ellipse = Element & {
    Center: Point,
    RadiusX: Number,
    RadiusY: Number,
    Type: 'ellipse'
}

type Image = Element & {
    Element: HTMLElement,
    Type: 'image'
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
function isText(argument: any): argument is Text {
    return argument.Text !== undefined && argument.TextStyle !== undefined && argument.Type === 'text';
}

function isImage(argument: any): argument is Image {
    return argument.Element !== undefined && argument.Type === 'image';
}
