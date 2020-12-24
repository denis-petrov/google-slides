import {Editor} from '../entities/Editor'

export function endMoveSlides(editor: Editor, payload: any): Editor {
    let shift = payload.shiftY

    let startSlideId = payload.startSlideId
    let endSlideId = payload.endSlideId

    if (((shift <= 95) && (shift >= 5) && (startSlideId !== endSlideId)) && !(endSlideId in editor.selectionSlidesId)) {
        let startSlide = editor.presentation.slides.filter((slide) => slide.id === startSlideId)[0]
        let startSlidePosition = editor.presentation.slides.indexOf(startSlide)

        let endSlide = editor.presentation.slides.filter((slide) => slide.id === endSlideId)[0]
        let endSlidePosition = editor.presentation.slides.indexOf(endSlide)

        let endSlidePositionInArrayWithoutSelectedSlides = endSlidePosition - (editor.presentation.slides
            .slice(0, endSlidePosition).filter(slide => {
                return editor.selectionSlidesId.includes(slide.id)
            }).length)

        if (startSlidePosition < endSlidePosition) {
            endSlidePositionInArrayWithoutSelectedSlides += 1
            if (shift <= 50) {
                endSlidePositionInArrayWithoutSelectedSlides -= 1
            }
        } else {
            if (shift > 50) {
                endSlidePositionInArrayWithoutSelectedSlides += 1
            }
        }

        let selectionSlides = editor.presentation.slides.filter(slide => {
            return editor.selectionSlidesId.includes(slide.id)
        })

        let allSlidesWithoutSelectionSlides = editor.presentation.slides.filter(slide => {
            return !editor.selectionSlidesId.includes(slide.id)
        })

        let newSlidesArray = allSlidesWithoutSelectionSlides
        newSlidesArray.splice(endSlidePositionInArrayWithoutSelectedSlides, 0, ...selectionSlides)

        return {
            ...editor,
            presentation: {
                ...editor.presentation,
                slides: newSlidesArray
            },
            selectionSlidesId: editor.selectionSlidesId
        }
    }
    return editor
}
