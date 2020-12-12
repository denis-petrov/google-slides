import {WHITE} from "../entities/Constants"
import {v4 as uuidv4} from 'uuid'
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
import {deepCopy} from "deep-copy-ts";
import {store} from "../stateManager/StateManager";
import {State} from "../entities/State";


let firstSlideId = uuidv4()
/*const initialState: State = {
    past: [],
    present: {
        presentation: {
            name: '',
            slides: [
                {
                    id: firstSlideId,
                    selectionElementsId: [],
                    elements: [],
                    background: WHITE
                }
            ]
        },
        selectionSlidesId: [firstSlideId]
    },
    future: []
}*/
const initialState: Editor = {
    presentation: {
        name: '',
        slides: [
            {
                id: firstSlideId,
                selectionElementsId: [],
                elements: [],
                background: WHITE
            }
        ]
    },
    selectionSlidesId: [firstSlideId]
}


const reducer = (
    state: Editor = initialState,
    action: EditorAction
): Editor => {
   /* const {past, present, future} = state*/

    switch (action.type) {
        /* editor */
        case actionTypes.SET_EDITOR:
            return setEditor(state)
        case actionTypes.CHANGE_PRESENTATION_NAME:
            return changeNamePresentation(state, action.payload)
        /*case actionTypes.UNDO:
            const previous = past[past.length - 1]
            const newPast = past.slice(0, past.length - 1)
            return {
                past: newPast,
                present: previous,
                future: [present, ...future]
            }
        case actionTypes.REDO:
            const next = future[0]
            const newFuture = future.slice(1)
            return {
                past: [...past, present],
                present: next,
                future: newFuture
            }*/


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