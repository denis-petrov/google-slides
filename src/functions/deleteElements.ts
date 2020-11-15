import {Editor} from '../entities/Editor'
import {changeVisibilityTextStyleMenu} from "./changeVisibilityTextStyleMenu";
import {ElementType} from "../entities/Elements";

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
                                changeVisibilityTextStyleMenu(false)
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