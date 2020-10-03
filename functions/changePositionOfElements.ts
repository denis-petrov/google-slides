import {Editor} from '../entities/Editor'
import {Point} from '../entities/Point'

export {
    changePositionOfElements
}

function changePositionOfElements(editor: Editor, slideId: number, elementsId: Array<number>, newPosition: Point,
	addScaleX: number, addScaleY: number, addAngleRoute: number): Editor {

    return {
        ...editor,
        Presentation: {
            ...editor.Presentation,
            Slides: editor.Presentation.Slides.map(s => {
                if (editor.SelectionSlidesId.includes(s.Id))
                {
                    return {
                        ...s,
                        Elements: editor.Presentation.Slides[slideId].Elements.filter((element, index,array) => {
                            if (elementsId.includes(element.Id))
                            {
                                return {
                                    ...element,
                                    Position: {
                                        ...element.Position,
                                        X: element.Position.X +newPosition.X,
                                        Y: element.Position.Y + newPosition.Y,
                                    },
                                    scaleX: element.scaleX + addScaleX,
                                    scaleY: element.scaleY + addScaleY,
                                    angleRoute: element.angleRoute + addAngleRoute
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