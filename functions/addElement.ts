import {Editor} from '../entities/Editor'
import {Elements} from '../entities/Elements'

export {
    addElement
}

function addElement(editor: Editor, element: Elements, slideId: number) {
    return {
        ...editor,
        Presentation: {
            ...editor.Presentation,
            Slides: editor.Presentation.Slides.map(slide => {
                if (editor.SelectionSlidesId.includes(slideId)) {
                    let elements = editor.Presentation.Slides[slideId].Elements.slice()
                    element.Id = Math.max(...elements.map(element => element.Id)) + 1
                    elements.push(element)
                    return {
                        ...slide,
                        Elements: elements
                    }
                }
                return slide
            })
        }
    }
}