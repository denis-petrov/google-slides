import {SlideBackground} from './SlideBackground'

export {
    Slide
}

type Slide = {
    Id: Number,
    Elements: Array<Number> | null,
    Background: SlideBackground 
}