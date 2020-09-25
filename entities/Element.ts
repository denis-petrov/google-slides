import {TextElement} from './TextElement'
import {Primitive} from './Primitive'
import {Image} from './Image'
import {Position} from './Position'

export {
    Element1
}

type ElementType = 'text' | 'rect'

type Element1 = {
    Id: Number,
    // Entity: TextElement | Primitive | Image,
    Position: Position
    type: ElementType
}

type TextElement = Element & {
    Text: String,
    /*TextStyle: TextStyle,*/
    type: 'text',
}


/*example*/
let text: TextElement = {
    Text: 'hello',
    type: 'text'
}

function foo(e: Element1) {
    console.log(e)
    if (e.type == 'text')
    {
        e.Text = '123'
        console.log(e)
    }
}
