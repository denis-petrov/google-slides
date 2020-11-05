import {Color} from '../entities/Color'
import {Editor} from '../entities/Editor'
import {ElementType, Element} from '../entities/Elements'

export {
    changeStyleOfPrimitive
}

function changeStyleOfPrimitive(
    editor: Editor,
    elementsId: Array<string>,
    newBackgroundColor: Color,
    newBorderColor: Color,
    newBorderWidth: number
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
                                    backgroundColor: (element as Element).backgroundColor = newBackgroundColor,
                                    borderColor: element.borderColor = newBorderColor,
                                    borderWidth: element.borderWidth = newBorderWidth
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
