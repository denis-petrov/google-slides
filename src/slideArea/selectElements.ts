import {changePrimitiveStyleMenu} from "../functions/changePrimitiveStyleMenu"
import {changeTextStyleMenu} from "../functions/changeTextStyleMenu"
import React, {Dispatch} from "react"
import {store} from "../store/store"
import {CHOOSE_ELEMENTS} from "../store/actionTypes"
import {Point} from "../entities/Point";
import {pathClassName, pointsClassName} from "../functions/removeSelectOfElements";
import {getSelectedPoints} from "../functions/getSelectedPoints";


const multipleSelectClassName = 'multiple-select'

export function selectElements(event: any, id: string, dispatch: Dispatch<any>) {
    let clickedElem = event.currentTarget
    let elemPathId = clickedElem.getAttribute('data-path-id')
    let elemPointsId = clickedElem.getAttribute('data-points-id')
    let elemPath = document.getElementById(elemPathId)
    let elemPoints = document.getElementById(elemPointsId)
    let elemClassName = 'element_choosed'
    let pathClassName = 'elem-path_active'
    let pointsClassName = 'points_container_active'
    let workspace = document.getElementsByClassName('workspace')[0] as HTMLElement
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

            dispatch({type: CHOOSE_ELEMENTS, payload: selectedElems})
        }
    } else {
        if (!clickedElem.classList.contains(elemClassName)) {
            let editor = store.getState()
            editor.presentation.slides.map(s => {
                if (editor.selectionSlidesId.includes(s.id)) {
                    for (let i = 0; i < s.elements.length; i++) {
                        workspace.appendChild(document.getElementById(`svg_${s.elements[i].id}`) as HTMLElement)
                    }
                }
            })

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

            dispatch({type: CHOOSE_ELEMENTS, payload: [id]})
        }
    }

    let clickedElemParent = clickedElem.parentNode as HTMLElement
    if (clickedElem.tagName === 'P') {
        clickedElemParent = clickedElemParent.parentNode as HTMLElement
    }

    workspace.appendChild(clickedElemParent)

    multipleSelectElements()
}

export function getMultipleSelection(topLeftPoint: Point, bottomRightPoint: Point) {
    let width = Math.round((bottomRightPoint.x - topLeftPoint.x) * 100) / 100
    let height = Math.round((bottomRightPoint.y - topLeftPoint.y) * 100) / 100
    let viewBoxWidth = Math.round((bottomRightPoint.x - topLeftPoint.x) * 10 * 100) / 100
    let viewBoxHeight

    if (width > height) {
        viewBoxHeight = Math.round(height * 10 * 100) / 100
    } else {
        viewBoxHeight = Math.round(height * 10 / 16 * 9 * 100) / 100
    }

    let viewBox = `0 0, ${viewBoxWidth}, ${viewBoxHeight}`
    let d = `M 0, 0 H ${viewBoxWidth} V ${viewBoxHeight} H 0 V 0`

    let selectedPoints = getSelectedPoints(width, height, viewBoxWidth, viewBoxHeight)

    let headSvg = document.createElement('svg')
    let editor = store.getState()
    editor.presentation.slides.map(s => {
        if (editor.selectionSlidesId.includes(s.id)) {
            let element = document.getElementById(`svg_${s.selectionElementsId[0]}`)
            if (element) {
                headSvg = element.cloneNode(true) as HTMLElement
            }
        }
    })

    headSvg.setAttribute('id', 'multiple-selection')
    headSvg.setAttribute('oldD', d)
    headSvg.setAttribute('x', topLeftPoint.x + '%')
    headSvg.setAttribute('y', topLeftPoint.y + '%')
    headSvg.setAttribute('tlpX', `${topLeftPoint.x}`)
    headSvg.setAttribute('tlpY', `${topLeftPoint.y}`)
    headSvg.setAttribute('brpX', `${bottomRightPoint.x}`)
    headSvg.setAttribute('brpY', `${bottomRightPoint.y}`)
    headSvg.setAttribute('viewBox', viewBox)
    headSvg.setAttribute('width', width + '%')
    headSvg.setAttribute('height', height + '%')

    headSvg.children[0].remove()

    let selectionBorder = headSvg.children[0]

    selectionBorder.setAttribute('d', d)
    selectionBorder.setAttribute('stroke', 'rgb(26, 115, 232)')
    selectionBorder.setAttribute('stroke-width', '1')
    selectionBorder.setAttribute('stroke-linejoin', 'miter')
    selectionBorder.setAttribute('stroke-linecap', 'square')
    selectionBorder.setAttribute('fill', 'none')
    if (!selectionBorder.classList.contains(pathClassName)) {
        selectionBorder.classList.add(pathClassName)
    }

    if (selectionBorder.classList.contains(multipleSelectClassName)) {
        selectionBorder.classList.remove(multipleSelectClassName)
    }

    let svgPoints = headSvg.children[1]
    svgPoints.setAttribute('id', 'multiple-selection-points')
    if (!svgPoints.classList.contains(pointsClassName)) {
        svgPoints.classList.add(pointsClassName)
    }

    if (svgPoints.classList.contains(multipleSelectClassName)) {
        svgPoints.classList.remove(multipleSelectClassName)
    }

    let childPoints = svgPoints.children
    for (let i = 0; i < childPoints.length; i++) {
        childPoints[i].setAttribute('d', selectedPoints[i])
    }

    return headSvg
}

