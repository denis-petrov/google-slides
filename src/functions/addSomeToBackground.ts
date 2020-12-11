import {ImageElement} from '../entities/Elements'
import {Color} from "../entities/Color"
import {Dispatch} from "react"

export function addSomeToBackground(elem: Color | ImageElement, dispatch: Dispatch<any>) {
    dispatch({type: 'ADD_TO_BACKGROUND', payload: elem})
}