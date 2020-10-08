import {Editor} from '../entities/Editor'
import {Image} from '../entities/Elements'

export {
    addPhotoToBackground
}

function addPhotoToBackground(editor: Editor, img: Image): Editor {
    return {
        ...editor,
        Presentation: {
            ...editor.Presentation,
            Slides: editor.Presentation.Slides.map(s => {
                if (editor.SelectionSlidesId.includes(s.Id)) {
                    return {
                        ...s,
                        Background: img,
                    }
                }
                return s
            })
        }
    }
}   