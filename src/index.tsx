import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import {dispatch, reDo, unDo} from './stateManager/StateManager'
import {deleteElements} from "./functions/deleteElements"
import {
    changeSlideSize,
    isShowCurrentlyPresentation,
    showNextSlide,
    showPrevSlide,
    showSlideShowPanel,
    stopShowPresentation
} from "./functions/showPresentation"
import {slideShow} from "./slideShowPanel/slideShow"
import {useDragAndDrop} from "./useDragAndDrop"
import {changeTextCursor} from "./functions/changeTextCursor"
import {changeWorkspaceSize} from "./functions/changeWorkspaceSize";


ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
)
useDragAndDrop()


window.addEventListener('resize', () => {
    if (isShowCurrentlyPresentation) {
        changeSlideSize()
    } else {
        changeWorkspaceSize()
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
        slideShow(evt, true)
        stopShowPresentation()
    }

    if (isShowCurrentlyPresentation) {
        if (evt.keyCode === 39) {
            showNextSlide(evt)
        }

        if (evt.keyCode === 37) {
            showPrevSlide(evt)
        }
    }
})

window.addEventListener('mousemove', (evt) => {
    document.documentElement.style.cursor = ''
    showSlideShowPanel(evt)
    changeTextCursor(evt)
})


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
