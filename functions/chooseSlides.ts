import {Editor} from '../entities/Editor'

export {
    chooseSlides
}

function chooseSlides(editor: Editor, slides: Array<number>): Editor {
    return {
        ...editor,
        SelectionSlidesId: editor.SelectionSlidesId.slice().concat(slides)
    }
}