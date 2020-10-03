import {isPresentation, Presentation} from './Presentation'
import {CommandsHistory, isCommandsHistory} from './CommandsHistory'
import {Slide} from "./Slide";

export {
    Editor, isRedactor
}

type Editor = {
    Presentation: Presentation,
    SelectionSlides: Array<number>,
    SelectionElements: Array<number> | null
}

function isRedactor(argument: any): argument is Editor {
    return argument.Presentation !== undefined && isPresentation(argument.Presentation)
        && argument.SelectionSlides !== undefined &&
            (typeof argument.SelectionSlides[0] === 'number' || argument.SelectionSlides.length === 0)
}