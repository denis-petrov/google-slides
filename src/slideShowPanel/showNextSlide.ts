import {Editor} from "../entities/Editor"
import {Dispatch} from "react"
import {getSlideIndex} from "../functions/getSlideIndex"
import {changeTextPlaceholder} from "./changeTextPlaceholder"
import {changeArrowColor} from "./changeArrowColor"
import {CHOOSE_SLIDES} from "../store/actionTypes"
import {getIsShowCurrentlyPresentation} from "../functions/showPresentation"
import {store} from "../store/store";


export function showNextSlide(editor: Editor, dispatch: Dispatch<any>) {
    let slide = document.getElementsByClassName('workspace')[0]
    let isLastPage = false
    if (slide) {
        let slideIndex = getSlideIndex(editor, slide)
        if (slideIndex + 1 < editor.presentation.slides.length) {
            dispatch({type: CHOOSE_SLIDES, payload: [editor.presentation.slides[slideIndex + 1].id]})
        }

        if (slideIndex + 2 === editor.presentation.slides.length) {
            isLastPage = true
        }
    }

    if (getIsShowCurrentlyPresentation()) {
        changeTextPlaceholder('')
    }

    changeArrowColor(store.getState())

    return isLastPage
}