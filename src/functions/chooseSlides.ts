import {Editor} from '../entities/Editor'

export {
    chooseSlides
}

function chooseSlides(editor: Editor, slides: Array<string>): Editor {
    editor.selectionSlidesId = []
    for (let i = 0; i < slides.length; i++) {
        editor.selectionSlidesId.push(slides[i])
    }
    return editor
}