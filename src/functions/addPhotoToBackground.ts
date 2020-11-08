import {Editor} from '../entities/Editor'
import {ImageElement} from '../entities/Elements'

export {
    addPhotoToBackground
}

function addPhotoToBackground(editor: Editor, img: ImageElement): Editor {
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: editor.presentation.slides.map(s => {
                if (editor.selectionSlidesId.includes(s.id)) {
                    return {
                        ...s,
                        background: img,
                    }
                }
                return s
            })
        }
    }
}   