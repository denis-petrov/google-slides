import {Slide} from "../entities/Slide"
import {getSelectedPoints} from "./getSelectedPoints"
import {ElementType, ImageElement, Text} from "../entities/Elements"
import React from "react"
import {selectElements} from "../slideArea/SlideArea"
import {changeTextValue} from "./changeTextElement"
import {dispatch} from "../stateManager/StateManager"

export function getElements(s: Slide, isIdNeeded: boolean = true) {
    return s.elements.map(e => {
        let width = Math.round((e.bottomRightPoint.x - e.topLeftPoint.x) * 100) / 100
        let height = Math.round((e.bottomRightPoint.y - e.topLeftPoint.y) * 100) / 100
        let borderColor = `rgb(${e.borderColor.red},${e.borderColor.green},${e.borderColor.blue}`
        let backgroundColor = 'rgb(255, 255, 255)'
        if (e.backgroundColor) {
            backgroundColor = `rgb(${e.backgroundColor.red},${e.backgroundColor.green},${e.backgroundColor.blue}`
        }

        let pathId
        let pointsId
        let elemId
        let viewBoxWidth = Math.round((e.bottomRightPoint.x - e.topLeftPoint.x) * 10 * 100) / 100
        let viewBoxHeight

        if (width > height) {
            viewBoxHeight = Math.round(height * 10 * 100) / 100
        } else {
            viewBoxHeight = Math.round(height * 10 / 16 * 9 * 100) / 100
        }

        let viewBox = `0 0, ${viewBoxWidth}, ${viewBoxHeight}`
        let d = `M 0, 0 H ${viewBoxWidth} V ${viewBoxHeight} H 0 V 0`
        let elementPoints = d
        if (isIdNeeded) {
            elemId = e.id
            pathId = 'slide_' + s.id + '_element_' + e.id
            pointsId = 'slide_' + s.id + '_points_' + e.id
        }

        if (e.backgroundColor) {
            backgroundColor = 'rgb(' + e.backgroundColor.red + ', ' + e.backgroundColor.green + ', ' + e.backgroundColor.blue + ')'
        }

        let selectedPoints = getSelectedPoints(width, height, viewBoxWidth, viewBoxHeight)

        if (e.type === ElementType.text) {
            viewBoxHeight = Math.round(height * 10 / 16 * 9 * 100) / 100
            viewBox = `0 0, ${viewBoxWidth}, ${viewBoxHeight}`
            d = `M 0, 0 H ${viewBoxWidth} V ${viewBoxHeight} H 0 V 0`
            selectedPoints = getSelectedPoints(width, height, viewBoxWidth, viewBoxHeight)
        } else if (e.type === ElementType.image) {
            const image = e as ImageElement
            d = `M 0, 0 H ${image.viewBox.width} V ${image.viewBox.height} H 0 V 0`
            viewBox = `0 0, ${image.viewBox.width}, ${image.viewBox.height}`
            selectedPoints = getSelectedPoints(width, height, image.viewBox.width, image.viewBox.height, true)
        }

        let points = [
            <path data-value="point" d={selectedPoints.d1} stroke="blue" strokeWidth="1" strokeLinejoin="miter"
                  strokeLinecap="square" fill="blue" style={{cursor: 'nwse-resize'}}/>,
            <path data-value="point" d={selectedPoints.d2} stroke="blue" strokeWidth="1" strokeLinejoin="miter"
                  strokeLinecap="square" fill="blue" style={{cursor: 'ns-resize'}}/>,
            <path data-value="point" d={selectedPoints.d3} stroke="blue" strokeWidth="1" strokeLinejoin="miter"
                  strokeLinecap="square" fill="blue" style={{cursor: 'nesw-resize'}}/>,
            <path data-value="point" d={selectedPoints.d4} stroke="blue" strokeWidth="1" strokeLinejoin="miter"
                  strokeLinecap="square" fill="blue" style={{cursor: 'ew-resize'}}/>,
            <path data-value="point" d={selectedPoints.d5} stroke="blue" strokeWidth="1" strokeLinejoin="miter"
                  strokeLinecap="square" fill="blue" style={{cursor: 'ew-resize'}}/>,
            <path data-value="point" d={selectedPoints.d6} stroke="blue" strokeWidth="1" strokeLinejoin="miter"
                  strokeLinecap="square" fill="blue" style={{cursor: 'nesw-resize'}}/>,
            <path data-value="point" d={selectedPoints.d7} stroke="blue" strokeWidth="1" strokeLinejoin="miter"
                  strokeLinecap="square" fill="blue" style={{cursor: 'ns-resize'}}/>,
            <path data-value="point" d={selectedPoints.d8} stroke="blue" strokeWidth="1" strokeLinejoin="miter"
                  strokeLinecap="square" fill="blue" style={{cursor: 'nwse-resize'}}/>
        ]

        if (e.type === ElementType.rectangle || e.type === ElementType.ellipse || e.type === ElementType.triangle) {
            if (e.type === ElementType.ellipse) {
                elementPoints = `M 1,${viewBoxHeight / 2} A ${viewBoxWidth / 2 - 1},${viewBoxHeight / 2 - 1} 0 1, 1 1,${viewBoxHeight / 2 + 0.0001}`
            } else if (e.type === ElementType.triangle) {
                elementPoints = `M ${viewBoxWidth / 2} 0, L ${viewBoxWidth} ${viewBoxHeight - 1}, L 0 ${viewBoxHeight - 1}, L ${viewBoxWidth / 2} 0`
            }


            return <svg x={e.topLeftPoint.x + '%'} y={e.topLeftPoint.y + '%'} viewBox={viewBox} width={width + '%'}
                        height={height + '%'} preserveAspectRatio="none" key={e.id}>
                <path id={elemId} data-path-id={pathId} data-points-id={pointsId} d={elementPoints} stroke={borderColor}
                      strokeWidth={e.borderWidth} strokeLinejoin="miter"
                      strokeLinecap="square" fill={backgroundColor}
                      onClick={(evt) => {
                          if (isIdNeeded) {
                              selectElements(evt, e.id)
                          }
                      }}/>
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
            const underline = `${textStyle.isUnderline ? 'underline' : 'none'}`
            const textColor = `rgb(${textStyle.color.red},${textStyle.color.green},${textStyle.color.blue})`
            const borderWidth = e.borderWidth
            const cursor = isIdNeeded ? 'auto' : 'default'
            const placeholder = isIdNeeded ? 'Insert text here' : ''

            return <svg x={e.topLeftPoint.x + '%'} y={e.topLeftPoint.y + '%'} viewBox={viewBox} width={width + '%'}
                        height={height + '%'} preserveAspectRatio="none" style={{overflowWrap: "break-word"}}
                        key={e.id}>
                <foreignObject width={'100%'} height={'100%'} overflow={'visible'}>
                    <p contentEditable={true} suppressContentEditableWarning={true} id={elemId} data-path-id={pathId}
                       data-points-id={pointsId} data-placeholder={placeholder}
                       style={{
                           font: font,
                           textDecoration: underline,
                           stroke: borderColor,
                           borderWidth: borderWidth,
                           overflowWrap: "break-word",
                           color: `${textColor}`,
                           outline: 'none',
                           cursor: cursor
                       }}
                       onFocus={(evt) => {
                           if (isIdNeeded) {
                               selectElements(evt, e.id)
                           }
                       }}
                       onClick={(evt) => {
                           if (isIdNeeded) {
                               selectElements(evt, e.id)
                           }
                       }}
                       onBlur={(evt) => {
                           if (isIdNeeded) {
                               dispatch(changeTextValue, {id: e.id, value: evt.target.textContent})
                           }
                       }}
                    >
                        {(e as Text).text}
                    </p>
                </foreignObject>
                <path id={pathId} d={d} stroke="blue" strokeWidth="1" strokeLinejoin="miter"
                      strokeLinecap="square" strokeDasharray="5, 5" fill="none" className="elem-path"/>
                <svg id={pointsId} className="points_container">
                    {points.map((point) => {
                        return point
                    })}
                </svg>
            </svg>
        } else if (e.type === ElementType.image) {
            let strokeWidth = '.5%'
            const image = e as ImageElement

            return <svg x={e.topLeftPoint.x + '%'} y={e.topLeftPoint.y + '%'} viewBox={viewBox}
                        width={width + '%'} height={height + '%'} preserveAspectRatio="none" key={e.id}>
                <image id={elemId} data-path-id={pathId} data-points-id={pointsId} href={image.link} x="0" y="0"
                       onClick={(evt) => {
                           if (isIdNeeded) {
                               selectElements(evt, e.id)
                           }
                       }}/>
                <path id={pathId} d={d} stroke="blue" strokeWidth={strokeWidth} strokeLinejoin="miter"
                      strokeLinecap="square" strokeDasharray="5%, 5%" fill="none" className="elem-path"/>
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