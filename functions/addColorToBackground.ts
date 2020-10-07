import {Editor} from '../entities/Editor'
import {Color} from '../entities/Color'

export {
    addColorToBackground
}

function addColorToBackground(editor: Editor, color: Color): Editor {
    return {
        ...editor,
        Presentation: {
            ...editor.Presentation,
            Slides: editor.Presentation.Slides.map(s => {
                if (editor.SelectionSlidesId.includes(s.Id)) {
                    return {
                        ...s,
                        Background: color,
                    }
                }
                return s
            })
        }
    }
}