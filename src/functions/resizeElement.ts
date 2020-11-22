import {getEditor} from "../stateManager/StateManager"

export function resizeElement(event: any, pointIndex: number) {
    let point = event.target
    if (point.getAttribute('data-value') === 'point') {
        let allPoints = event.target.parentNode.childNodes
        for (let i = 0; i < allPoints.length; i++) {
            if (allPoints[i] === event.target) {
                pointIndex = i
            }
        }
    }

    return pointIndex
}

export function moveElementPoint(event: any, firstPosX: number, firstPosY: number, pointIndex: number) {
    let editor = getEditor()
    let stepX
    let stepY
    let payload = new Map()
    let slide = document.getElementsByClassName('workspace')[0]
    editor.presentation.slides.map(s => {
        if (editor.selectionSlidesId.includes(s.id)) {
            s.elements.filter(e => {
                if (s.selectionElementsId.includes(e.id)) {
                    if (event.clientX !== firstPosX || event.clientY !== firstPosY) {
                        stepX = event.clientX - firstPosX
                        stepY = event.clientY - firstPosY
                        let X = Math.floor(stepX/(slide.clientWidth)*100*100)/100
                        let Y = Math.floor(stepY/(slide.clientHeight)*100*100)/100

                        let elements = new Map()
                        let newPos = new Map()
                        let newTopLeftPoint = new Map()
                        let newBottomRightPoint = new Map()
                        let newCenter = new Map()

                        let topLeftPointX = e.topLeftPoint.x
                        let topLeftPointY = e.topLeftPoint.y
                        let bottomRightPointX = e.bottomRightPoint.x
                        let bottomRightPointY = e.bottomRightPoint.y

                        switch (pointIndex) {
                            case 0:
                                topLeftPointX += X
                                topLeftPointY += Y
                                break
                            case 1:
                                topLeftPointY += Y
                                break
                            case 2:
                                topLeftPointY += Y
                                bottomRightPointX += X
                                break
                            case 3:
                                topLeftPointX += X
                                break
                            case 4:
                                bottomRightPointX += X
                                break
                            case 5:
                                topLeftPointX += X
                                bottomRightPointY += Y
                                break
                            case 6:
                                bottomRightPointY += Y
                                break
                            case 7:
                                bottomRightPointX += X
                                bottomRightPointY += Y
                                break
                        }

                        topLeftPointX = Math.round(topLeftPointX * 100) / 100
                        topLeftPointY = Math.round(topLeftPointY * 100) / 100
                        bottomRightPointX = Math.round(bottomRightPointX * 100) / 100
                        bottomRightPointY = Math.round(bottomRightPointY * 100) / 100

                        newTopLeftPoint.set('x', topLeftPointX)
                        newTopLeftPoint.set('y', topLeftPointY)
                        newBottomRightPoint.set('x', bottomRightPointX)
                        newBottomRightPoint.set('y', bottomRightPointY)
                        newCenter.set('x', e.center.x)
                        newCenter.set('y', e.center.y)
                        newPos.set('newTopLeftPoint', newTopLeftPoint)
                        newPos.set('newBottomRightPoint', newBottomRightPoint)
                        newPos.set('newCenter', newCenter)
                        elements.set(e.id, newPos)
                        let elemWidth = bottomRightPointX - topLeftPointX
                        let elemHeight = bottomRightPointY - topLeftPointY
                        if (elemWidth > 5 && elemHeight > 5) {
                            payload.set('elements', elements)
                        }
                    }
                }
            })
        }
    })

    return payload
}