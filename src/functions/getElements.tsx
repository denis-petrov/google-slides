import {Slide} from "../entities/Slide"
import {getSelectedPoints} from "./getSelectedPoints"
import {ElementType, ImageElement, Text} from "../entities/Elements"
import React from "react"
import {selectElements} from "../slideArea/SlideArea"

export function getElements(s: Slide, isIdNeeded: boolean = true) {
    return s.elements.map(e => {
        let width = Math.round((e.bottomRightPoint.x as number - e.topLeftPoint.x as number) * 100) / 100
        let height = Math.round((e.bottomRightPoint.y - e.topLeftPoint.y) * 100) / 100
        let borderColor = `rgb(${e.borderColor.red},${e.borderColor.green},${e.borderColor.blue}`
        let backgroundColor = 'rgb(255, 255, 255)'
        if (e.backgroundColor) {
            backgroundColor = `rgb(${e.backgroundColor.red},${e.backgroundColor.green},${e.backgroundColor.blue}`
        }

        let pathId
        let pointsId
        let elemId
        let viewBoxWidth = (e.bottomRightPoint.x - e.topLeftPoint.x) * 10
        let viewBoxHeight = Math.floor(Math.abs(((e.bottomRightPoint.y - e.topLeftPoint.y) -
            Math.floor((e.bottomRightPoint.x - e.topLeftPoint.x) / 9 * 16 * 100) / 100) * 10) * 100) / 100
        if (viewBoxHeight === 0) {
            viewBoxHeight = viewBoxWidth
        } else if ((e.bottomRightPoint.x - e.topLeftPoint.x) / 9 * 16 < (e.bottomRightPoint.y - e.topLeftPoint.y)) {
            viewBoxHeight += viewBoxWidth
        }

        let viewBox = `0 0, ${viewBoxWidth}, ${viewBoxHeight}`
        let d = `M 0, 0 H ${viewBoxWidth} V ${viewBoxHeight} H 0 V 0`
        if (isIdNeeded) {
            elemId = e.id
            pathId = 'slide_' + s.id + '_element_' + e.id
            pointsId = 'slide_' + s.id + '_points_' + e.id
        }

        if (e.backgroundColor) {
            backgroundColor = 'rgb(' + e.backgroundColor.red + ', ' + e.backgroundColor.green + ', ' + e.backgroundColor.blue + ')'
        }

        let selectedPoints = getSelectedPoints(width, height, viewBoxWidth, viewBoxHeight)
        let points = [
            <path d={selectedPoints.d1} stroke="blue" strokeWidth="1" strokeLinejoin="miter"
                  strokeLinecap="square" fill="blue"/>,
            <path d={selectedPoints.d2} stroke="blue" strokeWidth="1" strokeLinejoin="miter"
                  strokeLinecap="square" fill="blue"/>,
            <path d={selectedPoints.d3} stroke="blue" strokeWidth="1" strokeLinejoin="miter"
                  strokeLinecap="square" fill="blue"/>,
            <path d={selectedPoints.d4} stroke="blue" strokeWidth="1" strokeLinejoin="miter"
                  strokeLinecap="square" fill="blue"/>,
            <path d={selectedPoints.d5} stroke="blue" strokeWidth="1" strokeLinejoin="miter"
                  strokeLinecap="square" fill="blue"/>,
            <path d={selectedPoints.d6} stroke="blue" strokeWidth="1" strokeLinejoin="miter"
                  strokeLinecap="square" fill="blue"/>,
            <path d={selectedPoints.d7} stroke="blue" strokeWidth="1" strokeLinejoin="miter"
                  strokeLinecap="square" fill="blue"/>,
            <path d={selectedPoints.d8} stroke="blue" strokeWidth="1" strokeLinejoin="miter"
                  strokeLinecap="square" fill="blue"/>
        ]

        if (e.type === ElementType.rectangle) {

            return <svg x={e.topLeftPoint.x + '%'} y={e.topLeftPoint.y + '%'} viewBox={viewBox} width={width + '%'}
                        height={height + '%'} preserveAspectRatio="none" key={e.id}>
                <path id={elemId} data-path-id={pathId} data-points-id={pointsId} d={d} stroke={borderColor}
                      strokeWidth={e.borderWidth} strokeLinejoin="miter"
                      strokeLinecap="square" fill={backgroundColor}
                      onClick={(evt) => selectElements(evt, e.id)}/>
                <path id={pathId} d={d} stroke="blue" strokeWidth="1" strokeLinejoin="miter"
                      strokeLinecap="square" strokeDasharray="5, 5" fill="none" className="elem-path"/>
                <svg id={pointsId} className="points_container">
                    {points.map((point) => {
                        return point
                    })}
                </svg>
            </svg>
        } else if (e.type === ElementType.ellipse) {
            const ellipsePoints = `M 1,${viewBoxHeight / 2} A ${viewBoxWidth / 2 - 1},${viewBoxHeight / 2 - 1} 0 1, 1 1,${viewBoxHeight / 2 + 0.1}`

            return <svg x={e.topLeftPoint.x + '%'} y={e.topLeftPoint.y + '%'} viewBox={viewBox} width={width + '%'}
                        height={height + '%'} preserveAspectRatio="none" key={e.id}>
                <path id={elemId} data-path-id={pathId} data-points-id={pointsId} d={ellipsePoints} stroke={borderColor}
                      strokeWidth={e.borderWidth} strokeLinejoin="miter"
                      strokeLinecap="square" fill={backgroundColor}
                      onClick={(evt) => selectElements(evt, e.id)}/>
                <path id={pathId} d={d} stroke="blue" strokeWidth="1" strokeLinejoin="miter"
                      strokeLinecap="square" strokeDasharray="5, 5" fill="none" className="elem-path"/>
                <svg id={pointsId} className="points_container">
                    {points.map((point) => {
                        return point
                    })}
                </svg>
            </svg>
        } else if (e.type === ElementType.triangle) {
            const trianglePoints = `M ${viewBoxWidth / 2} 0, L ${viewBoxWidth} ${viewBoxHeight - 1}, L 0 ${viewBoxHeight - 1}, L ${viewBoxWidth / 2} 0`

            return <svg x={e.topLeftPoint.x + '%'} y={e.topLeftPoint.y + '%'} viewBox={viewBox} width={width + '%'}
                        height={height + '%'} preserveAspectRatio="none" key={e.id}>
                <path id={elemId} data-path-id={pathId} data-points-id={pointsId} d={trianglePoints}
                      stroke={borderColor} strokeWidth={e.borderWidth} strokeLinejoin="miter"
                      strokeLinecap="square" fill={backgroundColor}
                      onClick={(evt) => selectElements(evt, e.id)}/>
                <path id={pathId} d={d} stroke="blue" strokeWidth="1" strokeLinejoin="miter"
                      strokeLinecap="square" strokeDasharray="5, 5" fill="none" className="elem-path"/>
                <svg id={pointsId} className="points_container">
                    {points.map((point) => {
                        return point
                    })}
                </svg>
            </svg>
        } else if (e.type === ElementType.text) {
            const textStyle = (e as Text).textStyle
            const font = `${textStyle.isBold ? 'bold' : ''} ${textStyle.isCurve ? 'italic' : ''} ${textStyle.sizeFont}px ${textStyle.font}`
            const textColor = `rgb(${textStyle.color.red},${textStyle.color.green},${textStyle.color.blue})`

            //проверить нужен ли viewBox для svg с текстом
            return <svg x={e.topLeftPoint.x + '%'} y={e.topLeftPoint.y + '%'} width={width + '%'} height={height + '%'}
                        preserveAspectRatio="none" key={e.id}>
                <text x="0" y="20" id={elemId} data-path-id={pathId} data-points-id={pointsId} fill={textColor}
                      style={{font: font}} onClick={(evt) => selectElements(evt, e.id)}>{(e as Text).text}</text>
                <path id={pathId} d={d} stroke="blue" strokeWidth="1" strokeLinejoin="miter"
                      strokeLinecap="square" strokeDasharray="5, 5" fill="none" className="elem-path"/>
            </svg>
        } else if (e.type === ElementType.image) {
            let strokeWidth = '.5%'
            const image = (e as ImageElement).link
            let prevWidth = width
            let prevHeight = height
            if (width > height) {
                if (width >= 100) {
                    viewBoxWidth = width
                    d = `M 0, 0 H ${viewBoxWidth} V ${height} H 0 V 0`
                    viewBoxHeight = Math.floor(width / 16 * 9 * 100) / 100
                    width = 100
                    height = 100
                } else {
                    strokeWidth = '1%'
                    width = Math.floor(width * 10 / 16 * 9 / 10 * 100) / 100
                    viewBoxHeight = Math.floor(height * 10)
                    d = `M 0, 0 H ${viewBoxWidth} V ${viewBoxHeight} H 0 V 0`
                }
            } else {
                if (height >= 100) {
                    viewBoxWidth = Math.floor(height / 9 * 16 * 100) / 100
                    viewBoxHeight = height
                    d = `M 0, 0 H ${width} V ${viewBoxHeight} H 0 V 0`
                    width = 100
                    height = 100
                } else {
                    strokeWidth = '1%'
                    viewBoxHeight = Math.floor(height * 10 / 16 * 9 * 100) / 100
                    d = `M 0, 0 H ${viewBoxWidth} V ${viewBoxHeight} H 0 V 0`
                }
            }

            viewBox = `0 0, ${viewBoxWidth}, ${viewBoxHeight}`
            if (width >= 100 || height >= 100) {
                selectedPoints = getSelectedPoints(width, height, prevWidth, prevHeight)
            } else {
                selectedPoints = getSelectedPoints(width, height, viewBoxWidth, viewBoxHeight)
            }

            points = [
                <path d={selectedPoints.d1} stroke="blue" strokeWidth="1" strokeLinejoin="miter"
                      strokeLinecap="square" fill="blue"/>,
                <path d={selectedPoints.d2} stroke="blue" strokeWidth="1" strokeLinejoin="miter"
                      strokeLinecap="square" fill="blue"/>,
                <path d={selectedPoints.d3} stroke="blue" strokeWidth="1" strokeLinejoin="miter"
                      strokeLinecap="square" fill="blue"/>,
                <path d={selectedPoints.d4} stroke="blue" strokeWidth="1" strokeLinejoin="miter"
                      strokeLinecap="square" fill="blue"/>,
                <path d={selectedPoints.d5} stroke="blue" strokeWidth="1" strokeLinejoin="miter"
                      strokeLinecap="square" fill="blue"/>,
                <path d={selectedPoints.d6} stroke="blue" strokeWidth="1" strokeLinejoin="miter"
                      strokeLinecap="square" fill="blue"/>,
                <path d={selectedPoints.d7} stroke="blue" strokeWidth="1" strokeLinejoin="miter"
                      strokeLinecap="square" fill="blue"/>,
                <path d={selectedPoints.d8} stroke="blue" strokeWidth="1" strokeLinejoin="miter"
                      strokeLinecap="square" fill="blue"/>
            ]

            return <svg x={e.topLeftPoint.x + '%'} y={e.topLeftPoint.y + '%'} viewBox={viewBox}
                        width={width + '%'} height={height + '%'} preserveAspectRatio="none" key={e.id}>
                <image id={elemId} data-path-id={pathId} data-points-id={pointsId} href={image} x="0" y="0"
                       onClick={(evt) => selectElements(evt, e.id)}/>
                <path id={pathId} d={d} stroke="blue" strokeWidth={strokeWidth} strokeLinejoin="miter"
                      strokeLinecap="square" fill="none" className="elem-path"/>
                <svg id={pointsId} className="points_container">
                    {points.map((point) => {
                        return point
                    })}
                </svg>
            </svg>
        }
        return e
    })
}