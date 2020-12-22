import {loadState, saveStateToLocalStorage} from "./localStorage"
import {applyMiddleware, compose, createStore, Store} from "redux"
import {Editor} from "../entities/Editor"
import {DispatchType, EditorAction} from "../type"
import reducer from "./reducer"
import thunk from "redux-thunk"
import {createLogger} from "redux-logger"
import {saveStateToHistory} from "./stateHistory"
import {StateHistory} from "../entities/StateHistory";


const oldState = loadState()
export const store: Store<Editor, EditorAction> & {
    dispatch: DispatchType
} = createStore(reducer, oldState, applyMiddleware(thunk))


export let stateHistory: StateHistory = {
    history: [],
    index: 0
}


store.subscribe(() => {
    let state = store.getState()

    saveStateToLocalStorage(state)
   /* saveStateHistoryToLocalStorage(stateHistory)*/
    saveStateToHistory(state)
})


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

