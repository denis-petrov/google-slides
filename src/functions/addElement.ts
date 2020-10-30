import {Editor} from '../entities/Editor'
import {Element} from '../entities/Elements'

export {
    addElement
}

function addElement(editor: Editor, element: Element) {
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: editor.presentation.slides.map(s => {
                if (editor.selectionSlidesId.includes(s.id)) {
                    let elements = editor.presentation.slides[s.id].elements.slice()
                    element.id = Math.max(...elements.map(element => element.id)) + 1
                    elements.push(element)
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