import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Card from 'react-bootstrap/Card'
import {getEditor} from '../stateManager/StateManager'
import './slideMenu.css'
import {SelectSlide} from '../functions/SelectSlide'
import {getElements} from '../functions/getElements'
import {getSlideBackgroundById} from "../functions/getSlideBackgroundById"

export default function SlideMenu() {
    let editor = getEditor()
    let slides = editor.presentation.slides.map(item => {
        let elements = getElements(item, false)

        return <div>
            <hr key={'slide_hr_before_key_' + item.id} id={'slide_hr_before' + item.id}
                className="slide_hr slide_hr__before" />
            <div className='slide' data-is-checked={editor.selectionSlidesId.includes(item.id)} key={item.id}
                 id={'slide' + item.id}
                 onClick={(evt) => SelectSlide(evt, item.id)}>
            <span className='item-position'
                  style={{userSelect: 'none'}}>{editor.presentation.slides.indexOf(item) + 1}</span>
                <Card className={'mb-3 slides-menu-item'}>
                    <svg className='slides-menu-item-svg' id={item.id}
                         style={{background: `0 0 / cover ${getSlideBackgroundById(item.id)}`}}>
                        {elements}
                    </svg>
                </Card>
            </div>
            <hr key={'slide_hr_after_key_' + item.id} id={'slide_hr_after' + item.id}
                className="slide_hr slide_hr__after" />
        </div>
    })

    return (
        <div className='sidebar'>
            {slides}
        </div>
    )
}