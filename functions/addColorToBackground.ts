import {Editor} from '../entities/Editor'
import {Color} from '../entities/Color'

export {
    addColorToBackground
}

function addColorToBackground(editor: Editor, color: Color): Editor {
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: editor.presentation.slides.map(s => {
                if (editor.selectionSlidesId.includes(s.id)) {
                    return {
                        ...s,
                        background: color,
                    }
                }
                return s
            })
        }
    }
}