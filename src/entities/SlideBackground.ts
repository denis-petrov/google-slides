import {Image, isImage} from './Elements'
import {Color, isColor} from './Color'

export type {
    SlideBackground
}
export {
    isSlideBackground
}

type SlideBackground = {
    background: Image | Color
}

function isSlideBackground(argument: any): argument is SlideBackground {
    return argument.background !== undefined &&
        (isImage(argument.background) || isColor(argument.background))
}
