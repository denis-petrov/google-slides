import {Editor} from '../entities/Editor'
import {ElementType, Text} from "../entities/Elements"


export function changeTextValue(editor: Editor, payload: any): Editor {
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: editor.presentation.slides.map(s => {
                if (editor.selectionSlidesId.includes(s.id)) {
                    return {
                        ...s,
                        elements: s.elements.map(elem => {
                            if (elem.id === payload.id) {
                                if (elem.type === ElementType.text) {
                                    (elem as Text).text = payload.value
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