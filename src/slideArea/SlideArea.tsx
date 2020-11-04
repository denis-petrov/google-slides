import React from 'react'
import './slideArea.css'
import {getEditor} from '../stateManager/StateManager'
import {ElementType} from '../entities/Elements'
import {Slide} from "../entities/Slide";

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
                         strokeWidth={e.borderWidth} key={e.id} id={id} />
        } else if (e.type === ElementType.ellipse) {
            let rx = (e.bottomRightPoint.x - e.topLeftPoint.x)/2 + '%'
            let ry = (e.bottomRightPoint.y - e.topLeftPoint.y)/2 + '%'

            return <ellipse rx={rx} ry={ry} cx={e.center.x + '%'} cy={e.center.y + '%'} fill={backgroundColor} stroke={borderColor} strokeWidth={e.borderWidth}
                            key={e.id} id={id} />
        } else if (e.type === ElementType.triangle) {
            const points = '50 0, 100 85, 0 85'

            return <svg width={width} height={height} viewBox='0 0 100 85' preserveAspectRatio="none" key={e.id} id={id}>
                <polygon points={points} fill={backgroundColor} stroke={borderColor}
                         strokeWidth={e.borderWidth} />
            </svg>
        }
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