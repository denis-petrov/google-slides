import {Color, isColor} from "../entities/Color"
import {Editor} from "../entities/Editor"

export function getSlideBackground(editor: Editor) {
    let currentSlide = editor.presentation.slides.filter(s => editor.selectionSlidesId[0] == s.id)[0]
    let slideBack = null
    if (currentSlide !== undefined && currentSlide !== null) {
        if (isColor(currentSlide.background)) {
            let slideBackColor = currentSlide.background as Color
            slideBack = `rgb(${slideBackColor.red},${slideBackColor.green},${slideBackColor.blue}`
        } else {
            slideBack = `url(${currentSlide.background as string})`
        }
        return slideBack
    }
    return null
}