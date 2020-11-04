import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import {getEditor, reDo, unDo} from './stateManager/StateManager'
import {SelectSlide} from "./functions/SelectSlide";


ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
)

SelectSlide(getEditor().presentation.slides[0].id, false)

window.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.ctrlKey && e.shiftKey && e.keyCode == 90) {
        reDo()
    } else if (e.ctrlKey && e.keyCode == 90) {
        unDo()
    }
})


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
