import {Editor} from '../entities/Editor'
import ReactDOM from 'react-dom'
import React from 'react'
import App from '../App'
import {deepCopy} from 'deep-copy-ts'
import {applyMiddleware, createStore, Store} from "redux"
import {DispatchType, EditorAction} from "../type"
import reducer from "../store/reducer"
import thunk from "redux-thunk"


export const store: Store<Editor, EditorAction> & {
    dispatch: DispatchType
} = createStore(reducer, applyMiddleware(thunk))


let presentationHistory: Array<Editor> = [deepCopy(store.getState())]
let indexHistory: number = 0

export function dispatch2<F extends Function>(fn: F, payload: any, isNeedToHistory: boolean = true): void {
    /*if (indexHistory !== presentationHistory.length - 1) {
        presentationHistory.splice(indexHistory + 1)
    }

    editor = fn(deepCopy(editor), payload)

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
    )*/
}

export function unDo(): void {
    if (indexHistory > 0) {

        /*dispatch(setEditor(presentationHistory[indexHistory - 1]))*/
        indexHistory = indexHistory - 1

        ReactDOM.render(
            <React.StrictMode>
                <App/>
            </React.StrictMode>,
            document.getElementById('root')
        )
    }
}

export function reDo(): void {
    if (indexHistory < presentationHistory.length - 1) {

        /*dispatch(setEditor(presentationHistory[indexHistory + 1]))*/
        indexHistory = indexHistory + 1

        ReactDOM.render(
            <React.StrictMode>
                <App/>
            </React.StrictMode>,
            document.getElementById('root')
        )
    }
}
