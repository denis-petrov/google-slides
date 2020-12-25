import {Editor} from "../entities/Editor"
import {deepCopy} from "deep-copy-ts"
import {StateHistory} from "../entities/StateHistory"
import {INITIAL_STATE_HISTORY} from "../entities/Constants"

let stateHistory: StateHistory = INITIAL_STATE_HISTORY

export function saveStateToHistory(state: Editor) {
    try {
        if (stateHistory.index !== stateHistory.history.length - 1) {
            stateHistory.history.splice(stateHistory.index + 1)
        }

        stateHistory.history.push(deepCopy(state))
        incIndex()
    } catch (err) {
        console.log(err)
    }
}

export function getStateHistory(): StateHistory {
    return stateHistory
}

export function resetStateHistory() {
    stateHistory = INITIAL_STATE_HISTORY
}

export function canRedo(): boolean {
    return stateHistory.index < stateHistory.history.length - 1
}

export function canUndo(): boolean {
    return stateHistory.index >= 0
}

export function canUndoKeyboard(evt: KeyboardEvent): boolean {
    return evt.ctrlKey && evt.keyCode === 90
}

export function decIndex() {
    stateHistory.index--
}

export function incIndex() {
    stateHistory.index++
}

export function undo() {
    if (canUndo()) {
        if (stateHistory.index > 0) {
            decIndex()
        }

        return stateHistory.history[stateHistory.index]
    }
    return stateHistory.history[stateHistory.index]
}

export function redo() {
    if (canRedo()) {
        incIndex()

        return stateHistory.history[stateHistory.index]
    }
    return stateHistory.history[stateHistory.index]
}
