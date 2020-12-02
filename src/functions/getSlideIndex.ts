import {getEditor} from "../stateManager/StateManager"

export function getSlideIndex(slide: Element) {
    let slideId = slide.id.split('slide_area_')[1]
    let editor = getEditor()
    let slideIndex = 0
    editor.presentation.slides.map(s => {
        if (s.id === slideId) {
            slideIndex = editor.presentation.slides.indexOf(s)
        }
    })
    return slideIndex
}