import React, {Dispatch} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Card from 'react-bootstrap/Card'
import './slideMenu.css'
import {isMultipleSelectSlide} from '../functions/isMultipleSelectSlide'
import {getElements} from '../functions/getElements'
import {getSlideBackgroundById} from "../functions/getSlideBackgroundById"
import {connect} from "react-redux"
import {Editor} from "../entities/Editor"
import {Slide} from "../entities/Slide"


const mapStateToProps = (state: Editor) => {
    return {
        state: state
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        getElements: (slide: Slide, isIdNeeded: boolean = true) => getElements(slide, dispatch, isIdNeeded),
        chooseSlides: (id: string | Array<string>) => dispatch({type: 'CHOOSE_SLIDES', payload: id})
    }
}

function SlideMenu(props: any) {
    let editor = props.state

    let slides = editor.presentation.slides.map((item: any) => {
        let elements = props.getElements(item, false)

        return <div key={item.id}>
            <hr id={'slide_hr_before' + item.id}
                className="slide_hr slide_hr__before"/>
            <div className='slide' data-is-checked={editor.selectionSlidesId.includes(item.id)}
                 id={'slide' + item.id}
                 onClick={(evt) => {
                     if (isMultipleSelectSlide(editor, evt, item.id)) {
                         props.chooseSlides(editor.selectionSlidesId)
                     } else {
                         props.chooseSlides([item.id])
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
            <hr id={'slide_hr_after' + item.id}
                className="slide_hr slide_hr__after"/>
        </div>
    })

    return (
        <div className='sidebar'>
            {slides}
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(SlideMenu)