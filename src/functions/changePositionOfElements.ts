import {Editor} from '../entities/Editor'
import {Point} from '../entities/Point'
import {getEditor} from "../stateManager/StateManager";

export {
    changePositionOfElements
}

function changePositionOfElements(editor: Editor, payload: any): Editor {

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: editor.presentation.slides.map(s => {
                if (editor.selectionSlidesId.includes(s.id)) {
                    return {
                        ...s,
                        elements: s.elements.filter((element) => {
                            if (payload.elementsId.includes(element.id)) {
                                return {
                                    ...element,
                                    center: element.center = payload.newCenter,
                                    topLeftPoint: element.topLeftPoint = payload.newTopLeftPoint,
                                    bottomRightPoint: element.bottomRightPoint = payload.newBottomRightPoint
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