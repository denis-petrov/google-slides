import {isSlideBackground, SlideBackground} from './SlideBackground'
import {Color} from "./Color";
import {Image} from "./Element";

export {
    Slide, isSlide
}

type Slide = {
    Id: number,
    Elements: Array<number> | null,
    Background: Image | Color
}

function isSlide(argument: any): argument is Slide {
    return argument.Id !== undefined && typeof argument.Id === 'number'
        && argument.Elements !== undefined
        && argument.Background !== undefined && isSlideBackground(argument.Background);
}
