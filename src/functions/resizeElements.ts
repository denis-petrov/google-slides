import {store} from "../store/store"

export function resizeElements(event: any, pointIndex: number) {
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
    let editor = store.getState()
    let stepX
    let stepY
    let payload = new Map()
    let slide = document.getElementsByClassName('workspace')[0]
    editor.presentation.slides.forEach(s => {
        if (editor.selectionSlidesId.includes(s.id)) {
            stepX = event.clientX - firstPosX
            stepY = event.clientY - firstPosY
            let X = Math.floor(stepX / (slide.clientWidth) * 100 * 100) / 100
            let Y = Math.floor(stepY / (slide.clientHeight) * 100 * 100) / 100
            let multipleSelection = document.getElementById('multiple-selection') as HTMLElement
            let oldTlpX: number | string | null = multipleSelection.getAttribute('data-tlp-x')
            let oldTlpY: number | string | null = multipleSelection.getAttribute('data-tlp-y')
            let oldBrpX: number | string | null = multipleSelection.getAttribute('data-brp-x')
            let oldBrpY: number | string | null = multipleSelection.getAttribute('data-brp-y')
            let oldWidth: number = 0
            let oldHeight: number = 0
            let newWidth: number = 0
            let newHeight: number = 0
            let tlpX: number = 0
            let tlpY: number = 0
            let brpX: number = 0
            let brpY: number = 0

            if (oldTlpX && oldTlpY && oldBrpX && oldBrpY) {
                oldTlpX = parseFloat(oldTlpX)
                oldTlpY = parseFloat(oldTlpY)
                oldBrpX = parseFloat(oldBrpX)
                oldBrpY = parseFloat(oldBrpY)
                tlpX = oldTlpX
                tlpY = oldTlpY
                brpX = oldBrpX
                brpY = oldBrpY
                oldWidth = oldBrpX - oldTlpX
                oldHeight = oldBrpY - oldTlpY
            }

            switch (pointIndex) {
                case 0:
                    tlpX += X
                    tlpY += Y
                    break
                case 1:
                    tlpY += Y
                    break
                case 2:
                    tlpY += Y
                    brpX += X
                    break
                case 3:
                    tlpX += X
                    break
                case 4:
                    brpX += X
                    break
                case 5:
                    tlpX += X
                    brpY += Y
                    break
                case 6:
                    brpY += Y
                    break
                case 7:
                    brpX += X
                    brpY += Y
                    break
            }

            newWidth = brpX - tlpX
            newHeight = brpY - tlpY

            let differenceX: number = 0
            let differenceY: number = 0

            differenceX = newWidth / oldWidth
            differenceY = newHeight / oldHeight

            let elements = new Map()

            let topLeftPointX: number = 0
            let topLeftPointY: number = 0
            let bottomRightPointX: number = 0
            let bottomRightPointY: number = 0

            tlpX = Math.round(tlpX * 100) / 100
            tlpY = Math.round(tlpY * 100) / 100
            brpX = Math.round(brpX * 100) / 100
            brpY = Math.round(brpY * 100) / 100


            let prevWidth = 0
            let prevHeight = 0

            if (typeof (oldTlpX) === "number" && typeof (oldTlpY) === "number" && typeof (oldBrpX) === "number" && typeof (oldBrpY) === "number") {
                prevWidth = Math.round((oldBrpX - oldTlpX) * 100) / 100
                prevHeight = Math.round((oldBrpY - oldTlpY) * 100) / 100
            }

            let width = Math.round((brpX - tlpX) * 100) / 100
            let viewBoxWidth = Math.round(width * 10 * 100) / 100
            let height = Math.round((brpY - tlpY) * 100) / 100
            let viewBoxHeight: number
            if (prevWidth > prevHeight) {
                viewBoxHeight = Math.round(height * 10 * 100) / 100
            } else {
                viewBoxHeight = Math.round(height * 10 / 16 * 9 * 100) / 100
            }


            let startVieBoxX = 0
            let startVieBoxY = 0
            switch (pointIndex) {
                case 0:
                    viewBoxWidth = Math.round(prevWidth * 10 * 100) / 100
                    if (prevWidth > prevHeight) {
                        viewBoxHeight = Math.round(prevHeight * 10 * 100) / 100
                    } else {
                        viewBoxHeight = Math.round(prevHeight * 10 / 16 * 9 * 100) / 100
                    }
                    startVieBoxX = viewBoxWidth - (width / prevWidth) * viewBoxWidth
                    startVieBoxY = viewBoxHeight - (height / prevHeight) * viewBoxHeight
                    break
                case 1:
                    if (prevWidth > prevHeight) {
                        viewBoxHeight = Math.round(prevHeight * 10 * 100) / 100
                    } else {
                        viewBoxHeight = Math.round(prevHeight * 10 / 16 * 9 * 100) / 100
                    }
                    startVieBoxY = viewBoxHeight - (height / prevHeight) * viewBoxHeight
                    break
                case 2:
                    if (prevWidth > prevHeight) {
                        viewBoxHeight = Math.round(prevHeight * 10 * 100) / 100
                    } else {
                        viewBoxHeight = Math.round(prevHeight * 10 / 16 * 9 * 100) / 100
                    }
                    startVieBoxY = viewBoxHeight - (height / prevHeight) * viewBoxHeight
                    break
                case 3:
                    startVieBoxX = (prevWidth - prevWidth * (width / prevWidth)) * 10
                    viewBoxWidth = Math.round(prevWidth * 10 * 100) / 100
                    break
                case 5:
                    viewBoxWidth = Math.round(prevWidth * 10 * 100) / 100
                    startVieBoxX = (prevWidth - prevWidth * (width / prevWidth)) * 10
                    break
            }

            let elementBorder = multipleSelection.children[0]
            let d = `M ${startVieBoxX}, ${startVieBoxY} H ${viewBoxWidth} V ${viewBoxHeight} H ${startVieBoxX} V ${startVieBoxY}`
            if (elementBorder) {
                elementBorder.setAttribute('d', d)
            }

            s.elements.forEach(e => {
                if (s.selectionElementsId.includes(e.id)) {
                    let newPos = new Map()
                    let newTopLeftPoint = new Map()
                    let newBottomRightPoint = new Map()
                    let newCenter = new Map()

                    if (typeof (oldTlpX) === "number" && typeof (oldTlpY) === "number" && typeof (oldBrpX) === "number" && typeof (oldBrpY) === "number") {
                        topLeftPointX = tlpX + differenceX * (e.topLeftPoint.x - oldTlpX)
                        topLeftPointY = tlpY + differenceY * (e.topLeftPoint.y - oldTlpY)
                        bottomRightPointX = brpX - differenceX * (oldBrpX - e.bottomRightPoint.x)
                        bottomRightPointY = brpY - differenceY * (oldBrpY - e.bottomRightPoint.y)
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
                }
            })
            if (width < 5 || height < 5) {
                payload.set('small', true)
            }

            payload.set('elements', elements)
        }
    })

    return payload
}