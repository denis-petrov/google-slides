import {Element} from '../entities/Elements'
import {dispatch} from '../stateManager/StateManager'
import {addElement} from './addElement'

export function addSomeElement(elem: Element) {
    dispatch(addElement, elem)
}