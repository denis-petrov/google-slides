import {dispatch} from "../stateManager/StateManager"
import {chooseElements} from "../functions/chooseElements"
import {changePrimitiveStyleMenu} from "../functions/changePrimitiveStyleMenu"
import {changeTextStyleMenu} from "../functions/changeTextStyleMenu"

export function selectElements(event: any, id: string) {
    let clickedElem = event.currentTarget
    let elemPathId = clickedElem.getAttribute('data-path-id')
    let elemPointsId = clickedElem.getAttribute('data-points-id')
    let elemPath = document.getElementById(elemPathId)
    let elemPoints = document.getElementById(elemPointsId)
    let elemClassName = 'element_choosed'
    let pathClassName = 'elem-path_active'
    let pointsClassName = 'points_container_active'
    if (event.ctrlKey) {
        if (clickedElem.getAttribute('data-path-id')) {
            if (clickedElem.classList.contains(elemClassName)) {
                if (elemPath) {
                    elemPath.classList.remove(pathClassName)
                }

                if (elemPoints) {
                    elemPoints.classList.remove(pointsClassName)
                }

                clickedElem.classList.remove(elemClassName)
                if (clickedElem.tagName === 'P') {
                    (clickedElem.parentNode as HTMLElement).style.cursor = 'default'
                }
            } else {
                if (elemPath) {
                    elemPath.classList.add(pathClassName)
                }

                if (elemPoints) {
                    elemPoints.classList.add(pointsClassName)
                }

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

            dispatch(chooseElements, selectedElems, false)
        }
    } else {
        if (!clickedElem.classList.contains(elemClassName)) {
            let allSelectedElemsPaths = document.getElementsByClassName(pathClassName)
            while (allSelectedElemsPaths[0]) {
                if (allSelectedElemsPaths[0].classList.contains(pathClassName)) {
                    allSelectedElemsPaths[0].classList.remove(pathClassName)
                }
            }

            let allSelectedElemsPoints = document.getElementsByClassName(pointsClassName)
            while (allSelectedElemsPoints[0]) {
                if (allSelectedElemsPoints[0].classList.contains(pointsClassName)) {
                    allSelectedElemsPoints[0].classList.remove(pointsClassName)
                }
            }

            let allSelectedElements = document.getElementsByClassName(elemClassName)
            while (allSelectedElements[0]) {
                if (allSelectedElements[0].classList.contains(elemClassName)) {
                    allSelectedElements[0].classList.remove(elemClassName)
                }
            }

            clickedElem.classList.toggle(elemClassName)
            if (elemPath) {
                elemPath.classList.add(pathClassName)
            }

            if (elemPoints) {
                elemPoints.classList.add(pointsClassName)
            }

            if (clickedElem.tagName === 'P') {
                (clickedElem.parentNode as HTMLElement).style.cursor = 'move'
                changePrimitiveStyleMenu(false)
                changeTextStyleMenu(true)
            } else {
                changeTextStyleMenu(false)
                changePrimitiveStyleMenu(true)
            }

            dispatch(chooseElements, [id], false)
        }
    }
}