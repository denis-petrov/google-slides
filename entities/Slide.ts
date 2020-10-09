import {isSlideBackground} from './SlideBackground'
import {Color} from './Color'
import {Elements, Image} from './Elements'

export {
    Slide, isSlide
}

type Slide = {
    id: number,
    elements: Array<Elements>,
    background: Color | Image,
    selectionElementsId: Array<number>
}

function isSlide(argument: any): argument is Slide {
    return argument.id !== undefined && typeof argument.id === 'number'
        && argument.elements !== undefined
        && argument.background !== undefined && isSlideBackground(argument.background);
}
