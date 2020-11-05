import {Editor} from '../entities/Editor'
import {Point} from '../entities/Point'

export {
    changePositionOfElements
}

function changePositionOfElements(editor: Editor, elementsId: Array<string>, newCenter: Point,
                                  newTopLeftPoint: Point, newBottomRightPoint: Point): Editor {
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
                                return {
                                    ...element,
                                    position: {
                                        ...element.center,
                                        x: element.center.x += newCenter.x,
                                        y: element.center.y += newCenter.y,
                                    },
                                    topLeftPoint: element.topLeftPoint = newTopLeftPoint,
                                    bottomRightPoint: element.bottomRightPoint = newBottomRightPoint
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