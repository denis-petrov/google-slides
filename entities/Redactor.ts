import {isPresentation, Presentation} from './Presentation'
import {CommandsHistory, isCommandsHistory} from './CommandsHistory'

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
    return argument.Presentation !== undefined && isPresentation(argument.Presentation)
        && argument.CommandsHistory !== undefined && isCommandsHistory(argument.CommandsHistory)
        && argument.SelectionSlides !== undefined &&
            (typeof argument.SelectionSlides[0] === 'number' || argument.SelectionSlides.length === 0)
}