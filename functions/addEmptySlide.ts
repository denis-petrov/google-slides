import {Editor} from '../entities/Editor'
import {Slide} from '../entities/Slide'
import {WHITE} from '../entities/Constants'

export {
    addEmptySlide
}

function addEmptySlide(editor: Editor) {
    return {
        ...editor,
        Presentation: {
            ...editor.Presentation,
            Slides: editor.Presentation.Slides.concat({
                    Id: editor.Presentation.Slides.length == 0 ? 0 : editor.Presentation.Slides.length,
                    Elements: [],
                    Background: WHITE,
                    SelectionElementsId: []
                } as Slide
            )
        }
    }
}