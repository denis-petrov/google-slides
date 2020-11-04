import {Editor} from '../entities/Editor'

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
                            let isDeleted = false;

                            for(let i = 0; i < s.selectionElementsId.length; i++) {
                                isDeleted = (s.selectionElementsId[i] === elem.id)
                                if (isDeleted) {
                                    return false
                                }
                            }
                            return !isDeleted
                        })
                    }
                }
                return s
            })
        }
    }
}