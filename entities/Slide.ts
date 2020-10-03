import {isSlideBackground} from './SlideBackground'
import {Color} from './Color'
import {Elements, Image} from './Elements'

export {
    Slide, isSlide
}

type Slide = {
    Id: number,
    Elements: Array<Elements> | null,
    Background: Image | Color,
    SelectionElementsId: Array<number> | null
}

function isSlide(argument: any): argument is Slide {
    return argument.Id !== undefined && typeof argument.Id === 'number'
        && argument.Elements !== undefined
        && argument.Background !== undefined && isSlideBackground(argument.Background);
}
