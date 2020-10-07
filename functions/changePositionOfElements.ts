import {Editor} from '../entities/Editor'
import {Point} from '../entities/Point'
import {ElementType, Triangle} from '../entities/Elements'

export {
    changePositionOfElements
}

function changePositionOfElements(editor: Editor, elementsId: Array<number>, newPosition: Point,
                                  addScaleX: number, addScaleY: number, addAngleRoute: number): Editor {

    return {
        ...editor,
        Presentation: {
            ...editor.Presentation,
            Slides: editor.Presentation.Slides.map(s => {
                if (editor.SelectionSlidesId.includes(s.Id)) {
                    return {
                        ...s,
                        Elements: s.Elements.filter((element) => {
                            if (elementsId.includes(element.Id)) {
                                if (element.Type == ElementType.triangle) {
                                    return {
                                        ...element,
                                        A: {
                                            X: (element as Triangle).A.X += newPosition.X,
                                            Y: (element as Triangle).A.Y += newPosition.Y
                                        },
                                        B: {
                                            X: (element as Triangle).B.X += newPosition.X,
                                            Y: (element as Triangle).B.Y += newPosition.Y
                                        },
                                        C: {
                                            X: (element as Triangle).C.X += newPosition.X,
                                            Y: (element as Triangle).C.Y += newPosition.Y
                                        },
                                        Position: {
                                            ...element.Position,
                                            X: element.Position.X += newPosition.X,
                                            Y: element.Position.Y += newPosition.Y,
                                        },
                                        scaleX: element.scaleX += addScaleX,
                                        scaleY: element.scaleY += addScaleY,
                                        angleRoute: element.angleRoute += addAngleRoute
                                    }
                                } else {
                                    return {
                                        ...element,
                                        Position: {
                                            ...element.Position,
                                            X: element.Position.X += newPosition.X,
                                            Y: element.Position.Y += newPosition.Y,
                                        },
                                        scaleX: element.scaleX += addScaleX,
                                        scaleY: element.scaleY += addScaleY,
                                        angleRoute: element.angleRoute += addAngleRoute
                                    }
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