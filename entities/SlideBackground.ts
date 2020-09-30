import {Image} from './Element'
import {Color} from './Color'

export {
    SlideBackground, isSlideBackground
}

type SlideBackground = {
    Background: Image | Color
}

function isSlideBackground(argument: any): argument is SlideBackground {
    return argument.SelectedSlides !== undefined;
}
