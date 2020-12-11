import React, {Dispatch} from 'react'
import './slideArea.css'
import {getSlideBackground} from "../functions/getSlideBackground"
import {getElements} from "../functions/getElements"
import {connect, useDispatch} from "react-redux"
import {Editor} from "../entities/Editor"


const mapStateToProps = (state: Editor) => {
    return {
        state: state
    }
}

function SlideArea(props: any) {
    const dispatch: Dispatch<any> = useDispatch()

    let editor = props.state
    let slideId = ''

    // eslint-disable-next-line array-callback-return
    let elements = editor.presentation.slides.map((s: any) => {
        if (editor.selectionSlidesId.includes(s.id)) {
            slideId = s.id
            return getElements(s, dispatch)
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

export default connect(mapStateToProps)(SlideArea)
