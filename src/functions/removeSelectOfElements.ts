import {dispatch} from "../stateManager/StateManager"
import {chooseElements} from "./chooseElements"
import {changeTextStyleMenu} from "./changeTextStyleMenu"
import {deleteElements} from "./deleteElements";

export function removeSelectOfElement(evt: any) {
    let clickedElem = evt.target as HTMLElement
    let navBar = document.getElementById('nav_bar')
    let showPresentationBtn = document.getElementById('show_presentation_btn')
    let pathClassName = 'elem-path_active'
    let pointsClassName = 'points_container_active'
    let itsNavBar = null
    let itsShowPresentationBtn = null
    let itsClickedElem = false
    if (showPresentationBtn) {
        itsShowPresentationBtn = evt.target === showPresentationBtn || showPresentationBtn.contains(evt.target as Node)
    }

    if (navBar) {
        itsNavBar = evt.target === navBar || (navBar.contains(evt.target as Node) && !itsShowPresentationBtn)
    }

    if (clickedElem.getAttribute('data-path-id') || clickedElem.getAttribute('data-value') || clickedElem.tagName === 'foreignObject') {
        itsClickedElem = true
    }

    if ((!itsNavBar && !itsClickedElem) || itsShowPresentationBtn) {
        let className = 'element_choosed'
        let allSelectedElems = document.getElementsByClassName(className)
        while(allSelectedElems[0]) {
            if (allSelectedElems[0].classList.contains(className)) {
                if (allSelectedElems[0].tagName === 'P') {
                    (allSelectedElems[0].parentNode as HTMLElement).style.cursor = 'default'
                }

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