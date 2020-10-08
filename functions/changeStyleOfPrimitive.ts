import {Color} from '../entities/Color'
import {Editor} from '../entities/Editor'
import {ElementType, Ellipse, Rectangle, Triangle} from '../entities/Elements'

export {
    changeStyleOfPrimitive
}

function changeStyleOfPrimitive(editor: Editor, elementsId: Array<number>, newBackgroundColor: Color, newBorderColor: Color): Editor {
    return {
        ...editor,
        Presentation: {
            ...editor.Presentation,
            Slides: editor.Presentation.Slides.map(s => {
                if (editor.SelectionSlidesId.includes(s.Id)) {
                    return {
                        ...s,
                        Elements: s.Elements.filter((element) => {
                            if ((elementsId.includes(element.Id)) && ((element.Type == ElementType.triangle)
                                || (element.Type == ElementType.ellipse) || (element.Type == ElementType.rectangle))) {
                                return {
                                    ...element,
                                    BackgroundColor: (element as (Ellipse | Triangle | Rectangle)).BackgroundColor = newBackgroundColor,
                                    BorderColor: element.BorderColor = newBorderColor
                                }
                            }

                            return element
                        })
                    }
                }

                return s
            })
        }
    }
}
