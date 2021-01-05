import {Editor} from "../entities/Editor"

export function getSelectedElements(editor: Editor) {
    let selectedSlideId = editor.selectionSlidesId[0]
    let selectedSlide = editor.presentation.slides.filter((slide) => {
        if (slide.id === selectedSlideId) {
            return slide
        }
    })[0]

    if (selectedSlide.selectionElementsId !== []) {
        const selectedElementId = selectedSlide.selectionElementsId
        return selectedSlide.elements.filter((elem) => {
            if (selectedElementId.includes(elem.id)) {
                return elem
            }
        })
    } else {
        return null
    }
}