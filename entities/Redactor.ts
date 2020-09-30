import {Presentation} from './Presentation'
import {CommandsHistory} from './CommandsHistory'

export {
    Redactor, isRedactor
}

type Redactor = {
    Presentation: Presentation,
    CommandsHistory: CommandsHistory,
    SelectionSlides: Array<Number>,
    SelectionElements: Array<Number> | null
}

function isRedactor(argument: any): argument is Redactor {
    return argument.Presentation !== undefined
        && argument.CommandsHistory !== undefined
        && argument.SelectionSlides !== undefined
        && argument.SelectionElements !== undefined
}