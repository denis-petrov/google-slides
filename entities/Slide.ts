import {SlideBackground} from './SlideBackground'

export {
    Slide, isSlide
}

type Slide = {
    Id: Number,
    Elements: Array<Number> | null,
    Background: SlideBackground 
}

function isSlide(argument: any): argument is Slide {
    return argument.Id !== undefined
        && argument.Elements !== undefined
        && argument.Background !== undefined;
}
