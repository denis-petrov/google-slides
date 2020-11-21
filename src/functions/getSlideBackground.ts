import {getEditor} from "../stateManager/StateManager"
import {Color, isColor} from "../entities/Color"

export function getSlideBackground() {
    let editor = getEditor()
    let currentSlide = editor.presentation.slides.filter(s => editor.selectionSlidesId.includes(s.id))[0]
    let slideBack
    if (isColor(currentSlide.background)) {
        let slideBackColor = currentSlide.background as Color
        slideBack = `rgb(${slideBackColor.red},${slideBackColor.green},${slideBackColor.blue}`
    } else {
        slideBack = `url(${currentSlide.background as string})`
    }
    return slideBack
}