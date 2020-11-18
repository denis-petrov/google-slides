import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import {dispatch, getEditor, reDo, unDo} from './stateManager/StateManager'
import {deleteElements} from "./functions/deleteElements"
import {removeSelectOfElement} from "./functions/removeSelectOfElements"
import {moveElements} from "./slideArea/SlideArea";
import {changePositionOfElements} from "./functions/changePositionOfElements";
import {mouseMoveElements} from "./functions/mouseMoveElements";
import {endMoveElements} from "./functions/endMoveElements";

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
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

window.addEventListener('mousedown', (evt) => {
    removeSelectOfElement(evt)

    firstPosX = evt.clientX
    firstPosY = evt.clientY
    isMoveElements = moveElements(evt)
})

window.addEventListener('mousemove', (evt) => {
    if (isMoveElements) {
        mouseMoveElements(evt, firstPosX, firstPosY)
        let slideArea = document.getElementById('slide-area')
        if (slideArea) {
            slideArea.onmouseout = function(evt) {
                isMoveElements = endMoveElements(isMoveElements)
            }
        }
    }
});

window.addEventListener('mouseup', (evt) => {
    if (isMoveElements) {
        isMoveElements = endMoveElements(isMoveElements)
    }
})


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
