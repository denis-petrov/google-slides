import {Redactor} from './Redactor'

export {
    CommandsHistory
}

type CommandsHistory = {
    CommandSet: Array<Redactor>,
    IndexOfCurrentState: Number,
}