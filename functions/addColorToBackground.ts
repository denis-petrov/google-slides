import {Editor} from '../entities/Editor'
import {Color} from '../entities/Color'

export {
    addColorToBackground
}

function addColorToBackground(editor: Editor, color: Color, slideId: number): Editor {
    return {
        ...editor,
        Presentation: {
            ...editor.Presentation,
            Slides: editor.Presentation.Slides.map(slide => {
                if (editor.SelectionSlidesId.includes(slideId)) {
                    return {
                        ...slide,
                        Background: color,
                    }
                }
                return slide
            })
        }
    }
}