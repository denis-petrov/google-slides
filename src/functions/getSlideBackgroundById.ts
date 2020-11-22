import {getEditor} from "../stateManager/StateManager"
import {Color, isColor} from "../entities/Color"

export function getSlideBackgroundById(id: string) {
    const editor = getEditor()
    const currentSlide = editor.presentation.slides.filter(s => {
        if (s.id === id) {
            return s
        }
    })[0]

    let slideBack
    if (isColor(currentSlide.background)) {
        const slideBackColor = currentSlide.background as Color
        slideBack = `rgb(${slideBackColor.red},${slideBackColor.green},${slideBackColor.blue}`
    } else {
        slideBack = `url(${currentSlide.background as string})`
    }
    return slideBack
}