import {Editor} from '../entities/Editor'
import {ElementType, Text} from "../entities/Elements"


export function changeTextUnderline(editor: Editor): Editor {
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
                                if (elem.type === ElementType.text) {
                                    (elem as Text).textStyle.isUnderline = !(elem as Text).textStyle.isUnderline
                                    return elem
                                }
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