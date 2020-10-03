import {Editor} from '../entities/Editor'
import {Image} from '../entities/Elements'

export {
    addPhotoToBackground
}

function addPhotoToBackground(editor: Editor, img: Image, slideId: number): Editor {
    return {
        ...editor,
        Presentation: {
            ...editor.Presentation,
            Slides: editor.Presentation.Slides.map(slide => {
                if (editor.SelectionSlidesId.includes(slideId)) {
                    return {
                        ...slide,
                        Background: img,
                    }
                }
                return slide
            })
        }
    }
}   