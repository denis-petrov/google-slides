import React from 'react'
import {Box} from '@material-ui/core'
import 'bootstrap/dist/css/bootstrap.min.css'
import Card from 'react-bootstrap/Card'
import {dispatch, getEditor} from '../stateManager/StateManager'
import {chooseSlides} from '../functions/chooseSlides'
import './slideMenu.css'
import {getElements} from '../slideArea/SlideArea'

function handleClick(id: number) {
    const attributeName = 'data-is-checked'
    const slideClass = 'slide'

    let currSlideDomElementId: string = 'slide' + id
    let currSlideElement = document.getElementById(currSlideDomElementId)
    let allSlides = document.getElementsByClassName(slideClass)

    for (let i = 0; i < allSlides.length; i++) {
        allSlides[i].setAttribute(attributeName, 'false')
    }

    if (currSlideElement != null) {
        let previousAttributeValue = currSlideElement.getAttribute(attributeName)
        currSlideElement.setAttribute(attributeName, previousAttributeValue === 'true' ? 'false' : 'true')
    }

    dispatch(chooseSlides, [id])
}

export default function SlideMenu() {
    let editor = getEditor()

    let slides = editor.presentation.slides.map(item => {
        let elements = getElements(item)

        return <div className='slide' data-is-checked={false} key={item.id} id={'slide' + item.id}>
            <span className='item-position'>{ editor.presentation.slides.indexOf(item) + 1 }</span>
            <Card className={'mb-3 slides-menu-item'} onClick={() => handleClick(item.id)}>
                <svg className='slides-menu-item-svg'>
                    { elements }
                </svg>
            </Card>
        </div>
    })

    return (
        <div className='sidebar' >
            { slides }
        </div>
    )
}