export function multipleSelectElements() {
    let editor = store.getState()
    editor.presentation.slides.map(s => {
        if (editor.selectionSlidesId.includes(s.id)) {
            let multipleSelection = document.getElementById('multiple-selection')
            let workspace = document.getElementsByClassName('workspace')[0]
            if (s.selectionElementsId.length > 1) {
                let bottomRightPoint: Point = {
                    x: -10000,
                    y: -10000
                }
                let topLeftPoint: Point = {
                    x: 10000,
                    y: 10000
                }
                s.elements.filter(e => {
                    if (s.selectionElementsId.includes(e.id)) {
                        if (e.bottomRightPoint.x > bottomRightPoint.x) {
                            bottomRightPoint.x = e.bottomRightPoint.x
                        }

                        if (e.bottomRightPoint.y > bottomRightPoint.y) {
                            bottomRightPoint.y = e.bottomRightPoint.y
                        }

                        if (e.topLeftPoint.x < topLeftPoint.x) {
                            topLeftPoint.x = e.topLeftPoint.x
                        }

                        if (e.topLeftPoint.y < topLeftPoint.y) {
                            topLeftPoint.y = e.topLeftPoint.y
                        }
                    }
                })

                if (multipleSelection) {
                    multipleSelection.remove()
                }

                for (let i = 0; i < s.elements.length; i++) {
                    workspace.appendChild(document.getElementById(`svg_${s.elements[i].id}`) as HTMLElement)
                }

                let elemPathArray = document.getElementsByClassName(pathClassName)
                for (let i = 0; i < elemPathArray.length; i++) {
                    if (elemPathArray[i].classList.contains(pathClassName)) {
                        if (elemPathArray[i].classList.contains(multipleSelectClassName)) {
                            elemPathArray[i].classList.remove(multipleSelectClassName)
                        }

                        elemPathArray[i].classList.add(multipleSelectClassName)
                    }
                }

                let elemPointsArray = document.getElementsByClassName(pointsClassName)
                for (let i = 0; i < elemPointsArray.length; i++) {
                    if (elemPointsArray[i].classList.contains(pointsClassName)) {
                        if (elemPointsArray[i].classList.contains(multipleSelectClassName)) {
                            elemPointsArray[i].classList.remove(multipleSelectClassName)
                        }

                        elemPointsArray[i].classList.add(multipleSelectClassName)
                    }
                }

                workspace.appendChild(getMultipleSelection(topLeftPoint, bottomRightPoint))
            } else {
                if (multipleSelection) {
                    multipleSelection.remove()
                }

                let clickedElem = document.getElementById(s.selectionElementsId[0]) as HTMLElement
                let clickedElemParent = clickedElem.parentNode as HTMLElement
                if (clickedElem.tagName === 'P') {
                    clickedElemParent = clickedElemParent.parentNode as HTMLElement
                }

                let allMultipleSelectElements = document.getElementsByClassName(multipleSelectClassName)
                while(allMultipleSelectElements[0]) {
                    allMultipleSelectElements[0].classList.remove(multipleSelectClassName)
                }

                workspace.appendChild(clickedElemParent)
            }
        }
    })
}