import {ImageElement} from '../entities/Elements'
import {dispatch} from '../stateManager/StateManager'
import {addToBackground} from "./addToBackground"
import {Color} from "../entities/Color"

export function addSomeToBackground(elem: Color | ImageElement) {
    dispatch(addToBackground, elem)
}