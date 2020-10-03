import {isPresentation, Presentation} from './Presentation'

export {
    Editor, isRedactor
}

type Editor = {
    Presentation: Presentation,
    SelectionSlidesId: Array<number>
}

function isRedactor(argument: any): argument is Editor {
    return argument.Presentation !== undefined && isPresentation(argument.Presentation)
        && argument.SelectionSlides !== undefined &&
            (typeof argument.SelectionSlides[0] === 'number' || argument.SelectionSlides.length === 0)
}