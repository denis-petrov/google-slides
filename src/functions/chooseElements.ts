import {Editor} from '../entities/Editor'

export {
    chooseElements
}

function chooseElements(editor: Editor, listElementsId: Array<number>): Editor {
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: editor.presentation.slides.map(s => {
                if (editor.selectionSlidesId.includes(s.id))
                {
                    return {
                        ...s,
                        selectionElementsId: listElementsId
                    }
                }
                return s
            })
        }
    }
}