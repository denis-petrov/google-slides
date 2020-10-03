import {Editor} from '../entities/Editor'

export {
    addElement
}

function addElement(redactor: Editor, slideId: number, element: Element) {
    let result: Editor = {
        ...redactor
    }
    result.SelectionElements.push(element)
    result.CommandsHistory.CommandList.push(result)
    result.CommandsHistory.IndexOfCurrentState += 1
    return result
}