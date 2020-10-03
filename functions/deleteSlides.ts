import {Editor} from '../entities/Editor'

export {
    deleteSlides
}

function deleteSlides(editor: Editor, slidesId: Array<number>): Editor {
    return {
        ...editor,
        Presentation: {
            ...editor.Presentation,
            Slides: editor.Presentation.Slides.filter(slide => !slidesId.includes(slide.Id))
        }
    }
}