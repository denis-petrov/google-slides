import {Redactor} from './Redactor'
import {Color} from "./Color";

export {
    CommandsHistory, isCommandsHistory
}

type CommandsHistory = {
    CommandSet: Array<Redactor>,
    IndexOfCurrentState: Number,
}

function isCommandsHistory(argument: any): argument is CommandsHistory {
    return argument.CommandSet !== undefined
        && argument.IndexOfCurrentState !== undefined && typeof argument.IndexOfCurrentState === 'number'
}