import React from 'react'
import {Box} from '@material-ui/core'
import 'bootstrap/dist/css/bootstrap.min.css'
import Card from 'react-bootstrap/Card'
import {dispatch, getEditor} from './StateManager'
import {chooseSlides} from './functions/chooseSlides'
import './slideMenu.css'

function handleClick(id: number) {
    const attributeName = 'data-is-checked'
    const slidesMenuItemClass = 'slides-menu-item'

    let currSlidesMenuItemDomElementId: string = 'slides-menu-item-' + id
    let currSlidesMenuItemDomElement = document.getElementById(currSlidesMenuItemDomElementId)
    let allSlidesMenuItems = document.getElementsByClassName(slidesMenuItemClass)

    for (let i = 0; i < allSlidesMenuItems.length; i++) {
        allSlidesMenuItems[i].setAttribute(attributeName, 'false')
    }

    if (currSlidesMenuItemDomElement != null) {
        let previousAttributeValue = currSlidesMenuItemDomElement.getAttribute(attributeName)
        currSlidesMenuItemDomElement.setAttribute(attributeName, previousAttributeValue == 'true' ? 'false' : 'true')
    }

    dispatch(chooseSlides, {
        slides: [id]
    })
}

export default function SlideMenu() {
    let editor = getEditor();
    let slides = editor.presentation.slides.map(item =>
        <Card className={'mb-3 slides-menu-item'}
              key={item.id} id={'slides-menu-item-' + item.id}
              data-is-checked={false}
              onClick={() => handleClick(item.id)}>
            <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                    Some quick example text to build on the card title
                </Card.Text>
            </Card.Body>
        </Card>)
    return (
        <Box className='sidebar' px={'1rem'} overflow={'auto'} >
            { slides }
        </Box>
    )
}