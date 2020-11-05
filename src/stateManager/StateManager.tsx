import {Editor} from '../entities/Editor'
import ReactDOM from 'react-dom'
import React from 'react'
import App from '../App'
import {deepCopy} from 'deep-copy-ts'
import {WHITE} from '../entities/Constants'

let editor: Editor = {
    presentation: {
        name: '',
        slides: [
            {
                id: 0,
                selectionElementsId: [],
                elements: [],
                background: WHITE
            }
        ]
    },
    selectionSlidesId: [0]
}
let presentationHistory: Array<Editor> = [deepCopy(editor)]
let indexHistory: number = 0


export function dispatch<F extends Function>(fn: F, payload: any, isNeedToHistory: boolean = true): void {
    if (indexHistory !== presentationHistory.length - 1) {
        presentationHistory.splice(indexHistory + 1)
    }

    editor = fn(deepCopy(editor), payload)

    if (isNeedToHistory) {
        presentationHistory.push(deepCopy(editor))
        indexHistory += 1
    }

    ReactDOM.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>,
        document.getElementById('root')
    )
}

export function getEditor(): Editor {
    return deepCopy(editor)
}

export function setEditorNewPresentation(newEditor: Editor): void {
    editor = deepCopy(newEditor)

    presentationHistory = [deepCopy(editor)]
    indexHistory = 0

    ReactDOM.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>,
        document.getElementById('root')
    )
}

export function unDo(): void {
    if (indexHistory > 0) {
        editor = presentationHistory[indexHistory - 1]
        indexHistory = indexHistory - 1

        ReactDOM.render(
            <React.StrictMode>
                <App />
            </React.StrictMode>,
            document.getElementById('root')
        )
    }
}

export function reDo(): void {
    if (indexHistory < presentationHistory.length - 1) {
        editor = presentationHistory[indexHistory + 1]
        indexHistory = indexHistory + 1

        ReactDOM.render(
            <React.StrictMode>
                <App />
            </React.StrictMode>,
            document.getElementById('root')
        )
    }
}
