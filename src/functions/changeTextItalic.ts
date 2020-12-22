import {Editor} from '../entities/Editor'
import {ElementType, Text} from "../entities/Elements"


export function changeTextItalic(editor: Editor): Editor {
    return {
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
                                    (elem as Text).textStyle.isCurve = !(elem as Text).textStyle.isCurve
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
    } as Editor
}   