import {dispatch} from "../stateManager/StateManager";
import {chooseElements} from "./chooseElements";
import {changeVisibilityTextStyleMenu} from "./changeVisibilityTextStyleMenu";

export function removeSelectOfElement(evt: MouseEvent) {
    let clickedElem = evt.target as HTMLElement
    let slideArea = document.getElementById('slide-area')
    let pathClassName = 'elem-path_active'
    let itsSlideArea = null
    if (slideArea) {
        itsSlideArea = evt.target === slideArea || slideArea.contains(evt.target as Node)
    }

    if (itsSlideArea && !(clickedElem.getAttribute('data-path-id'))) {
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

        dispatch(chooseElements, new Array<number>())
        changeVisibilityTextStyleMenu(false)
    }


}