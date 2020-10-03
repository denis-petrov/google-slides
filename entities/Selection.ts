export {
    Selection, isSelection
}

type Selection = {
    SelectedSlides: Array<number>,
    SelectedElements: Array<number> | null
}

function isSelection(argument: any): argument is Selection {
    return argument.SelectedSlides !== undefined
        && (typeof argument.SelectedSlides[0] === 'number' || argument.SelectedSlides.length === 0)
        && argument.SelectedElements !== undefined;
}
