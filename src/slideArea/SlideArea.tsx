import React, {Dispatch} from 'react'
import './slideArea.css'
import {getSlideBackground} from "../functions/getSlideBackground"
import {getElements} from "../functions/getElements"
import {connect} from "react-redux"
import {Editor} from "../entities/Editor"
import {v4 as uuidv4} from 'uuid'
import {Slide} from "../entities/Slide"
import {pathClassName, pointsClassName, removeAllSelectionView} from "../functions/removeSelectOfElements";


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

    /*if (editor.presentation.slides[0].selectionElementsId.length === 0) {
        removeAllSelectionView(pathClassName, pointsClassName)
    }*/

    let elements = editor.presentation.slides.map((s: Slide) => {
        if (editor.selectionSlidesId.includes(s.id)) {
            slideId = s.id
            return props.getElements(s)
        }
    })

    return (
        <div id="slide-area" className='slide-area'>
            <svg className={'workspace'} id={'slide_area_' + slideId}
                 style={{background: `0 0 / cover ${props.getSlideBackground(editor)}`}}>
                {elements}
            </svg>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(SlideArea)
