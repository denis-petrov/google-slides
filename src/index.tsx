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
import {stopShowPresentation} from "./functions/showPresentation";
import {SelectSlide} from "./functions/SelectSlide";
import {getElements} from "./functions/getElements";

ReactDOM.render(
    <App/>,
    document.getElementById('root')
)

window.addEventListener('keydown', (evt: KeyboardEvent) => {
    if (evt.ctrlKey && evt.shiftKey && evt.keyCode === 90) {
        reDo()
    } else if (evt.ctrlKey && evt.keyCode === 90) {
        unDo()
    }

    if (evt.keyCode === 46) {
        dispatch(deleteElements, {})
    }

    if (evt.keyCode === 81) {
        stopShowPresentation()
    }

    if (evt.keyCode === 39) {
        let slide = document.getElementsByClassName('workspace')[0]
        if (slide) {
            let slideId = slide.id.split('slide_area_')[1]
            let editor = getEditor()
            let slideIndex = 0
            editor.presentation.slides.map(s => {
                if (s.id === slideId) {
                    slideIndex = editor.presentation.slides.indexOf(s) + 1
                }
            })

            if (slideIndex < editor.presentation.slides.length) {
                SelectSlide(evt,  editor.presentation.slides[slideIndex].id)
            }
        }
    }

    if (evt.keyCode === 37) {
        let slide = document.getElementsByClassName('workspace')[0]
        if (slide) {
            let slideId = slide.id.split('slide_area_')[1]
            let editor = getEditor()
            let slideIndex = 0
            editor.presentation.slides.map(s => {
                if (s.id === slideId) {
                    slideIndex = editor.presentation.slides.indexOf(s) - 1
                }
            })

            if (slideIndex >= 0) {
                SelectSlide(evt,  editor.presentation.slides[slideIndex].id)
            }
        }
    }
})

let isMoveElements: boolean
let firstPosX: number
let firstPosY: number

let isResize: boolean
let pointIndex: number
let payload: any
let resized = false

window.addEventListener('mousedown', (evt) => {
    firstPosX = evt.clientX
    firstPosY = evt.clientY
    isMoveElements = moveElements(evt)

    pointIndex = resizeElement(evt, pointIndex)
    isResize = pointIndex >= 0

    removeSelectOfElement(evt)
})

window.addEventListener('mousemove', (evt) => {
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
