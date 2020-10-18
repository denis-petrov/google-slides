import {Editor} from '../entities/Editor'

export {
    deleteSlides
}

function deleteSlides(editor: Editor, slidesId: Array<number>): Editor {
    return {
        ...editor,
        presentation: {
            name: editor.presentation.name,
            slides: editor.presentation.slides.filter(slide => !slidesId.includes(slide.id))
        }
    }
}