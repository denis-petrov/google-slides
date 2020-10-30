import {isSlideBackground} from './SlideBackground'
import {Color} from './Color'
import {Element, Image} from './Elements'

export type {
    Slide
}
export {
    isSlide
}

type Slide = {
    id: number,
    elements: Array<Element>,
    background: Color | Image,
    selectionElementsId: Array<number>
}

function isSlide(argument: any): argument is Slide {
    return argument.id !== undefined && typeof argument.id === 'number'
        && argument.elements !== undefined
        && argument.background !== undefined && isSlideBackground(argument.background);
}
