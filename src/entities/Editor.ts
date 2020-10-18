import {isPresentation, Presentation} from './Presentation'

export type {
    Editor
}
export {
    isRedactor
}

type Editor = {
    presentation: Presentation,
    selectionSlidesId: Array<number>
}

function isRedactor(argument: any): argument is Editor {
    return argument.presentation !== undefined && isPresentation(argument.presentation)
        && argument.Selectionslides !== undefined &&
            (typeof argument.Selectionslides[0] === 'number' || argument.Selectionslides.length === 0)
}