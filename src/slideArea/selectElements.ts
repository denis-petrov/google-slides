import {Dispatch} from "react"
import {CHOOSE_ELEMENTS} from "../store/actionTypes"

export function selectElements(event: any, id: string, dispatch: Dispatch<any>) {
    let clickedElem = event.currentTarget
    let elemClassName = 'element_choosed'

    if (event.ctrlKey) {
        if (clickedElem.getAttribute('data-is-element')) {
            if (clickedElem.classList.contains(elemClassName)) {
                clickedElem.classList.remove(elemClassName)
                if (clickedElem.tagName === 'P') {
                    (clickedElem.parentNode as HTMLElement).style.cursor = 'default'
                }
            } else {
                clickedElem.classList.add(elemClassName)
                if (clickedElem.tagName === 'P') {
                    (clickedElem.parentNode as HTMLElement).style.cursor = 'move'
                }
            }

            let selectedElems = new Array<string>()
            let allSelectedElems = document.getElementsByClassName(elemClassName)
            for (let i = 0; i < allSelectedElems.length; i++) {
                if (allSelectedElems[i].classList.contains(elemClassName)) {
                    let selectedElemId = allSelectedElems[i].id
                    if (selectedElemId) {
                        selectedElems.push(selectedElemId)
                    }
                }
            }

            dispatch({type: CHOOSE_ELEMENTS, payload: selectedElems})
        }
    } else {
        if (!clickedElem.classList.contains(elemClassName)) {
            let allSelectedElements = document.getElementsByClassName(elemClassName)
            while (allSelectedElements[0]) {
                if (allSelectedElements[0].classList.contains(elemClassName)) {
                    allSelectedElements[0].classList.remove(elemClassName)
                }
            }

            clickedElem.classList.toggle(elemClassName)

            if (clickedElem.tagName === 'P') {
                (clickedElem.parentNode as HTMLElement).style.cursor = 'move'
            }

            dispatch({type: CHOOSE_ELEMENTS, payload: [id]})
        }
    }
}