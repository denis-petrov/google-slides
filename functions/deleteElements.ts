import {Editor} from '../entities/Editor'
import {Slide} from "../entities/Slide";

export {
    deleteElements
}

function deleteElements(editor: Editor, slideId: number, elementsForDeleting: Array<number>): Editor {
    let slideWithDeletedElements: Slide = editor.Presentation.Slides.find(slide => slide.Id == slideId)
    let allSlidesWithoutslidesWithDeletedElements = editor.Presentation.Slides.filter(
        slides => slides.Id != slideWithDeletedElements.Id
    )
    slideWithDeletedElements.Elements = slideWithDeletedElements.Elements
        .filter(elem => !elementsForDeleting.includes(elem.Id))
    return {
        ...editor,
        Presentation: {
            Slides: allSlidesWithoutslidesWithDeletedElements.concat(slideWithDeletedElements)
        }
    }
}
