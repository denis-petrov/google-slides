import {Editor} from '../entities/Editor'
import {TextStyle} from '../entities/TextStyle'
import {ElementType, Text} from '../entities/Elements'

export {
    changeStyleOfText
}

function changeStyleOfText(editor: Editor, elementsId: Array<number>, textStyle: TextStyle): Editor {

    return {
        ...editor,
        Presentation: {
            ...editor.Presentation,
            Slides: editor.Presentation.Slides.map(s => {
                if (editor.SelectionSlidesId.includes(s.Id))
                {
                    return {
                        ...s,
                        Elements: s.Elements.filter((element) => {
                            if ((elementsId.includes(element.Id)) && (element.Type == ElementType.text))
                            {
                                return {
                                    ...element,
                                    TextStyle: (element as Text).TextStyle = textStyle
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
