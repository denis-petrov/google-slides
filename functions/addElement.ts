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
                    return {
                        ...slide.Elements.push(element) as {},
                    }
                }
                return slide
            })
        }
    }
}