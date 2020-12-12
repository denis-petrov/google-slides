import {Editor} from '../entities/Editor'
import ReactDOM from 'react-dom'
import React, {Dispatch} from 'react'
import App from '../App'
import {deepCopy} from 'deep-copy-ts'
import {applyMiddleware, createStore, Store} from "redux"
import {DispatchType, EditorAction} from "../type"
import reducer from "../store/reducer"
import thunk from "redux-thunk"
import {setEditor} from "../functions/setEditor"
import {LOCAL_STORAGE_EDITOR_KEY, WHITE} from "../entities/Constants"
import {v4 as uuidv4} from 'uuid'
import {useDispatch} from "react-redux";




const saveState = (state: Editor) => {
    try {
        const serialisedState = JSON.stringify(state)

        window.localStorage.setItem(LOCAL_STORAGE_EDITOR_KEY, serialisedState)
    } catch (err) {
        console.log(err)
    }
}

const loadState = () => {
    try {
        const serialisedState = window.localStorage.getItem(LOCAL_STORAGE_EDITOR_KEY)

        if (!serialisedState) return undefined

        return JSON.parse(serialisedState)
    } catch (err) {
        return undefined
    }
}


const oldState = loadState()
export const store: Store<Editor, EditorAction> & {
    dispatch: DispatchType
} = createStore(reducer, oldState, applyMiddleware(thunk))


store.subscribe(() => {
    saveState(store.getState())
})






let presentationHistory: Array<Editor> = [deepCopy(store.getState())]
let indexHistory: number = 0

let firstSlideId = uuidv4()
let state = store.getState()


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
