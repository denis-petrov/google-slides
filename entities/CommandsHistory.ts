import {Editor} from './Editor'
import {isRedactor} from './Editor'

export {
    CommandsHistory, isCommandsHistory
}

type CommandsHistory = {
    commandList: Array<Editor>,
    indexOfCurrentState: number,
}

function isCommandsHistory(argument: any): argument is CommandsHistory {
    return argument.commandSet !== undefined && Array.isArray(argument.commandSet)
        && (isRedactor(argument.commandSet[argument.indexOfCurrentState]) || argument.commandSet.length === 0)
        && argument.indexOfCurrentState !== undefined && typeof argument.indexOfCurrentState === 'number'
}