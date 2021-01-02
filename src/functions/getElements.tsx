import {Slide} from "../entities/Slide"
import {getSelectedPoints} from "./getSelectedPoints"
import {ElementType, ImageElement, Text} from "../entities/Elements"
import React, {Dispatch} from "react"
import {selectElements} from "../slideArea/selectElements"
import {v4 as uuidv4} from 'uuid'
import {Point} from "../entities/Point";
import {svg} from "react-pick-color/build/components/ColorList/ColorList.style";
import {store} from "../store/store";


export function getElements(s: Slide, dispatch: Dispatch<any>, isIdNeeded: boolean = true) {
    return s.elements.map(e => {
        let width = Math.round((e.bottomRightPoint.x - e.topLeftPoint.x) * 100) / 100
        let height = Math.round((e.bottomRightPoint.y - e.topLeftPoint.y) * 100) / 100
        let borderColor = `rgb(${e.borderColor.red},${e.borderColor.green},${e.borderColor.blue})`
        let backgroundColor = 'rgb(255, 255, 255)'
        if (e.backgroundColor) {
            backgroundColor = `rgb(${e.backgroundColor.red},${e.backgroundColor.green},${e.backgroundColor.blue}`
        }

        let pathId
        let pointsId
        let elemId: string | undefined
        let elemParentId
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
        let key = 'slidebar_' + e.id
        if (isIdNeeded) {
            elemId = e.id
            key = e.id
            pathId = 'slide_' + s.id + '_element_' + e.id
            pointsId = 'slide_' + s.id + '_points_' + e.id
            elemParentId = `svg_${elemId}`
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
            <path data-value="point" d={selectedPoints[0]} stroke="rgb(255, 255, 255)" strokeWidth="2"
                  strokeLinejoin="miter" key={uuidv4()}
                  strokeLinecap="square" fill="rgb(26, 115, 232)" style={{cursor: 'nwse-resize'}}/>,
            <path data-value="point" d={selectedPoints[1]} stroke="rgb(255, 255, 255)" strokeWidth="2"
                  strokeLinejoin="miter" key={uuidv4()}
                  strokeLinecap="square" fill="rgb(26, 115, 232)" style={{cursor: 'ns-resize'}}/>,
            <path data-value="point" d={selectedPoints[2]} stroke="rgb(255, 255, 255)" strokeWidth="2"
                  strokeLinejoin="miter" key={uuidv4()}
                  strokeLinecap="square" fill="rgb(26, 115, 232)" style={{cursor: 'nesw-resize'}}/>,
            <path data-value="point" d={selectedPoints[3]} stroke="rgb(255, 255, 255)" strokeWidth="2"
                  strokeLinejoin="miter" key={uuidv4()}
                  strokeLinecap="square" fill="rgb(26, 115, 232)" style={{cursor: 'ew-resize'}}/>,
            <path data-value="point" d={selectedPoints[4]} stroke="rgb(255, 255, 255)" strokeWidth="2"
                  strokeLinejoin="miter" key={uuidv4()}
                  strokeLinecap="square" fill="rgb(26, 115, 232)" style={{cursor: 'ew-resize'}}/>,
            <path data-value="point" d={selectedPoints[5]} stroke="rgb(255, 255, 255)" strokeWidth="2"
                  strokeLinejoin="miter" key={uuidv4()}
                  strokeLinecap="square" fill="rgb(26, 115, 232)" style={{cursor: 'nesw-resize'}}/>,
            <path data-value="point" d={selectedPoints[6]} stroke="rgb(255, 255, 255)" strokeWidth="2"
                  strokeLinejoin="miter" key={uuidv4()}
                  strokeLinecap="square" fill="rgb(26, 115, 232)" style={{cursor: 'ns-resize'}}/>,
            <path data-value="point" d={selectedPoints[7]} stroke="rgb(255, 255, 255)" strokeWidth="2"
                  strokeLinejoin="miter" key={uuidv4()}
                  strokeLinecap="square" fill="rgb(26, 115, 232)" style={{cursor: 'nwse-resize'}}/>
        ]

        if (e.type === ElementType.rectangle || e.type === ElementType.ellipse || e.type === ElementType.triangle) {
            let strokeLinecap: "round" | "inherit" | "square" | "butt" | undefined = "square"
            let strokeLinejoin: "round" | "miter" | "bevel" | "inherit" | undefined = "miter"
            if (e.type === ElementType.ellipse) {
                strokeLinecap = "round"
                strokeLinejoin = "round"
                elementPoints = `M 1,${viewBoxHeight / 2} A ${viewBoxWidth / 2 - 1},${viewBoxHeight / 2 - 1} 0 1, 1 1,${viewBoxHeight / 2 + 0.0001}`
            } else if (e.type === ElementType.triangle) {
                strokeLinecap = "round"
                strokeLinejoin = "round"
                elementPoints = `M ${viewBoxWidth / 2}, 0 L ${viewBoxWidth} ${viewBoxHeight - 1} L 0 ${viewBoxHeight - 1} L ${viewBoxWidth / 2} 0`
            }

            return <svg id={elemParentId} x={e.topLeftPoint.x + '%'} y={e.topLeftPoint.y + '%'} viewBox={viewBox}
                        width={width + '%'}
                        height={height + '%'} preserveAspectRatio="none" key={key}>
                <path id={elemId} data-path-id={pathId} data-points-id={pointsId} d={elementPoints} stroke={borderColor}
                      strokeWidth={e.borderWidth} strokeLinejoin={strokeLinejoin}
                      strokeLinecap={strokeLinecap} fill={backgroundColor}
                      onClick={(evt) => {
                          if (isIdNeeded) {
                              selectElements(evt, e.id, dispatch)
                          }
                      }}/>
                <path id={pathId} d={d} stroke="rgb(26, 115, 232)" strokeWidth="2" strokeLinejoin="miter"
                      strokeLinecap="square" fill="none" className="elem-path"/>
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

            return <svg id={elemParentId} x={e.topLeftPoint.x + '%'} y={e.topLeftPoint.y + '%'} viewBox={viewBox}
                        width={width + '%'}
                        height={height + '%'} preserveAspectRatio="none" style={{overflowWrap: "break-word"}}
                        key={key}>
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
                       onClick={(evt) => {
                           if (isIdNeeded && s.selectionElementsId[0] !== e.id) {
                               selectElements(evt, e.id, dispatch)
                           }
                       }}

                       onBlur={(evt) => {
                           if (isIdNeeded) {
                               dispatch({type: 'CHANGE_TEXT_VALUE', payload: {id: e.id, value: evt.target.textContent}})
                           }
                       }}
                    >
                        {(e as Text).text}
                    </p>
                </foreignObject>
                <path id={pathId} d={d} stroke="rgb(26, 115, 232)" strokeWidth="2" strokeLinejoin="miter"
                      strokeLinecap="square" fill="none" className="elem-path"/>
                <svg id={pointsId} className="points_container">
                    {points.map((point) => {
                        return point
                    })}
                </svg>
            </svg>
        } else if (e.type === ElementType.image) {
            const image = e as ImageElement
            let strokeWidth = '1%'
            if (width >= 100 || height >= 100) {
                strokeWidth = '.5%'
            }

            return <svg id={elemParentId} x={e.topLeftPoint.x + '%'} y={e.topLeftPoint.y + '%'} viewBox={viewBox}
                        width={width + '%'} height={height + '%'} preserveAspectRatio="none" key={key}>
                <image id={elemId} data-path-id={pathId} data-points-id={pointsId} href={image.link} x="0" y="0"
                       onClick={(evt) => {
                           if (isIdNeeded) {
                               selectElements(evt, e.id, dispatch)
                           }
                       }}/>
                <path id={pathId} d={d} stroke="rgb(26, 115, 232)" strokeWidth={strokeWidth} strokeLinejoin="miter"
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
