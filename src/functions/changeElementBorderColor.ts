import {Editor} from '../entities/Editor'
import {hexToRgb} from "./hexToRgb"


export function changeElementBorderColor(editor: Editor, color: string): Editor {
    return <Editor>{
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: editor.presentation.slides.map(s => {
                if (editor.selectionSlidesId.includes(s.id)) {
                    return {
                        ...s,
                        elements: s.elements.map(elem => {
                            if (s.selectionElementsId.includes(elem.id)) {
                                elem.borderColor = hexToRgb(color)
                                return elem
                            }
                            return elem
                        })
                    }
                }
                return s
            })
        }
    }
}   