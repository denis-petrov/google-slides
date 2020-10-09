import {Editor} from '../entities/Editor'

export {
    changeNamePresentation
}

function changeNamePresentation(redactor: Editor, name: string): Editor {
    return {
        ...redactor,
        presentation: {
            ...redactor.presentation,
            name: name
        }
    }
}
