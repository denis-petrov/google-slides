import {Editor} from "../entities/Editor"
import {Slide} from "../entities/Slide"

export function getSelectedElements(editor: Editor) {
    let selectedSlideId = editor.selectionSlidesId[0]
    let selectedSlide: Slide = editor.presentation.slides.filter((slide) => {
        if (slide.id === selectedSlideId) {
            return slide
        }
        return false
    })[0]

    if (selectedSlide.selectionElementsId !== []) {
        const selectedElementId = selectedSlide.selectionElementsId
        return selectedSlide.elements.filter((elem) => {
            if (selectedElementId.includes(elem.id)) {
                return elem
            }
            return false
        })
    } else {
        return null
    }
}