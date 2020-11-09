import {Editor} from '../entities/Editor'
import {Color} from "../entities/Color"

export {
    addToBackground
}

function addToBackground(editor: Editor, data: string | Color): Editor {
    return <Editor>{
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: editor.presentation.slides.map(s => {
                if (editor.selectionSlidesId.includes(s.id)) {
                    return {
                        ...s,
                        background: data,
                    }
                }
                return s
            })
        }
    }
}   