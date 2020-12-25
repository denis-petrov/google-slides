import {loadState, saveStateToLocalStorage} from "./localStorage"
import {applyMiddleware, compose, createStore, Store} from "redux"
import {Editor} from "../entities/Editor"
import {DispatchType, EditorAction} from "../type"
import reducer, {lastCommand} from "./reducer"
import thunk from "redux-thunk"
import {createLogger} from "redux-logger"
import {decIndex, getStateHistory, saveStateToHistory} from "./stateHistory"
import {CHOOSE_ELEMENTS, CHOOSE_SLIDES, REDO, UNDO} from "./actionTypes"


const oldState = loadState()
export const store: Store<Editor, EditorAction> & {
    dispatch: DispatchType
} = createStore(reducer, oldState, applyMiddleware(thunk))



let notValidActions: Array<string> = [UNDO, REDO, CHOOSE_SLIDES, CHOOSE_ELEMENTS]
store.subscribe(() => {
    let state = store.getState()
    saveStateToLocalStorage(state)

    if (!notValidActions.includes(lastCommand)) {
        saveStateToHistory(state)
    }
    if (getStateHistory().history.length === 0) {
        saveStateToHistory(oldState)
        decIndex()
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

