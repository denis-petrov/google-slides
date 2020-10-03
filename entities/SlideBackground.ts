import {Image, isImage} from './Elements'
import {Color, isColor} from './Color'

export {
    SlideBackground, isSlideBackground
}

type SlideBackground = {
    Background: Image | Color
}

function isSlideBackground(argument: any): argument is SlideBackground {
    return argument.Background !== undefined &&
        (isImage(argument.Background) || isColor(argument.Background))
}
