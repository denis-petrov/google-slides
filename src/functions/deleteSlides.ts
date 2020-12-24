import {Editor} from '../entities/Editor'
import {v4 as uuidv4} from "uuid"
import {WHITE} from "../entities/Constants"
import {Slide} from "../entities/Slide"
import {deepCopy} from "deep-copy-ts";
import {Element} from "../entities/Elements";

export function deleteSlides(editor: Editor): Editor {
    let slidesId = editor.selectionSlidesId
    let allSlidesWithoutDeleted = editor.presentation.slides.filter(currSlide => !slidesId.includes(currSlide.id))

    let newEditor = deepCopy(editor)
    if (allSlidesWithoutDeleted.length > 0) {
        newEditor.presentation.slides = allSlidesWithoutDeleted
        newEditor.selectionSlidesId = [allSlidesWithoutDeleted[0].id]
        return newEditor;
    } else {
        let newSlideId = uuidv4()
        newEditor.presentation.slides = [{
            id: newSlideId,
            elements: new Array<Element>(),
            background: WHITE,
            selectionElementsId: [newSlideId]
        } as Slide];
        newEditor.selectionSlidesId = [newSlideId]
        return newEditor
    }
}