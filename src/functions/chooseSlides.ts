import {Editor} from '../entities/Editor'

export function chooseSlides(editor: Editor, slides: Array<string>): Editor {
    return {
        ...editor,
        selectionSlidesId: slides,
    }
}