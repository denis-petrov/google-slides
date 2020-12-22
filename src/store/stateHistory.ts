import {Editor} from "../entities/Editor"
import {deepCopy} from "deep-copy-ts"
import {StateHistory} from "../entities/StateHistory"

let stateHistory: StateHistory = {
    history: [],
    index: 0
}

export function saveStateToHistory(state: Editor) {
    try {
        if (stateHistory.index !== stateHistory.history.length - 1) {
            stateHistory.history.splice(stateHistory.index + 1)
        }

        stateHistory.history.push(deepCopy(state))
        stateHistory.index += 1
    } catch (err) {
        console.log(err)
    }
}

export function canRedo(): boolean {
    return stateHistory.index < stateHistory.history.length - 1
}

export function canUndo(): boolean {
    return stateHistory.index > 0
}

export function canUndoKeyboard(evt: KeyboardEvent): boolean {
    return evt.ctrlKey && evt.keyCode === 90
}

function decIndex(stateHistory: StateHistory): StateHistory {
    return {
        ...stateHistory,
        index: stateHistory.index - 1
    }
}

function incIndex(stateHistory: StateHistory): StateHistory {
    return {
        ...stateHistory,
        index: stateHistory.index + 1
    }
}

export function undo() {
    /*console.log(stateHistory.index)
    if (canUndo()) {
        console.log(stateHistory.index)

        decHistoryIndex()

        console.log(stateHistory.index)
        console.log(stateHistory)

        return stateHistory.history[stateHistory.index]
    }
    return stateHistory.history[stateHistory.index]*/
    console.log(stateHistory)
    console.log(stateHistory.index)
    stateHistory = decIndex(stateHistory)
    console.log(stateHistory.index)
    console.log(stateHistory)
}

export function redo() {
    if (canRedo()) {
        stateHistory = incIndex(stateHistory)

        return stateHistory.history[stateHistory.index]
    }
    return stateHistory.history[stateHistory.index]
}
