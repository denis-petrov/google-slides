import {Editor} from '../entities/Editor'
import {Element} from '../entities/Elements'
import {deepCopy} from "deep-copy-ts"
import { v4 as uuidv4 } from 'uuid'

export {
    addElement
}

function addElement(editor: Editor, element: Element) {
    let copyElement = deepCopy(element)

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: editor.presentation.slides.map(s => {
                if (editor.selectionSlidesId.includes(s.id)) {
                    let elements = editor.presentation.slides.filter((slide) => s.id === slide.id)[0].elements.slice()/*[s.id].elements.slice()*/
                    copyElement.id = uuidv4()

                    elements.push(copyElement)
                    return {
                        ...s,
                        elements: elements
                    }
                }
                return s
            })
        }
    }
}