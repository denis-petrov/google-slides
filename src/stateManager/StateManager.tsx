import {Editor} from '../entities/Editor'
import ReactDOM from 'react-dom'
import React from 'react'
import App from '../App'
import {deepCopy} from 'deep-copy-ts'
import {LOCAL_STORAGE_EDITOR_KEY, WHITE} from '../entities/Constants'
import { v4 as uuidv4 } from 'uuid'

let firstSlideId = uuidv4()

let presentationHistory: Array<Editor> = [getEditor()]
let indexHistory: number = 0

let ed = getEditor()
if (Object.keys(ed).length == 0) {
    setEditor({
        presentation: {
            name: '',
            slides: [
                {
                    id: firstSlideId,
                    selectionElementsId: [],
                    elements: [],
                    background: WHITE
                }
            ]
        },
        selectionSlidesId: [firstSlideId]
    })
    presentationHistory = [getEditor()]
    indexHistory = 0
}

export function dispatch<F extends Function>(fn: F, payload: any, isNeedToHistory: boolean = true): void {
    if (indexHistory !== presentationHistory.length - 1) {
        presentationHistory.splice(indexHistory + 1)
    }

    setEditor(fn(getEditor(), payload))

    let editor = getEditor();
    if ((editor.selectionSlidesId.length === 0) && (editor.presentation.slides[0] != null)) {
        editor.selectionSlidesId.push(editor.presentation.slides[0].id)
    }

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
    let localStorageEditor = localStorage.getItem(LOCAL_STORAGE_EDITOR_KEY)

    if (localStorageEditor != null) {
        return deepCopy(JSON.parse(localStorageEditor as string) as Editor);
    } else {
        return {} as Editor;
    }
}

export function setEditor(newEditor: Editor): void {
    localStorage.setItem(LOCAL_STORAGE_EDITOR_KEY, JSON.stringify(newEditor))
}

export function setEditorNewPresentation(newEditor: Editor): void {
    setEditor(newEditor)

    presentationHistory = [deepCopy(newEditor)]
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
        setEditor(presentationHistory[indexHistory - 1])
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
        setEditor(presentationHistory[indexHistory + 1])
        indexHistory = indexHistory + 1

        ReactDOM.render(
            <React.StrictMode>
                <App />
            </React.StrictMode>,
            document.getElementById('root')
        )
    }
}
