import React from 'react'
import './slideArea.css'
import {dispatch, getEditor} from '../stateManager/StateManager'
import {chooseElements} from "../functions/chooseElements"
import {changeTextStyleMenu} from "../functions/changeTextStyleMenu"
import {getSlideBackground} from "../functions/getSlideBackground"
import {getElements} from "../functions/getElements"
import {changePrimitiveStyleMenu} from "../functions/changePrimitiveStyleMenu"

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

export function moveElements(event: any) {
    let isMoveElements = false
    let editor = getEditor()
    editor.presentation.slides.map(s => {
        if (editor.selectionSlidesId.includes(s.id)) {
            let selectedElements = []
            for (let i = 0; i < s.selectionElementsId.length; i++) {
                selectedElements.push(document.getElementById(s.selectionElementsId[i]))
            }

            let itsSelectedElements = []
            for (let i = 0; i < selectedElements.length; i++) {
                let element = selectedElements[i]
                if (element) {
                    if (element.tagName === 'P') {
                        let parent = element.parentNode as HTMLElement
                        let shiftX = event.pageX - element.getBoundingClientRect().left
                        let shiftY = event.pageY - element.getBoundingClientRect().top
                        let parentSize = {
                            width: parent.getBoundingClientRect().width,
                            height: parent.getBoundingClientRect().height
                        }

                        itsSelectedElements.push(event.target === parent || (event.target.tagName === 'P' && (parentSize.width - shiftX <= 5 || parentSize.height - shiftY <= 5 || shiftX <= 5 || shiftY <= 5)))
                    } else {
                        itsSelectedElements.push(event.target === selectedElements[i] || (selectedElements[i] as HTMLElement).contains(event.target as Node))
                    }
                }
            }

            if (itsSelectedElements.includes(true)) {
                isMoveElements = true
            }
        }
    })

    return isMoveElements
}

export default function SlideArea() {
    let editor = getEditor()
    let slideId = ''
    // eslint-disable-next-line array-callback-return
    let elements = editor.presentation.slides.map(s => {
        if (editor.selectionSlidesId.includes(s.id)) {
            slideId = s.id
            return getElements(s)
        }
    })

    return (
        <div id="slide-area" className='slide-area'>
            <svg className={'workspace'} id={'slide_area_' + slideId}
                 style={{background: `0 0 / cover ${getSlideBackground()}`}}>
                {elements}
            </svg>
        </div>
    )
}