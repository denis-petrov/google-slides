import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Card from 'react-bootstrap/Card'
import {getEditor} from '../stateManager/StateManager'
import './slideMenu.css'
import {SelectSlide} from "../functions/SelectSlide"

export default function SlideMenu() {
    let editor = getEditor();
    let slides = editor.presentation.slides.map(item =>
        <div className='slide' data-is-checked={false} key={item.id} id={'slide' + item.id}>
            <span className='item-position'>{ editor.presentation.slides.indexOf(item) + 1 }</span>
            <Card className={'mb-3 slides-menu-item'} onClick={() => SelectSlide(item.id)}>
            </Card>
        </div>
    )

    return (
        <div className='sidebar' >
            { slides }
        </div>
    )
}