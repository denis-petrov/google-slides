import {loadState, saveStateToLocalStorage} from "./localStorage"
import {applyMiddleware, compose, createStore, Store} from "redux"
import {Editor} from "../entities/Editor"
import {DispatchType, EditorAction} from "../type"
import reducer, {lastCommand} from "./reducer"
import thunk from "redux-thunk"
import {createLogger} from "redux-logger"
import {decIndex, getStateHistory, resetStateHistory, saveStateToHistory} from "./stateHistory"
import {CHOOSE_ELEMENTS, CHOOSE_SLIDES, NEW_EDITOR, REDO, SET_EDITOR, UNDO} from "./actionTypes"


const oldState = loadState()
export const store: Store<Editor, EditorAction> & {
    dispatch: DispatchType
} = createStore(reducer, oldState, applyMiddleware(thunk))



let notValidActions: Array<string> = [UNDO, REDO, CHOOSE_SLIDES, CHOOSE_ELEMENTS, NEW_EDITOR, SET_EDITOR]
store.subscribe(() => {
    let state = store.getState()
    let stateHistory = getStateHistory()

    saveStateToLocalStorage(state)

    if (!notValidActions.includes(lastCommand)) {
        saveStateToHistory(state)

    }

    if (stateHistory.history.length === 0) {
        saveStateToHistory(oldState)
    }
    if (stateHistory.history.length === stateHistory.index) {
        decIndex()
    }
    if (lastCommand === NEW_EDITOR) {
        resetStateHistory()
    }
})


/*store with logger*/
export function configureStore() {
    const oldState = loadState()
    const windowExist = typeof window === 'object'
    const loggerMiddleware = createLogger({
        colors: {
            title: (color: any) => windowExist && color,
            prevState: (color: any) => windowExist && color,
            action: (color: any) => windowExist && color,
            nextState: (color: any) => windowExist && color,
            error: (color: any) => windowExist && color
        }
    })
    const composeEnhancers = (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose
    return createStore(
        reducer,
        oldState,
        composeEnhancers(
            applyMiddleware(loggerMiddleware),
        )
    )
}

