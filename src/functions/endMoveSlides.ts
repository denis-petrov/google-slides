import {Editor} from '../entities/Editor'

export function endMoveSlides(editor: Editor, payload: any): Editor {
    let shift = payload.shiftY

    let startSlideId = payload.startSlideId
    let endSlideId = payload.endSlideId

    if ((shift <= 95) && (shift >= 5) && (startSlideId !== endSlideId)) {
        let startSlide = editor.presentation.slides.filter((slide) => slide.id === startSlideId)[0]
        let startSlidePosition = editor.presentation.slides.indexOf(startSlide)

        let endSlide = editor.presentation.slides.filter((slide) => slide.id === endSlideId)[0]
        let endSlidePosition = editor.presentation.slides.indexOf(endSlide)

        let newSlidesArray = editor.presentation.slides
        newSlidesArray.splice(startSlidePosition, 1)
        if (startSlidePosition < endSlidePosition) {
            if (shift > 50) {
                newSlidesArray.splice(endSlidePosition, 0, startSlide)
            } else {
                newSlidesArray.splice(endSlidePosition - 1, 0, startSlide)
            }
        } else {
            if (shift > 50) {
                newSlidesArray.splice(endSlidePosition + 1, 0, startSlide)
            } else {
                newSlidesArray.splice(endSlidePosition, 0, startSlide)
            }
        }

        return {
            ...editor,
            presentation: {
                ...editor.presentation,
                slides: newSlidesArray
            },
            selectionSlidesId: [startSlideId]
        }
    }
    return editor
}
