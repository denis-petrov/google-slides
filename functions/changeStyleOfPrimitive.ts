import {Color} from '../entities/Color'
import {Editor} from '../entities/Editor'
import {ElementType} from "../entities/Element";

export {
    changeStyleOfPrimitive
}

function changeStyleOfPrimitive(editor: Editor, slideId: number, elementsId: Array<number>, newBackgroundColor: Color, newBorderColor: Color): Editor {
    return {
        ...editor,
        Presentation: {
            ...editor.Presentation,
            Slides: editor.Presentation.Slides.map(s => {
                if (editor.SelectionSlidesId.includes(s.Id))
                {
                    return {
                        ...s,
                        Elements: editor.Presentation.Slides[slideId].Elements.filter((e, index,array) => {
                            if ((elementsId.includes(e.Id)) && (e.Type != ElementType.text) && (e.Type != ElementType.image))
                            {
                                return {
                                    ...e,
                                    BackgroundColor: newBackgroundColor,
                                    BorderColor: newBorderColor
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
