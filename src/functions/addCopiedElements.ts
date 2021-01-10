import {Editor} from '../entities/Editor'
import {Element} from '../entities/Elements'
import { v4 as uuidv4 } from 'uuid'


export function addCopiedElements(editor: Editor, copiedElements: Array<Element>): Editor {

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: editor.presentation.slides.map(s => {
                if (editor.selectionSlidesId.includes(s.id)) {
                    let elements = editor.presentation.slides.filter((slide) => s.id === slide.id)[0].elements.slice()
                    copiedElements.forEach(e => {
                        e.id = uuidv4()
                        elements.push(e)
                    })

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