import {Element} from '../entities/Elements'
import {dispatch} from '../stateManager/StateManager'
import {addToBackground} from "./addToBackground"

export function addSomeToBackground(elem: Element) {
    dispatch(addToBackground, elem)
}