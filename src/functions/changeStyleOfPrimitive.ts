import {Color} from '../entities/Color'
import {Editor} from '../entities/Editor'
import {ElementType, Ellipse, Rectangle, Triangle} from '../entities/Elements'

export {
    changeStyleOfPrimitive
}

function changeStyleOfPrimitive(
    editor: Editor,
    elementsId: Array<number>,
    newBackgroundColor: Color,
    newBorderColor: Color
): Editor {
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: editor.presentation.slides.map(s => {
                if (editor.selectionSlidesId.includes(s.id)) {
                    return {
                        ...s,
                        elements: s.elements.filter((element) => {
                            if ((elementsId.includes(element.id)) && ((element.type === ElementType.triangle)
                                || (element.type === ElementType.ellipse) || (element.type === ElementType.rectangle))) {
                                return {
                                    ...element,
                                    backgroundColor: (element as (Ellipse | Triangle | Rectangle)).backgroundColor = newBackgroundColor,
                                    borderColor: element.borderColor = newBorderColor
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
