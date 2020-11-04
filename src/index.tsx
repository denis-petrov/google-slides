import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import {dispatch, reDo, unDo} from './stateManager/StateManager'
import {chooseElements} from "./functions/chooseElements";
import {deleteElements} from "./functions/deleteElements";


ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
)

window.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.ctrlKey && e.shiftKey && e.keyCode == 90) {
        reDo()
    } else if (e.ctrlKey && e.keyCode == 90) {
        unDo()
    }

    if (e.keyCode == 46) {
        dispatch(deleteElements, {})
    }
})

window.addEventListener('click', (evt) => {
    let clickedElemTagName = (evt.target as HTMLElement).tagName
    let slideArea = document.getElementById('slide-area')
    let itsSlideArea = null
    if (slideArea) {
        itsSlideArea = evt.target === slideArea || slideArea.contains(evt.target as Node);
    }
    if (itsSlideArea && clickedElemTagName !== 'rect' && clickedElemTagName !== 'ellipse' && clickedElemTagName !== 'polygon') {
        let className = 'element_choosed'
        let allSelectedElems = document.getElementsByClassName(className)
        while(allSelectedElems[0]) {
            if (allSelectedElems[0].classList.contains(className)) {
                allSelectedElems[0].classList.remove(className)
            }
        }
        dispatch(chooseElements, new Array<number>())
    }

})


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
