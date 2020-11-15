import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import {dispatch, reDo, unDo} from './stateManager/StateManager'
import {deleteElements} from "./functions/deleteElements"
import {removeSelectOfElement} from "./functions/removeSelectOfElements"

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
    removeSelectOfElement(evt)
})


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
