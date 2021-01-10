import React, {Dispatch} from 'react'
import './slideArea.css'
import {getSlideBackground} from "../functions/getSlideBackground"
import {getElements, multipleSelectElements} from "../functions/getElements"
import {connect} from "react-redux"
import {Editor} from "../entities/Editor"
import {v4 as uuidv4} from 'uuid'
import {Slide} from "../entities/Slide"


const mapStateToProps = (state: Editor) => {
    return {
        state: state,
        randomStr: uuidv4(),
        selectionSlidesId: state.selectionSlidesId
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        getElements: (slide: Slide, isIdNeeded: boolean = true) => getElements(slide, dispatch, isIdNeeded),
        getSlideBackground: (editor: Editor) => getSlideBackground(editor)
    }
}

function SlideArea(props: any) {
    let editor = props.state
    let slideId = ''

    let elements: Array<Element> = []
    editor.presentation.slides.forEach((s: Slide) => {
        if (editor.selectionSlidesId[0] === s.id) {
            slideId = s.id
            elements = props.getElements(s)
        }
    })

    return (
        <div id="slide-area" className='slide-area'>
            <svg className={'workspace'} id={'slide_area_' + slideId}
                 style={{background: `0 0 / cover ${props.getSlideBackground(editor)}`}}>
                {elements}
                {multipleSelectElements()}
            </svg>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(SlideArea)