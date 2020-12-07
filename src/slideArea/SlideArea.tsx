import React from 'react'
import './slideArea.css'
import {getEditor} from '../stateManager/StateManager'
import {getSlideBackground} from "../functions/getSlideBackground"
import {getElements} from "../functions/getElements"


export default function SlideArea() {
    let editor = getEditor()
    let slideId = ''

    // eslint-disable-next-line array-callback-return
    let elements = editor.presentation.slides.map(s => {
        if (editor.selectionSlidesId.includes(s.id)) {
            slideId = s.id
            return getElements(s)
        }
    })

    return (
        <div id="slide-area" className='slide-area'>
            <svg className={'workspace'} id={'slide_area_' + slideId}
                 style={{background: `0 0 / cover ${getSlideBackground()}`}}>
                {elements}
            </svg>
        </div>
    )
}