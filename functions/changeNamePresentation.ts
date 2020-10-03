import {Editor} from '../entities/Editor'

export {
    changeNamePresentation
}

function changeNamePresentation(redactor: Editor, name: string): Editor {
    return {
        ...redactor,
        Presentation: {
            ...redactor.Presentation,
            Name: name
        }
    }
}
