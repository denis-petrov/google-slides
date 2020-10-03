import {Editor} from '../entities/Editor'
import {Slide} from '../entities/Slide'
import {WHITE} from '../Constants'

export {
    addEmptySlide
}

function addEmptySlide(editor: Editor) {
    return {
        ...editor,
        Presentation: {
            ...editor.Presentation,
            Slides: editor.Presentation.Slides.push({
                    Id: editor.Presentation.Slides.length + 1,
                    Elements: null,
                    Background: WHITE,
                    SelectionElementsId: null
                } as Slide
            )
        }
    }
}