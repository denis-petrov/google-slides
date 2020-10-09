import {Editor} from '../entities/Editor'
import {Slide} from '../entities/Slide'
import {WHITE} from '../entities/Constants'

export {
    addEmptySlide
}

function addEmptySlide(editor: Editor) {
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: editor.presentation.slides.concat({
                    id: editor.presentation.slides.length == 0 ? 0 : editor.presentation.slides.length,
                    elements: [],
                    background: WHITE,
                    selectionElementsId: []
                } as Slide
            )
        }
    }
}