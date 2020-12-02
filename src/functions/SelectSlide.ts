import {dispatch, getEditor} from "../stateManager/StateManager"
import {chooseSlides} from "./chooseSlides"

export function SelectSlide(event: any, slideId: string, isDispatch: boolean = true) {
    const attributeName = 'data-is-checked'
    const slideClass = 'slide'

    let currSlideDomElementId: string = 'slide' + slideId
    let currSlideElement = document.getElementById(currSlideDomElementId)
    let allSlides = document.getElementsByClassName(slideClass)

    if ((event != null) && (event.shiftKey)) {
        if (currSlideElement != null) {
            let previousAttributeValue = currSlideElement.getAttribute(attributeName)
            currSlideElement.setAttribute(attributeName, previousAttributeValue === 'true' ? 'false' : 'true')
        }

        let editor = getEditor()

        let firstSelectSlide = editor.presentation.slides.filter((slide) => editor.selectionSlidesId.includes(slide.id))[0]
        let firstSelectSlideId = editor.presentation.slides.indexOf(firstSelectSlide)

        let secondSelectSlide = editor.presentation.slides.filter((slide) => slide.id === slideId)[0]
        let secondSelectSlideId = editor.presentation.slides.indexOf(secondSelectSlide)

        for (let index = firstSelectSlideId + 1; index <= secondSelectSlideId; index++) {
            if (!editor.selectionSlidesId.includes(editor.presentation.slides[index].id)) {
                editor.selectionSlidesId.push(editor.presentation.slides[index].id)
            } else {
                editor.selectionSlidesId = editor.selectionSlidesId.filter((slideId) => slideId != editor.presentation.slides[index].id)
            }
        }

        console.log(editor)
        if (isDispatch) {
            dispatch(chooseSlides, editor.selectionSlidesId)
        }
    } else {

        for (let i = 0; i < allSlides.length; i++) {
            allSlides[i].setAttribute(attributeName, 'false')
        }

        if (currSlideElement != null) {
            let previousAttributeValue = currSlideElement.getAttribute(attributeName)
            currSlideElement.setAttribute(attributeName, previousAttributeValue === 'true' ? 'false' : 'true')
        }

        if (isDispatch) {
            dispatch(chooseSlides, [slideId])
        }
    }
}
