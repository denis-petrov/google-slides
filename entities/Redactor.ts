import {Presentation} from './Presentation'
import {CommandsHistory} from './CommandsHistory'

export {
    Redactor
}

type Redactor = {
    Presentation: Presentation,
    CommandsHistory: CommandsHistory,
    SelectionSlides: Array<Number>,
    SelectionElements: Array<Number> | null
}