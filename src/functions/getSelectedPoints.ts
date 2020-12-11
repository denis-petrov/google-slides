export function getSelectedPoints(width: number, height: number, viewBoxWidth: number, viewBoxHeight: number, isImage: boolean = false) {
    const pointHeight = Math.floor(width / 9 * 16 / height * viewBoxHeight / width * 100) / 100
    let pointWidth = 10
    if (isImage) {
        pointWidth = Math.round(height / width * viewBoxWidth / height * 100) / 100
    }

    const middlePointX = viewBoxWidth / 2 - pointWidth / 2
    const middlePointY = viewBoxHeight / 2 - pointHeight / 2
    const lastPointX = viewBoxWidth - pointWidth
    const lastPointY = viewBoxHeight - pointHeight
    const d1 = `M 0, 0 H ${pointWidth} V ${pointHeight} H 0 V 0`
    const d2 = `M ${middlePointX}, 0 H ${middlePointX + pointWidth} V ${pointHeight} H ${middlePointX} V 0`
    const d3 = `M ${lastPointX}, 0 H ${viewBoxWidth} V ${pointHeight} H ${lastPointX} V 0`
    const d4 = `M 0, ${middlePointY} H ${pointWidth} V ${middlePointY + pointHeight} H 0 V ${middlePointY}`
    const d5 = `M ${lastPointX}, ${middlePointY} H ${viewBoxWidth} V ${middlePointY + pointHeight} H ${lastPointX} V ${middlePointY}`
    const d6 = `M 0, ${lastPointY} H ${pointWidth} V ${viewBoxHeight} H 0 V ${lastPointY}`
    const d7 = `M ${middlePointX}, ${lastPointY} H ${middlePointX + pointWidth} V ${viewBoxHeight} H ${middlePointX} V ${lastPointY}`
    const d8 = `M ${lastPointX}, ${lastPointY} H ${viewBoxWidth} V ${viewBoxHeight} H ${lastPointX} V ${lastPointY}`
    return {
        "d1": d1,
        "d2": d2,
        "d3": d3,
        "d4": d4,
        "d5": d5,
        "d6": d6,
        "d7": d7,
        "d8": d8
    }
}