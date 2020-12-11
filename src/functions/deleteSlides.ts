import {Editor} from '../entities/Editor'

export function deleteSlides(editor: Editor): Editor {
    let slidesId = editor.selectionSlidesId

    let selectedSlide = editor.presentation.slides.filter(slide => slide.id == slidesId[0])[0]
    let indexOfSelectedSlide = editor.presentation.slides.indexOf(selectedSlide)

    let newSlides = editor.presentation.slides.filter(slide => {
        let isDeleted = false

        for (let i = 0; i < slidesId.length; i++) {
            isDeleted = (slidesId[i] === slide.id)
            if (isDeleted) {
                break
            }
        }
        return !isDeleted
    })

    return {
        ...editor,
        presentation: {
            name: editor.presentation.name,
            slides: newSlides
        },
        selectionSlidesId: [newSlides[indexOfSelectedSlide].id]
    }
}