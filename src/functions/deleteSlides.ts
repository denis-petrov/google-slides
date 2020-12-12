import {Editor} from '../entities/Editor'
import {v4 as uuidv4} from "uuid"
import {WHITE} from "../entities/Constants"
import {Slide} from "../entities/Slide"

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

    if (editor.presentation.slides.length == 1) {
        let slideId = uuidv4()
        return {
            ...editor,
            presentation: {
                name: editor.presentation.name,
                slides: [{
                    id: slideId,
                    elements: [],
                    background: WHITE,
                    selectionElementsId: []
                } as Slide]
            },
            selectionSlidesId: [slideId]
        }
    } else {
        if (indexOfSelectedSlide == editor.presentation.slides.length - 1) {
            indexOfSelectedSlide -= 1
        }

        return {
            ...editor,
            presentation: {
                name: editor.presentation.name,
                slides: newSlides
            },
            selectionSlidesId: [newSlides[indexOfSelectedSlide].id]
        }
    }
}