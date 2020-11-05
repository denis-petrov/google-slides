import {Editor} from '../entities/Editor'

export {
    deleteSlides
}

function deleteSlides(editor: Editor): Editor {
    console.log(editor)

    let slidesId = editor.selectionSlidesId;

    return {
        ...editor,
        presentation: {
            name: editor.presentation.name,
            slides: editor.presentation.slides.filter(slide => {
                let isDeleted = false;

                for (let i = 0; i < slidesId.length; i++) {
                    isDeleted = (slidesId[i] === slide.id)
                    if (isDeleted) {
                        break
                    }
                }
                return !isDeleted
            })
        }
    }
}