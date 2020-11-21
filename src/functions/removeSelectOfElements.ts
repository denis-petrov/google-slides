import {dispatch} from "../stateManager/StateManager"
import {chooseElements} from "./chooseElements"
import {changeTextStyleMenu} from "./changeTextStyleMenu"

export function removeSelectOfElement(evt: any) {
    let clickedElem = evt.target as HTMLElement
    let slideArea = document.getElementById('slide-area')
    let pathClassName = 'elem-path_active'
    let pointsClassName = 'points_container_active'
    let itsSlideArea = null
    if (slideArea) {
        itsSlideArea = evt.target === slideArea || slideArea.contains(evt.target as Node)
    }

    if (itsSlideArea && !(clickedElem.getAttribute('data-path-id')) && !(clickedElem.getAttribute('data-points-id'))) {
        let className = 'element_choosed'
        let allSelectedElems = document.getElementsByClassName(className)
        while(allSelectedElems[0]) {
            if (allSelectedElems[0].classList.contains(className)) {
                allSelectedElems[0].classList.remove(className)
            }
        }

        let elemPathArray = document.getElementsByClassName(pathClassName)
        while(elemPathArray[0]) {
            if (elemPathArray[0].classList.contains(pathClassName)) {
                elemPathArray[0].classList.remove(pathClassName)
            }
        }

        let elemPointsArray = document.getElementsByClassName(pointsClassName)
        while(elemPointsArray[0]) {
            if (elemPointsArray[0].classList.contains(pointsClassName)) {
                elemPointsArray[0].classList.remove(pointsClassName)
            }
        }

        dispatch(chooseElements, new Array<number>(), false)
        changeTextStyleMenu(false)
    }
}