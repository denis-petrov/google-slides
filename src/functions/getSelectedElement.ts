import {store} from "../store/store"

export function getSelectedElement() {
    const editor = store.getState()
    let selectedSlideId = editor.selectionSlidesId[0]
    let selectedSlide = editor.presentation.slides.filter((slide) => {
        if (slide.id === selectedSlideId) {
            return slide
        }
    })[0]

    if (selectedSlide.selectionElementsId !== []) {
        const selectedElementId = selectedSlide.selectionElementsId[0]
        return selectedSlide.elements.filter((elem) => {
            if (elem.id === selectedElementId) {
                return elem
            }
        })[0]
    } else {
        return null
    }
}