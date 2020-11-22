import {Editor} from '../entities/Editor'
import {changeTextStyleMenu} from "./changeTextStyleMenu"
import {ElementType} from "../entities/Elements"
import {changePrimitiveStyleMenu} from "./changePrimitiveStyleMenu"

export function deleteElements(editor: Editor): Editor {
    return {
        ...editor,
        presentation: {
            name: editor.presentation.name,
            slides: editor.presentation.slides.map(s => {
                if (editor.selectionSlidesId.includes(s.id))
                {
                    return {
                        ...s,
                        elements: s.elements.filter(elem => {
                            if (elem.type == ElementType.text) {
                                changeTextStyleMenu(false)
                            } else {
                                changePrimitiveStyleMenu(false)
                            }
                            return !s.selectionElementsId.includes(elem.id)}),
                        selectionElementsId: []
                    }
                }
                return s
            })
        }
    }
}