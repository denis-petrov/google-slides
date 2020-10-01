import {Redactor} from './Redactor'
import {isRedactor} from './Redactor'

export {
    CommandsHistory, isCommandsHistory
}

type CommandsHistory = {
    CommandSet: Array<Redactor>,
    IndexOfCurrentState: Number,
}

function isCommandsHistory(argument: any): argument is CommandsHistory {
    return argument.CommandSet !== undefined && Array.isArray(argument.CommandSet)
        && (isRedactor(argument.CommandSet[argument.IndexOfCurrentState]) || argument.CommandSet.length === 0)
        && argument.IndexOfCurrentState !== undefined && typeof argument.IndexOfCurrentState === 'number'
}