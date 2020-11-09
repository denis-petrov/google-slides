import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import {dispatch, reDo, unDo} from './stateManager/StateManager'
import {deleteElements} from "./functions/deleteElements"
import {chooseElements} from "./functions/chooseElements"

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

window.addEventListener('click', (evt) => {
    let clickedElem = evt.target as HTMLElement
    let slideArea = document.getElementById('slide-area')
    let pathClassName = 'elem-path_active'
    let itsSlideArea = null
    if (slideArea) {
        itsSlideArea = evt.target === slideArea || slideArea.contains(evt.target as Node);
    }

    if (itsSlideArea && !(clickedElem.getAttribute('data-path-id'))) {
        let className = 'element_choosed'
        let allSelectedElems = document.getElementsByClassName(className)
        while(allSelectedElems[0]) {
            if (allSelectedElems[0].classList.contains(className)) {
                allSelectedElems[0].classList.remove(className)
            }
        }

        let elemPathArray = document.getElementsByClassName(pathClassName)
        while(elemPathArray[0]) {
            if (elemPathArray[0].classList.contains(pathClassName)) {
                elemPathArray[0].classList.remove(pathClassName)
            }
        }

        dispatch(chooseElements, new Array<number>())
    }

})


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
