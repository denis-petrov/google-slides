import {ImageElement} from './Elements'
import {Color, isColor} from './Color'

export type {
    SlideBackground
}
export {
    isSlideBackground
}

type SlideBackground = {
    background: ImageElement | Color
}

function isSlideBackground(argument: any): argument is SlideBackground {
    return argument.background !== undefined &&
        isColor(argument.background)
}
