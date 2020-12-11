import React, {Dispatch} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Card from 'react-bootstrap/Card'
import './slideMenu.css'
import {isMultipleSelectSlide} from '../functions/isMultipleSelectSlide'
import {getElements} from '../functions/getElements'
import {getSlideBackgroundById} from "../functions/getSlideBackgroundById"
import {connect, useDispatch} from "react-redux"
import {Editor} from "../entities/Editor"


const mapStateToProps = (state: Editor) => {
    return {
        state: state
    }
}

function SlideMenu(props: any) {
    let editor = props.state
    const dispatch: Dispatch<any> = useDispatch()

    let slides = editor.presentation.slides.map((item: any) => {
        let elements = getElements(item, dispatch, false)

        return <div>
            <hr key={'slide_hr_before_key_' + item.id} id={'slide_hr_before' + item.id}
                className="slide_hr slide_hr__before"/>
            <div className='slide' data-is-checked={editor.selectionSlidesId.includes(item.id)} key={item.id}
                 id={'slide' + item.id}
                 onClick={(evt) => {
                     if (isMultipleSelectSlide(editor, evt, item.id)) {
                         dispatch({type: 'CHOOSE_SLIDES', payload: editor.selectionSlidesId})
                     } else {
                         dispatch({type: 'CHOOSE_SLIDES', payload: [item.id]})
                     }
                 }}
            >
            <span className='item-position'
                  style={{userSelect: 'none'}}>{editor.presentation.slides.indexOf(item) + 1}</span>
                <Card className={'mb-3 slides-menu-item'}>
                    <svg className='slides-menu-item-svg' id={item.id}
                         style={{background: `0 0 / cover ${getSlideBackgroundById(editor, item.id)}`}}>
                        {elements}
                    </svg>
                </Card>
            </div>
            <hr key={'slide_hr_after_key_' + item.id} id={'slide_hr_after' + item.id}
                className="slide_hr slide_hr__after"/>
        </div>
    })

    return (
        <div className='sidebar'>
            {slides}
        </div>
    )
}

export default connect(mapStateToProps)(SlideMenu)