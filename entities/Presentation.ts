export {
    Presentation, isPresentation
}

type Presentation = {
    Slides: Array<Number>
}

function isPresentation(argument: any): argument is Presentation {
    return argument.Slides !== undefined
}