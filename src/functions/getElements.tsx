import {Slide} from "../entities/Slide"
import {getSelectedPoints} from "./getSelectedPoints"
import {ElementType, ImageElement, Text} from "../entities/Elements"
import React, {Dispatch} from "react"
import {selectElements} from "../slideArea/selectElements"
import {v4 as uuidv4} from 'uuid'
import {svg} from "react-pick-color/build/components/ColorList/ColorList.style"
import {DEFAULT_RECTANGLE} from "../entities/Constants";
import {Point} from "../entities/Point";
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
        let elementPoints = `M 0, 0 H ${viewBoxWidth} V ${viewBoxHeight} H 0 V 0`
        let key = 'slidebar_' + e.id
        if (isIdNeeded) {
            elemId = e.id
            key = e.id
            elemParentId = `svg_${elemId}`
        }

        if (e.backgroundColor) {
            backgroundColor = 'rgb(' + e.backgroundColor.red + ', ' + e.backgroundColor.green + ', ' + e.backgroundColor.blue + ')'
        }

        if (e.type === ElementType.text) {
            viewBoxHeight = Math.round(height * 10 / 16 * 9 * 100) / 100
            viewBox = `0 0, ${viewBoxWidth}, ${viewBoxHeight}`
        } else if (e.type === ElementType.image) {
            const image = e as ImageElement
            viewBox = `0 0, ${image.viewBox.width}, ${image.viewBox.height}`
        }

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
                <path id={elemId} data-is-element={true} d={elementPoints} stroke={borderColor}
                      strokeWidth={e.borderWidth} strokeLinejoin={strokeLinejoin}
                      strokeLinecap={strokeLinecap} fill={backgroundColor}
                      onClick={(evt) => {
                          if (isIdNeeded) {
                              selectElements(evt, e.id, dispatch)
                          }
                      }}/>
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
                    <p contentEditable={true} suppressContentEditableWarning={true} id={elemId}
                       data-is-element={true} data-placeholder={placeholder}
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
            </svg>
        } else if (e.type === ElementType.image) {
            const image = e as ImageElement

            return <svg id={elemParentId} x={e.topLeftPoint.x + '%'} y={e.topLeftPoint.y + '%'} viewBox={viewBox}
                        width={width + '%'} height={height + '%'} preserveAspectRatio="none" key={key}>
                <image id={elemId} data-is-element={true} href={image.link} x="0" y="0"
                       onClick={(evt) => {
                           if (isIdNeeded) {
                               selectElements(evt, e.id, dispatch)
                           }
                       }}/>
            </svg>
        }
        return e
    })
}
export function multipleSelectElements() {
    let editor = store.getState()
    let elem = editor.presentation.slides.map(s => {
        if (editor.selectionSlidesId.includes(s.id)) {
            let workspace = document.getElementsByClassName('workspace')[0]
            if (s.selectionElementsId.length > 0) {
                let bottomRightPoint: Point = {
                    x: -10000,
                    y: -10000
                }
                let topLeftPoint: Point = {
                    x: 10000,
                    y: 10000
                }
                s.elements.filter(e => {
                    if (s.selectionElementsId.includes(e.id)) {
                        if (e.bottomRightPoint.x > bottomRightPoint.x) {
                            bottomRightPoint.x = e.bottomRightPoint.x
                        }

                        if (e.bottomRightPoint.y > bottomRightPoint.y) {
                            bottomRightPoint.y = e.bottomRightPoint.y
                        }

                        if (e.topLeftPoint.x < topLeftPoint.x) {
                            topLeftPoint.x = e.topLeftPoint.x
                        }

                        if (e.topLeftPoint.y < topLeftPoint.y) {
                            topLeftPoint.y = e.topLeftPoint.y
                        }
                    }
                })

                return getMultipleSelection(topLeftPoint, bottomRightPoint)
            }
        }
    })

    return elem
}
export function getMultipleSelection(topLeftPoint: Point, bottomRightPoint: Point) {
    let width = Math.round((bottomRightPoint.x - topLeftPoint.x) * 100) / 100
    let height = Math.round((bottomRightPoint.y - topLeftPoint.y) * 100) / 100
    let viewBoxWidth = Math.round((bottomRightPoint.x - topLeftPoint.x) * 10 * 100) / 100
    let viewBoxHeight
    if (width > height) {
        viewBoxHeight = Math.round(height * 10 * 100) / 100
    } else {
        viewBoxHeight = Math.round(height * 10 / 16 * 9 * 100) / 100
    }

    let viewBox = `0 0, ${viewBoxWidth}, ${viewBoxHeight}`
    let d = `M 0, 0 H ${viewBoxWidth} V ${viewBoxHeight} H 0 V 0`

    let selectedPoints = getSelectedPoints(width, height, viewBoxWidth, viewBoxHeight)
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

    return <svg id='multiple-selection' x={topLeftPoint.x + '%'} y={topLeftPoint.y + '%'}
                viewBox={viewBox} width={width + '%'} height={height + '%'} preserveAspectRatio="none" key={uuidv4()}
                data-tlp-x={topLeftPoint.x} data-tlp-y={topLeftPoint.y} data-brp-x={bottomRightPoint.x} data-brp-y={bottomRightPoint.y}>
        <path d={d} stroke="rgb(26, 115, 232)" strokeWidth="2" strokeLinejoin="miter"
              strokeLinecap="square" fill="none" className="elem-path elem-path_active"/>
        <svg id='multiple-selection-points' className="points_container points_container_active">
            {points.map((point) => {
                return point
            })}
        </svg>
    </svg>
}
