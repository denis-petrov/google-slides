import {Editor} from '../entities/Editor'

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
                            if (payload.get('elements').get(element.id)) {
                                let newPos = payload.get('elements').get(element.id)
                                return {
                                    ...element,
                                    center: {
                                        x: element.center.x = newPos.get('newCenter').get('x'),
                                        y: element.center.y = newPos.get('newCenter').get('y')
                                    },
                                    topLeftPoint: {
                                        x: element.topLeftPoint.x = newPos.get('newTopLeftPoint').get('x'),
                                        y: element.topLeftPoint.y = newPos.get('newTopLeftPoint').get('y')
                                    },
                                    bottomRightPoint: {
                                        x: element.bottomRightPoint.x = newPos.get('newBottomRightPoint').get('x'),
                                        y: element.bottomRightPoint.y = newPos.get('newBottomRightPoint').get('y')
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