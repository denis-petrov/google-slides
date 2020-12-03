import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import {dispatch, getEditor, reDo, unDo} from './stateManager/StateManager'
import {deleteElements} from "./functions/deleteElements"
import {removeSelectOfElement} from "./functions/removeSelectOfElements"
import {moveElements} from "./slideArea/SlideArea"
import {mouseMoveElements} from "./functions/mouseMoveElements"
import {endMoveElements} from "./functions/endMoveElements"
import {moveElementPoint, resizeElement} from "./functions/resizeElement"
import {changePositionOfElements} from "./functions/changePositionOfElements"
import {endResizeElement} from "./functions/endResizeElement"
import {changeTextCursor} from "./functions/changeTextCursor";
import {
    changeSlideSize, changeTextPlaceholder,
    showLastSlide,
    showNextSlide,
    showSlideShowPanel,
    stopShowPresentation
} from "./functions/showPresentation";
import {moveSlides} from "./functions/moveSlides"
import {endMoveSlides} from "./functions/endMoveSlides"

ReactDOM.render(
    <App/>,
    document.getElementById('root')
)

window.addEventListener('resize', () => {
    let slideMask = document.getElementById('slide-mask') as HTMLElement
    //это услоие костыльное
    if (slideMask.style.visibility === 'visible') {
        changeSlideSize()
    }
})

window.addEventListener('keydown', (evt: KeyboardEvent) => {
    if (evt.ctrlKey && evt.shiftKey && evt.keyCode === 90) {
        reDo()
    } else if (evt.ctrlKey && evt.keyCode === 90) {
        unDo()
    }

    if (evt.keyCode === 46) {
        dispatch(deleteElements, {})
    }

    if (evt.keyCode === 27) {
        stopShowPresentation()
    }

    let slideMask = document.getElementById('slide-mask') as HTMLElement
    //это услоие костыльное
    if (slideMask.style.visibility === 'visible') {
        if (evt.keyCode === 39) {
            showNextSlide(evt)
        }

        if (evt.keyCode === 37) {
            showLastSlide(evt)
        }
    }
})

let isMoveElements: boolean
let firstPosX: number
let firstPosY: number
let isResize: boolean

let isMoveSlides: boolean

let pointIndex: number
let payload: any
let resized = false

window.addEventListener('mousedown', (evt) => {
    firstPosX = evt.clientX
    firstPosY = evt.clientY
    isMoveElements = moveElements(evt)

    isMoveSlides = moveSlides(evt)

    pointIndex = resizeElement(evt, pointIndex)
    isResize = pointIndex >= 0

    removeSelectOfElement(evt)
})

window.addEventListener('mousemove', (evt) => {
    document.documentElement.style.cursor = ''
    showSlideShowPanel(evt)
    changeTextCursor(evt)

    if (isMoveElements) {
        mouseMoveElements(evt, firstPosX, firstPosY)
    }

    if (isResize) {
        resized = true
        payload = moveElementPoint(evt, firstPosX, firstPosY, pointIndex)
    }
});

window.addEventListener('mouseup', (evt) => {
    if (isMoveElements) {
        isMoveElements = endMoveElements(isMoveElements)
    }

    if (isMoveSlides) {
        let selectedSlide = getEditor().selectionSlidesId[0]

        let elem = evt.target as HTMLElement

        let shiftY = evt.pageY - elem.getBoundingClientRect().top

        dispatch(endMoveSlides, {shiftY: shiftY, startSlideId: selectedSlide, endSlideId: elem.id})
    }

    if (isResize) {
        isResize = false
        pointIndex = -1
        if (resized) {
            endResizeElement(payload)
            if (!payload.get('small')) {
                dispatch(changePositionOfElements, payload)
            }
        }
    }
})


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
