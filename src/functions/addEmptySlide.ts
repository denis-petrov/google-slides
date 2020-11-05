import {Editor} from '../entities/Editor'
import {Slide} from '../entities/Slide'
import {WHITE} from '../entities/Constants'
import { v4 as uuidv4 } from 'uuid'

export {
    addEmptySlide
}

function addEmptySlide(editor: Editor) {
    console.log(editor)
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: editor.presentation.slides.concat({
                    id: uuidv4(),
                    elements: [],
                    background: WHITE,
                    selectionElementsId: []
                } as Slide
            )
        }
    }
}