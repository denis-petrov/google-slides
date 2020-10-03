import {Editor} from '../entities/Editor'
import {Slide} from "../entities/Slide";

export {
    addEmptySlide
}

function addEmptySlide(redactor: Editor) {
    let result: Editor = {
        ...redactor
    }
    let slide: Slide = {}

    result.SelectionSlides.push()
    result.CommandsHistory.CommandList.push(result)
    result.CommandsHistory.IndexOfCurrentState += 1
    return result
}