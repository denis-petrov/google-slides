import {Editor} from '../entities/Editor'
import ReactDOM from 'react-dom'
import React from 'react'
import App from '../App'
import { deepCopy } from 'deep-copy-ts'
import {WHITE} from '../entities/Constants'
import {ElementType} from "../entities/Elements";

let editor: Editor = {
    presentation: {
        name: 'test',
        slides: [
            {
                id: 0,
                selectionElementsId: [],
                elements: [
                    /*{
                        id: 0,
                        center: {
                            x: 0,
                            y: 0
                        },
                        topLeftPoint: {
                            x: 0,
                            y: 0
                        },
                        bottomRightPoint: {
                            x: 0,
                            y: 0
                        },
                        borderColor: {
                            red: 255,
                            green: 255,
                            blue: 255
                        },
                        borderWidth: 1,
                        backgroundColor: {
                            red: 100,
                            green: 100,
                            blue: 100
                        },
                        type: ElementType.rectangle,
                    },
                    {
                        id: 1,
                        center: {
                            x: 0,
                            y: 0
                        },
                        topLeftPoint: {
                            x: 200,
                            y: 200
                        },
                        bottomRightPoint: {
                            x: 0,
                            y: 0
                        },
                        borderColor: {
                            red: 255,
                            green: 255,
                            blue: 255
                        },
                        borderWidth: 1,
                        backgroundColor: {
                            red: 100,
                            green: 100,
                            blue: 100
                        },
                        type: ElementType.ellipse,
                    }*/
                ],
                background: WHITE
            }
        ]
    },
    selectionSlidesId: [0]
}
let stackState: Array<Editor> = []
let index: number = 0

export function dispatch<F extends Function>(fn: F, payload: any): void {
    editor = fn(editor, payload)
    stackState.push(editor)
    index += 1

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
        index += 1
    }

    ReactDOM.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>,
        document.getElementById('root')
    )
}
