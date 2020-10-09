import {Editor} from '../entities/Editor'
import {TextStyle} from '../entities/TextStyle'
import {ElementType, Text} from '../entities/Elements'

export {
    changeStyleOfText
}

function changeStyleOfText(editor: Editor, elementsId: Array<number>, textStyle: TextStyle): Editor {

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: editor.presentation.slides.map(s => {
                if (editor.selectionSlidesId.includes(s.id)) {
                    return {
                        ...s,
                        elements: s.elements.filter((element) => {
                            if ((elementsId.includes(element.id)) && (element.type == ElementType.text)) {
                                return {
                                    ...element,
                                    textStyle: (element as Text).textStyle = textStyle
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
