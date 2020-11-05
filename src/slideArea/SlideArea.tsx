import React from 'react'
import './slideArea.css'
import {dispatch, getEditor} from '../stateManager/StateManager'
import {ElementType} from '../entities/Elements'
import {Slide} from "../entities/Slide"
import {chooseElements} from "../functions/chooseElements"

export function selectElements(event: any, id: string) {
    let clickedElem = event.currentTarget
    let className = 'element_choosed'
    if (event.shiftKey) {
        let clickedElemTagName = clickedElem.tagName
        if (clickedElemTagName === 'rect' || clickedElemTagName === 'ellipse' || clickedElemTagName === 'polygon') {
            if (clickedElem.classList.contains(className)) {
                clickedElem.classList.remove(className)
            } else {
                clickedElem.classList.add(className)
            }

            let selectedElems = new Array<number>()
            let allSelectedElems = document.getElementsByClassName(className)
            for (let i = 0; i < allSelectedElems.length; i++) {
                if (allSelectedElems[i].classList.contains(className)) {
                    selectedElems.push(Number(allSelectedElems[i].getAttribute('data-elem-id')))
                }
            }
            dispatch(chooseElements, selectedElems, false)
        }
    } else {
        dispatch(chooseElements, [id], false)
        let allSelectedElems = document.getElementsByClassName(className)
        while(allSelectedElems[0]) {
            if (allSelectedElems[0].classList.contains(className)) {
                allSelectedElems[0].classList.remove(className)
            }
        }
        clickedElem.classList.toggle(className)
    }
}

export function getElements(s: Slide) {
    return s.elements.map(e => {
        let width = e.bottomRightPoint.x - e.topLeftPoint.x + '%'
        let height = e.bottomRightPoint.y - e.topLeftPoint.y + '%'
        let borderColor = 'rgb(' + e.borderColor.red + ', ' + e.borderColor.green + ', ' + e.borderColor.blue +')'
        let backgroundColor = 'rgb(255, 255, 255)'
        let id = 'slide_' + s.id + '_element_' + e.id
        if (e.backgroundColor) {
            backgroundColor = 'rgb(' + e.backgroundColor.red + ', ' + e.backgroundColor.green + ', ' + e.backgroundColor.blue +')'
        }

        if (e.type === ElementType.rectangle) {

            return <rect x={e.topLeftPoint.x} y={e.topLeftPoint.y} width={width} height={height} fill={backgroundColor} stroke={borderColor}
                         strokeWidth={e.borderWidth} data-elem-id={e.id} key={e.id} id={id}
                         onClick={(evt) => selectElements(evt, e.id)} />
        } else if (e.type === ElementType.ellipse) {
            let rx = (e.bottomRightPoint.x - e.topLeftPoint.x)/2 + '%'
            let ry = (e.bottomRightPoint.y - e.topLeftPoint.y)/2 + '%'

            return <ellipse rx={rx} ry={ry} cx={e.center.x + '%'} cy={e.center.y + '%'} fill={backgroundColor} stroke={borderColor} strokeWidth={e.borderWidth}
                            data-elem-id={e.id} key={e.id} id={id}
                            onClick={(evt) => selectElements(evt, e.id)} />
        } else if (e.type === ElementType.triangle) {
            const points = '50 0, 100 84, 0 84'

            return <svg width={width} height={height} viewBox='0 0 100 85' preserveAspectRatio="none" key={e.id} id={id}>
                <polygon points={points} fill={backgroundColor} stroke={borderColor}
                         data-elem-id={e.id} strokeWidth={e.borderWidth}
                         onClick={(evt) => selectElements(evt, e.id)} />
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
            <svg className={'workspace'}>
                { elements }
            </svg>
        </div>
    )
}