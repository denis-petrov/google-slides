import {Editor} from './Editor'
import {isRedactor} from './Editor'

export {
    CommandsHistory, isCommandsHistory
}

type CommandsHistory = {
    CommandList: Array<Editor>,
    IndexOfCurrentState: number,
}

function isCommandsHistory(argument: any): argument is CommandsHistory {
    return argument.CommandSet !== undefined && Array.isArray(argument.CommandSet)
        && (isRedactor(argument.CommandSet[argument.IndexOfCurrentState]) || argument.CommandSet.length === 0)
        && argument.IndexOfCurrentState !== undefined && typeof argument.IndexOfCurrentState === 'number'
}