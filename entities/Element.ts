import {TextStyle} from './TextStyle'
import {Position} from './Position'
import {Point} from "./Point";

export {
    Element,
    Text,
    Triangle,
    Rectangle,
    Image,
    Ellipse
}

type ElementType = 'text' | 'triangle' | 'ellipse' | 'rectangle' | 'image'


type Element = {
    Id: Number,
    Position: Position
    type: ElementType
}

type Text = Element & {
    Text: String,
    TextStyle: TextStyle,
    type: 'text',
}

type Triangle = Element & {
    A: Point,
    B: Point,
    C: Point
}

type Rectangle = Element & {
    Width: Number,
    Height: Number,
    Center: Point
}

type Image = Element & {
    Element: HTMLElement
}

type Ellipse = Element & {
    Center: Point,
    RadiusX: Number,
    RadiusY: Number
}

/*example*/
let text: { Text: string; type: string } = {
    Text: 'hello',
    type: 'text'
}

function foo(e: Element) {
    console.log(e)
    if (e.type == 'text')
    {
        e.Text = '123'
        console.log(e)
    }
}
