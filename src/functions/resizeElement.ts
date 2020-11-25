import {getEditor} from "../stateManager/StateManager"
import {ElementType, ImageElement} from "../entities/Elements";

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
                if (s.selectionElementsId.includes(e.id) && s.selectionElementsId.length <= 1) {
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

                        let prevWidth = Math.round((e.bottomRightPoint.x - e.topLeftPoint.x) * 100) / 100
                        let prevHeight = Math.round((e.bottomRightPoint.y - e.topLeftPoint.y) * 100) / 100
                        let viewBoxWidth = Math.round((bottomRightPointX - topLeftPointX) * 10 * 100) / 100
                        let width = Math.round((bottomRightPointX - topLeftPointX) * 100) / 100
                        let height = Math.round((bottomRightPointY - topLeftPointY) * 100) / 100
                        let viewBoxHeight = Math.round(height * 10 * 100) / 100
                        if (prevWidth > prevHeight) {
                            viewBoxHeight = Math.round(height * 10 * 100) / 100
                        } else {
                            viewBoxHeight = Math.round(height * 10 / 16 * 9 * 100) / 100
                        }

                        if (e.type === ElementType.image) {
                            let image = e as ImageElement
                            viewBoxWidth = image.viewBox.width * (width / prevWidth)
                            viewBoxHeight = image.viewBox.height * (height / prevHeight)
                        }

                        let elementPathId = (document.getElementById(e.id) as HTMLElement).getAttribute('data-path-id')
                        let elementBorder = document.getElementById(elementPathId as string)
                        let d = `M 0, 0 H ${viewBoxWidth} V ${viewBoxHeight} H 0 V 0`
                        if (elementBorder) {
                            elementBorder.setAttribute('d', d)
                        }

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
                        payload.set('elements', elements)
                        if (elemWidth < 5 || elemHeight < 5) {
                            payload.set('small', true)
                        }
                    }
                }
            })
        }
    })

    return payload
}