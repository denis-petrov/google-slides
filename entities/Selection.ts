export {
    Selection, isSelection
}

type Selection = {
    SelectedSlides: Array<Number>,
    SelectedElements: Array<Number> | null
}

function isSelection(argument: any): argument is Selection {
    return argument.SelectedSlides !== undefined
        && argument.SelectedElements !== undefined;
}
