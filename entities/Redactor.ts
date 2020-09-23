import {Presentation} from './Presentation.ts';
import {CommandsHistory} from './CommandsHistory.ts';
import {SelectionSlides} from './SelectionSlides.js';
import {SelectionElements} from './SelectionElements.js';

export {
    Redactor
}

type Redactor = {
    Presentation: Presentation,
    CommandsHistory: CommandsHistory,
    SelectionSlides: SelectionSlides,
    SelectionElements: SelectionElements
}