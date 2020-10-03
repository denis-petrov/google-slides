import {Editor} from '../entities/Editor'
import {Slide} from "../entities/Slide";

export {
    deleteElements
}

function deleteElements(editor: Editor, slideId: number, elements: Array<number>): Editor {
    let slideWithDeletedElements: Slide = editor.Presentation.Slides[slideId]
    let allSlides = editor.Presentation.Slides.filter(
        slides => slides.Id != slideWithDeletedElements.Id
    )
    slideWithDeletedElements.Elements = slideWithDeletedElements.Elements
        .filter(elem => !elements.includes(elem.Id))
    return {
        ...editor,
        Presentation: {
            Slides: allSlides
        }
    }
}
