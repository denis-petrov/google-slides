import {Element} from './Element'
import {SlideBackground} from './SlideBackground'

export {
    Slide
}

type Slide = {
    Id: Number,
    Elements: Array<Element>,
    Background: SlideBackground 
}