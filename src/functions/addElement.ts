import {Editor} from '../entities/Editor'
import {Element} from '../entities/Elements'
import {deepCopy} from "deep-copy-ts";

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
                    let elements = editor.presentation.slides[s.id].elements.slice()
                    if (elements.length > 0) {
                        copyElement.id = Math.max(...elements.map(element => element.id)) + 1
                    }

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