import {Slide} from "./Slide";

export {
    Presentation, isPresentation
}

type Presentation = {
    Slides: Array<Slide>
}

function isPresentation(argument: any): argument is Presentation {
    return argument.Slides !== undefined &&
        (typeof argument.Slides[0] === 'number' || argument.Slides.length === 0)
}