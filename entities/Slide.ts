import {isSlideBackground, SlideBackground} from './SlideBackground'

export {
    Slide, isSlide
}

type Slide = {
    Id: Number,
    Elements: Array<Number> | null,
    Background: SlideBackground 
}

function isSlide(argument: any): argument is Slide {
    return argument.Id !== undefined && typeof argument.Id === 'number'
        && argument.Elements !== undefined
        && argument.Background !== undefined && isSlideBackground(argument.Background);
}
