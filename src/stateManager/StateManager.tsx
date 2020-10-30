import {Editor} from '../entities/Editor'
import ReactDOM from 'react-dom'
import React from 'react'
import App from '../App'
import { deepCopy } from 'deep-copy-ts'
import {WHITE} from '../entities/Constants'

let editor: Editor = {
    presentation: {
        name: 'test',
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
let stackState: Array<Editor> = []
let indexState: number = 0
let indexUnDo: number = 0

export function dispatch<F extends Function>(fn: F, payload: any): void {
    editor = fn(editor, payload)
    stackState.push(editor)
    indexState += 1

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

export function setEditor(newEditor: Editor, isAddHistory: boolean): void {
    editor = deepCopy(newEditor)
    if (isAddHistory) {
        stackState.push(editor)
        indexState += 1
    }

    ReactDOM.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>,
        document.getElementById('root')
    )
}

export function unDo(): void {
    if (indexState > 0) {
        editor = deepCopy(stackState[indexState - 1])
        indexUnDo = indexUnDo + 1
        indexState = indexState - 1

        ReactDOM.render(
            <React.StrictMode>
                <App />
            </React.StrictMode>,
            document.getElementById('root')
        )
    }
}

export function reDo(): void {
    editor = deepCopy(stackState[indexState + indexUnDo])
    if (indexUnDo > 0) {
        indexState = indexState + 1
        indexUnDo = indexUnDo - 1

        ReactDOM.render(
            <React.StrictMode>
                <App />
            </React.StrictMode>,
            document.getElementById('root')
        )
    }
}
