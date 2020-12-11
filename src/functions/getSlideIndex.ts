import {Editor} from "../entities/Editor"

export function getSlideIndex(editor: Editor, slide: Element) {
    let slideId = slide.id.split('slide_area_')[1]
    let slideIndex = 0
    editor.presentation.slides.map(s => {
        if (s.id === slideId) {
            slideIndex = editor.presentation.slides.indexOf(s)
        }
        return s
    })

    return slideIndex
}