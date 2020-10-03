import {Editor} from '../entities/Editor'
import {TextStyle} from '../entities/TextStyle'
import {ElementType} from '../entities/Elements'

export {
    changeStyleOfText
}

function changeStyleOfText(editor: Editor, slideId: number, elementsId: Array<number>, textStyle: TextStyle): Editor {

    return {
        ...editor,
        Presentation: {
            ...editor.Presentation,
            Slides: editor.Presentation.Slides.map(s => {
                if (editor.SelectionSlidesId.includes(s.Id))
                {
                    return {
                        ...s,
                        Elements: editor.Presentation.Slides[slideId].Elements.filter((e) => {
                            if ((elementsId.includes(e.Id)) && (e.Type == ElementType.text))
                            {
                                return {
                                    ...e,
                                    TextStyle: textStyle
                                }
                            }

                            return e
                        })
                    }
                }

                return s
            })
        }
    }
}
