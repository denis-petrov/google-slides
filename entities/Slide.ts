import {ListElements} from './ListElements.ts';
import {SlideBackground} from './SlideBackground.ts';

export {
    Slide
}

type Slide = {
    Elements: ListElements,
    Background: SlideBackground 
}