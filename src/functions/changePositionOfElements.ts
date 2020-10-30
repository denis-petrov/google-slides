import {Editor} from '../entities/Editor'
import {Point} from '../entities/Point'
import {ElementType, Element} from '../entities/Elements'

export {
    changePositionOfElements
}

function changePositionOfElements(editor: Editor, elementsId: Array<number>, newPosition: Point,
                                  addScaleX: number, addScaleY: number, addAngleRoute: number): Editor {

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: editor.presentation.slides.map(s => {
                if (editor.selectionSlidesId.includes(s.id)) {
                    return {
                        ...s,
                        elements: s.elements.filter((element) => {
                            if (elementsId.includes(element.id)) {
                                if (element.type === ElementType.triangle) {
                                    return {
                                        ...element,
                                        a: {
                                            x: (element as Element).a.x += newPosition.x,
                                            y: (element as Element).a.y += newPosition.y
                                        },
                                        b: {
                                            x: (element as Element).b.x += newPosition.x,
                                            y: (element as Element).b.y += newPosition.y
                                        },
                                        c: {
                                            x: (element as Element).c.x += newPosition.x,
                                            y: (element as Element).c.y += newPosition.y
                                        },
                                        position: {
                                            ...element.position,
                                            x: element.position.x += newPosition.x,
                                            y: element.position.y += newPosition.y,
                                        },
                                        scaleX: element.scaleX += addScaleX,
                                        scaleY: element.scaleY += addScaleY,
                                        angleRoute: element.angleRoute += addAngleRoute
                                    }
                                } else {
                                    return {
                                        ...element,
                                        position: {
                                            ...element.position,
                                            x: element.position.x += newPosition.x,
                                            y: element.position.y += newPosition.y,
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