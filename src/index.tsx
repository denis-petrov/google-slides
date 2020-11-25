import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import {dispatch, reDo, unDo} from './stateManager/StateManager'
import {deleteElements} from "./functions/deleteElements"
import {removeSelectOfElement} from "./functions/removeSelectOfElements"
import {moveElements} from "./slideArea/SlideArea"
import {mouseMoveElements} from "./functions/mouseMoveElements"
import {endMoveElements} from "./functions/endMoveElements"
import {moveElementPoint, resizeElement} from "./functions/resizeElement";
import {changePositionOfElements} from "./functions/changePositionOfElements";
import {endResizeElement} from "./functions/endResizeElement";

ReactDOM.render(
    <App/>,
    document.getElementById('root')
)

window.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.ctrlKey && e.shiftKey && e.keyCode === 90) {
        reDo()
    } else if (e.ctrlKey && e.keyCode === 90) {
        unDo()
    }

    if (e.keyCode === 46) {
        dispatch(deleteElements, {})
    }
})

let isMoveElements: boolean
let firstPosX: number
let firstPosY: number

let isResize: boolean
let pointIndex: number
let payload: any

window.addEventListener('mousedown', (evt) => {
    firstPosX = evt.clientX
    firstPosY = evt.clientY
    isMoveElements = moveElements(evt)

    pointIndex = resizeElement(evt, pointIndex)
    isResize = pointIndex >= 0

    removeSelectOfElement(evt)
})

window.addEventListener('mousemove', (evt) => {
    if (isMoveElements) {
        mouseMoveElements(evt, firstPosX, firstPosY)
    }

    if (isResize) {
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
        if (payload.size > 0) {
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
