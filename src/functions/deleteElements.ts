import {Editor} from '../entities/Editor'

export function deleteElements(editor: Editor): Editor {
    console.log(editor)
    return {
        ...editor,
        presentation: {
            name: editor.presentation.name,
            slides: editor.presentation.slides.map(s => {
                if (editor.selectionSlidesId.includes(s.id))
                {
                    return {
                        ...s,
                        elements: s.elements.filter(elem => {return !s.selectionElementsId.includes(elem.id)}),
                        selectionElementsId: []
                    }
                }
                return s
            })
        }
    }
}