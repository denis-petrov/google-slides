import {Editor} from '../entities/Editor'
import {Image} from '../entities/Element'

export {
    addPhotoToBackground
}

function addPhotoToBackground(redactor: Editor, slideId: number, img: Image): Editor {
    let result: Editor = {
        ...redactor
    }
    result.SelectionSlides.find(elem => elem.Id === slideId).Background = {
        Background: img
    }
    result.CommandsHistory.CommandList.push(result)
    result.CommandsHistory.IndexOfCurrentState += 1
    return result
}   