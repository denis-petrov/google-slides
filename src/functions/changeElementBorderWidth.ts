import {Editor} from '../entities/Editor'

export function changeElementBorderWidth(editor: Editor, width: number): Editor {
    return <Editor>{
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: editor.presentation.slides.map(s => {
                if (editor.selectionSlidesId.includes(s.id)) {
                    return {
                        ...s,
                        elements: s.elements.map(elem => {
                            if (s.selectionElementsId.includes(elem.id)) {
                                elem.borderWidth = width
                                return elem
                            }
                            return elem
                        })
                    }
                }
                return s
            })
        }
    }
}   