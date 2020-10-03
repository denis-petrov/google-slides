import {Editor} from '../entities/Editor'
import {Slide} from '../entities/Slide'

export {
    addEmptySlide
}

function addEmptySlide(editor: Editor) {
    return {
        ...editor,
        Presentation: {
            ...editor.Presentation,
            Slides: editor.Presentation.Slides.push(
                {
                    Id: editor.Presentation.Slides.length + 1,
                    Elements: null,
                    Background: {
                        Red: 229,
                        Green: 229,
                        Blue: 229
                    },
                    SelectionElementsId: null
                } as Slide
            )
        }
    }
}