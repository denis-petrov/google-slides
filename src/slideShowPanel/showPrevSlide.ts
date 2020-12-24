import {Editor} from "../entities/Editor"
import {Dispatch} from "react"
import {getSlideIndex} from "../functions/getSlideIndex"
import {changeTextPlaceholder} from "./changeTextPlaceholder"
import {changeArrowColor} from "./changeArrowColor"
import {getIsShowCurrentlyPresentation} from "../functions/showPresentation"
import {CHOOSE_SLIDES} from "../store/actionTypes"
import {store} from "../store/store";

export function showPrevSlide(editor: Editor, dispatch: Dispatch<any>) {
    let slide = document.getElementsByClassName('workspace')[0]
    if (slide) {
        let slideIndex = getSlideIndex(editor, slide)
        if (slideIndex - 1 >= 0) {
            dispatch({type: CHOOSE_SLIDES, payload: [editor.presentation.slides[slideIndex - 1].id]})
        }
    }

    if (getIsShowCurrentlyPresentation()) {
        changeTextPlaceholder('')
    }

    changeArrowColor(store.getState())
}