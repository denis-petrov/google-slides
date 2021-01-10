import {Editor} from "../entities/Editor"


export function isMultipleSelectSlide(editor: Editor, event: any, slideId: string) {
    const attributeName = 'data-is-checked'
    const slideClass = 'slide'

    let currSlideDomElementId: string = 'slide' + slideId
    let currSlideElement = document.getElementById(currSlideDomElementId)
    let allSlides = document.getElementsByClassName(slideClass)

    let isMultipleSelection: boolean = (event !== null) && (event.shiftKey) && !(
        (editor.selectionSlidesId.length === 1) &&
        (editor.selectionSlidesId.includes(slideId))
    )
    if (isMultipleSelection) {
        if (currSlideElement !== null) {
            let previousAttributeValue = currSlideElement.getAttribute(attributeName)
            currSlideElement.setAttribute(attributeName, previousAttributeValue === 'true' ? 'false' : 'true')
        }

        if (!editor.selectionSlidesId.includes(slideId)) {
            editor.selectionSlidesId.push(slideId)
        } else {
            editor.selectionSlidesId = editor.selectionSlidesId.filter(elem => elem !== slideId)
        }
        return true
    } else {

        for (let i = 0; i < allSlides.length; i++) {
            allSlides[i].setAttribute(attributeName, 'false')
        }

        if (currSlideElement != null) {
            let previousAttributeValue = currSlideElement.getAttribute(attributeName)
            currSlideElement.setAttribute(attributeName, previousAttributeValue === 'true' ? 'false' : 'true')
        }
        return false
    }
}
