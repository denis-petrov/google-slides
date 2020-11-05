import React from 'react'
import './slideArea.css'
import {dispatch, getEditor} from '../stateManager/StateManager'
import {ElementType} from '../entities/Elements'
import {Slide} from "../entities/Slide"
import {chooseElements} from "../functions/chooseElements"

export function selectElements(event: any, id: number) {
    let clickedElem = event.currentTarget
    let elemPathId = clickedElem.getAttribute('data-path-id')
    let elemPath = document.getElementById(elemPathId)
    let elemClassName = 'element_choosed'
    let pathClassName = 'elem-path_active'
    if (event.shiftKey) {
        let clickedElemTagName = clickedElem.tagName
        if (clickedElemTagName === 'rect' || clickedElemTagName === 'ellipse' || clickedElemTagName === 'polygon') {
            if (clickedElem.classList.contains(elemClassName)) {
                if (elemPath) {
                    elemPath.classList.remove(pathClassName)
                }

                clickedElem.classList.remove(elemClassName)
            } else {
                if (elemPath) {
                    elemPath.classList.add(pathClassName)
                }
                clickedElem.classList.add(elemClassName)
            }

            let selectedElems = new Array<number>()
            let allSelectedElems = document.getElementsByClassName(elemClassName)
            for (let i = 0; i < allSelectedElems.length; i++) {
                if (allSelectedElems[i].classList.contains(elemClassName)) {
                    selectedElems.push(Number(allSelectedElems[i].getAttribute('data-elem-id')))
                }
            }

            dispatch(chooseElements, selectedElems, false)
        }
    } else {
        dispatch(chooseElements, [id], false)
        let allSelectedElems = document.getElementsByClassName(elemClassName)
        while(allSelectedElems[0]) {
            if (allSelectedElems[0].classList.contains(elemClassName)) {
                allSelectedElems[0].classList.remove(elemClassName)
            }
        }

        clickedElem.classList.toggle(elemClassName)
        if (elemPath) {
            elemPath.classList.add(pathClassName)

        }
    }
}

export function getElements(s: Slide, isIdNeeded: boolean = true) {
    return s.elements.map(e => {
        let width = e.bottomRightPoint.x - e.topLeftPoint.x + '%'
        let height = e.bottomRightPoint.y - e.topLeftPoint.y + '%'
        let borderColor = 'rgb(' + e.borderColor.red + ', ' + e.borderColor.green + ', ' + e.borderColor.blue +')'
        let backgroundColor = 'rgb(255, 255, 255)'
        const d = "M 0, 0 H 100 V 100 H 0 V 0"
        let pathId = ''
        if (isIdNeeded) {
            pathId = 'slide_' + s.id + '_element_' + e.id
        }

        if (e.backgroundColor) {
            backgroundColor = 'rgb(' + e.backgroundColor.red + ', ' + e.backgroundColor.green + ', ' + e.backgroundColor.blue +')'
        }

        if (e.type === ElementType.rectangle) {

            return <svg x={e.topLeftPoint.x + '%'} y={e.topLeftPoint.y + '%'} width={width} height={height} viewBox="0 0, 100 100" preserveAspectRatio="none" key={e.id}>
                <rect x="0" y="0" width="100%" height="100%" fill={backgroundColor} stroke={borderColor}
                      data-path-id={pathId} strokeWidth={e.borderWidth} data-elem-id={e.id} onClick={(evt) => selectElements(evt, e.id)} />
                <path id={pathId} d={d} stroke="blue" strokeWidth="1"  strokeLinejoin="miter"
                      strokeLinecap="square" strokeDasharray="5, 5" fill="none" className="elem-path" />
            </svg>
        } else if (e.type === ElementType.ellipse) {
            return <svg x={e.topLeftPoint.x + '%'} y={e.topLeftPoint.y + '%'} width={width} height={height} viewBox="0 0, 100 100" preserveAspectRatio="none" key={e.id}>
                <ellipse rx="50%" ry="50%" cx="50%" cy="50%" fill={backgroundColor} stroke={borderColor} strokeWidth={e.borderWidth}
                         data-path-id={pathId} data-elem-id={e.id} onClick={(evt) => selectElements(evt, e.id)} />
                <path id={pathId} d={d} stroke="blue" strokeWidth="1"  strokeLinejoin="miter"
                      strokeLinecap="square" strokeDasharray="5, 5" fill="none" className="elem-path" />
            </svg>
        } else if (e.type === ElementType.triangle) {
            const points = '50 0, 100 84, 0 84'

            return <svg x={e.topLeftPoint.x + '%'} y={e.topLeftPoint.y + '%'} width={width} height={height} viewBox="0 0, 100 85" preserveAspectRatio="none" key={e.id}>
                <polygon points={points} fill={backgroundColor} stroke={borderColor} data-path-id={pathId}
                         data-elem-id={e.id} strokeWidth={e.borderWidth} onClick={(evt) => selectElements(evt, e.id)} />
                <path id={pathId} d={d} stroke="blue" strokeWidth="1" strokeLinejoin="miter"
                      strokeLinecap="square" strokeDasharray="5, 5" fill="none" className="elem-path" />
            </svg>
        }
        return e
    })
}

export default function SlideArea() {
    let editor = getEditor()
    // eslint-disable-next-line array-callback-return
    let elements = editor.presentation.slides.map(s => {
        if (editor.selectionSlidesId.includes(s.id)) {
            return getElements(s)
        }
    })

    return (
        <div id="slide-area" className='slide-area'>
            {/* style={{backgroundColor: "blue"}} for <svg> */}
            <svg className={'workspace'}>
                { elements }
            </svg>
        </div>
    )
}