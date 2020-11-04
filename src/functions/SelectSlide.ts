import {dispatch} from "../stateManager/StateManager";
import {chooseSlides} from "./chooseSlides";

export function SelectSlide(slideId: number, isDispatch: boolean = true) {
    const attributeName = 'data-is-checked'
    const slideClass = 'slide'
    let currSlideDomElementId: string = 'slide' + slideId
    let currSlideElement = document.getElementById(currSlideDomElementId)
    let allSlides = document.getElementsByClassName(slideClass)

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
