import {Editor} from '../entities/Editor'
import {Slide} from '../entities/Slide'

export {
    deleteElements
}

function deleteElements(editor: Editor, slideId: number, elementsForDeleting: Array<number>): Editor {
    let slideWithDeletedElements: Slide = editor.presentation.slides.find(slide => slide.id === slideId)
    let allSlidesWithoutSlidesWithDeletedElements = editor.presentation.slides.filter(
        slides => slides.id !== slideWithDeletedElements.id
    )
    slideWithDeletedElements.elements = slideWithDeletedElements.elements
        .filter(elem => !elementsForDeleting.includes(elem.id))
    return {
        ...editor,
        presentation: {
            name: editor.presentation.name,
            slides: allSlidesWithoutSlidesWithDeletedElements.concat(slideWithDeletedElements)
        }
    }
}
