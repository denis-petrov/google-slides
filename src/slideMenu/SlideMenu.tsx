import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Card from 'react-bootstrap/Card'
import {getEditor} from '../stateManager/StateManager'
import './slideMenu.css'
import {SelectSlide} from '../functions/SelectSlide'
import {getElements} from '../slideArea/SlideArea'

export default function SlideMenu() {
    let editor = getEditor();
    let slides = editor.presentation.slides.map(item => {
        let elements = getElements(item)

        return <div className='slide' data-is-checked={editor.selectionSlidesId.includes(item.id)} key={item.id} id={'slide' + item.id}
                        onClick={(evt) => SelectSlide(evt, item.id)}>
                    <span className='item-position'>{editor.presentation.slides.indexOf(item) + 1}</span>
                    <Card className={'mb-3 slides-menu-item'}>
                        <svg className='slides-menu-item-svg'>
                            {elements}
                        </svg>
                    </Card>
                </div>
    })

    return (
        <div className='sidebar'>
            { slides }
        </div>
    )
}