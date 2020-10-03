import {Editor} from '../entities/Editor'

export {
    chooseElements
}

function chooseElements(editor: Editor, slideId: number, listElements: Array<number>): Editor {
    return {
        ...editor,
        Presentation: {
            ...editor.Presentation,
            Slides: editor.Presentation.Slides.map(s => {
                if (editor.SelectionSlidesId.includes(s.Id))
                {
                    return {
                        ...s,
                        SelectionElements: listElements
                    }
                }
                return s
            })
        }
    }
    return editor
}   