import {Editor} from '../entities/Editor'
import {Elements} from '../entities/Elements'

export {
    addElement
}

function addElement(editor: Editor, element: Elements) {
    return {
        ...editor,
        Presentation: {
            ...editor.Presentation,
            Slides: editor.Presentation.Slides.map(s => {
                if (editor.SelectionSlidesId.includes(s.Id)) {
                    let elements = editor.Presentation.Slides[s.Id].Elements.slice()
                    element.Id = Math.max(...elements.map(element => element.Id)) + 1
                    elements.push(element)
                    return {
                        ...s,
                        Elements: elements
                    }
                }
                return s
            })
        }
    }
}