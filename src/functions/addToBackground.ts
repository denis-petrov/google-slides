import {Editor} from '../entities/Editor'
import {Color, isColor} from "../entities/Color"
import {ImageElement} from "../entities/Elements"


export function addToBackground(editor: Editor, elem: ImageElement | Color): Editor {
    return <Editor>{
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: editor.presentation.slides.map(s => {
                if (editor.selectionSlidesId.includes(s.id)) {
                    return {
                        ...s,
                        background: isColor(elem)? elem: (elem as ImageElement).link,
                    }
                }
                return s
            })
        }
    }
}   