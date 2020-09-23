import {Presentation} from './Presentation';
import {CommandsHistory} from './CommandsHistory';
import {SelectionSlides} from './SelectionSlides';
import {SelectionElements} from './SelectionElements';

export {
    Redactor
}

type Redactor = {
    Presentation: Presentation,
    CommandsHistory: CommandsHistory,
    SelectionSlides: SelectionSlides,
    SelectionElements: SelectionElements
}