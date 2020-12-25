import {Editor} from "../entities/Editor"
import {EditorAction} from "../type"
import * as actionTypes from "./actionTypes"
import {addEmptySlide} from "../functions/addEmptySlide"
import {deleteSlides} from "../functions/deleteSlides"
import {setEditor} from "../functions/setEditor"
import {chooseElements} from "../functions/chooseElements"
import {addElement} from "../functions/addElement"
import {addToBackground} from "../functions/addToBackground"
import {changePositionOfElements} from "../functions/changePositionOfElements"
import {changeTextValue} from "../functions/changeTextElement"
import {endMoveSlides} from "../functions/endMoveSlides"
import {chooseSlides} from "../functions/chooseSlides"
import {changeNamePresentation} from "../functions/changeNamePresentation"
import {deleteElements} from "../functions/deleteElements"
import {changeElementFillColor} from "../functions/changeElementFillColor"
import {changeElementBorderColor} from "../functions/changeElementBorderColor"
import {changeElementBorderWidth} from "../functions/changeElementBorderWidth"
import {changeTextBold} from "../functions/changeTextBold"
import {changeTextItalic} from "../functions/changeTextItalic"
import {changeTextUnderline} from "../functions/changeTextUnderline"
import {changeTextFont} from "../functions/changeTextFont"
import {changeTextSize} from "../functions/changeTextSize"
import {initialState} from "./localStorage"
import {redo, undo} from "./stateHistory"

export let lastCommand: string

const reducer = (
    state: Editor = initialState,
    action: EditorAction
): Editor => {
    lastCommand = action.type
    switch (action.type) {
        /* editor */
        case actionTypes.SET_EDITOR:
            return setEditor(action.payload)
        case actionTypes.CHANGE_PRESENTATION_NAME:
            return changeNamePresentation(state, action.payload)


        /* undo and redo*/
        case actionTypes.UNDO:
            return undo()
        case actionTypes.REDO:
            return redo()


        /* slides */
        case actionTypes.ADD_EMPTY_SLIDE:
            return addEmptySlide(state)
        case actionTypes.DELETE_SLIDES:
            return deleteSlides(state)
        case actionTypes.END_MOVE_SLIDES:
            return endMoveSlides(state, action.payload)
        case actionTypes.CHOOSE_SLIDES:
            return chooseSlides(state, action.payload)


        /* elements */
            /* main */
        case actionTypes.CHOOSE_ELEMENTS:
            return chooseElements(state, action.payload)
        case actionTypes.ADD_ELEMENT:
            return addElement(state, action.payload)
        case actionTypes.DELETE_ELEMENTS:
            return deleteElements(state)
        case actionTypes.ADD_TO_BACKGROUND:
            return addToBackground(state, action.payload)
        case actionTypes.ADD_IMAGE_TO_BACKGROUND:
            return addToBackground(state, action.payload)
            /* move */
        case actionTypes.CHANGE_POSITION_OF_ELEMENTS:
            return changePositionOfElements(state, action.payload)
        case actionTypes.END_MOVE_ELEMENTS:
            return changePositionOfElements(state, action.payload)
        case actionTypes.CHANGE_TEXT_VALUE:
            return changeTextValue(state, action.payload)
            /* styles */
        case actionTypes.CHANGE_ELEMENT_FILL_COLOR:
            return changeElementFillColor(state, action.payload)
        case actionTypes.CHANGE_ELEMENT_BORDER_COLOR:
            return changeElementBorderColor(state, action.payload)
        case actionTypes.CHANGE_ELEMENT_BORDER_WIDTH:
            return changeElementBorderWidth(state, action.payload)
            /* style text */
        case actionTypes.CHANGE_TEXT_BOLD:
            return changeTextBold(state)
        case actionTypes.CHANGE_TEXT_ITALIC:
            return changeTextItalic(state)
        case actionTypes.CHANGE_TEXT_UNDERLINE:
            return changeTextUnderline(state)
        case actionTypes.CHANGE_TEXT_FONT:
            return changeTextFont(state, action.payload)
        case actionTypes.CHANGE_TEXT_SIZE:
            return changeTextSize(state, action.payload)
    }

    return state
}

export default reducer