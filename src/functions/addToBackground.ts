import {Editor} from '../entities/Editor'
import {Color, isColor} from "../entities/Color"
import {ImageElement} from "../entities/Elements";

export {
    addToBackground
}

function addToBackground(editor: Editor, data: ImageElement | Color): Editor {
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: editor.presentation.slides.map(s => {
                if (editor.selectionSlidesId.includes(s.id)) {
                    return {
                        ...s,
                        background: isColor(data)? data: (data as ImageElement).link,
                    }
                }
                return s
            })
        }
    } as Editor
}   