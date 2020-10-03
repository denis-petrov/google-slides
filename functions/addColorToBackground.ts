import {Editor} from '../entities/Editor'
import {Color} from "../entities/Color";

export {
    addColorToBackground
}

function addColorToBackground(redactor: Editor, slideId: number, color: Color): Editor {
    return {
        ...redactor,
        Presentation: {
            ...redactor.Presentation,
            Slides: redactor.Presentation.Slides.map(s => {
                if (redactor.SelectionSlidesId.includes(s.Id))
                {
                    return {
                        ...s,
                        Background: color,
                    }
                }
                return s
            })
        }
    }
}