import {isRedactor} from "./Redactor";

export {
    Presentation, isPresentation
}

type Presentation = {
    Slides: Array<Number>
}

function isPresentation(argument: any): argument is Presentation {
    return argument.Slides !== undefined &&
        (typeof argument.Slides[0] === 'number' || argument.Slides.length === 0)
}