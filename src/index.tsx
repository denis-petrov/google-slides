import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import {Editor} from './entities/Editor'

let editor: Editor = {
    presentation: {
        name: 'test',
        slides: []
    },
    selectionSlidesId: [0]
}

ReactDOM.render(
    <React.StrictMode>
        <App{...editor} />
    </React.StrictMode>,
    document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
