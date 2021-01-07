import {Dispatch} from "react"
import {store} from "../store/store"
import {CHOOSE_ELEMENTS} from "../store/actionTypes"
import {Point} from "../entities/Point";
import {pathClassName, pointsClassName} from "../functions/removeSelectOfElements"
import {getSelectedPoints} from "../functions/getSelectedPoints"


const multipleSelectClassName = 'multiple-select'

export function selectElements(event: any, id: string, dispatch: Dispatch<any>) {
    let clickedElem = event.currentTarget
    console.log(clickedElem)
    //let elemPathId = clickedElem.getAttribute('data-path-id')
    //let elemPointsId = clickedElem.getAttribute('data-points-id')
    let elemClassName = 'element_choosed'
    let workspace = document.getElementsByClassName('workspace')[0] as HTMLElement

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
            let editor = store.getState()
            editor.presentation.slides.map(s => {
                if (editor.selectionSlidesId.includes(s.id)) {
                    for (let i = 0; i < s.elements.length; i++) {
                        workspace.appendChild(document.getElementById(`svg_${s.elements[i].id}`) as HTMLElement)
                    }
                }
            })

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
    let defaultSelectionElement = document.getElementById('default-selection-element') as HTMLElement
    let multipleSelection = document.getElementById('multiple-selection') as HTMLElement
    let headSvg = defaultSelectionElement.cloneNode(true) as HTMLElement
    if (multipleSelection) {
        multipleSelection.remove()
    }

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


    let selectionBorder = headSvg.children[0]

    selectionBorder.setAttribute('d', d)
    if (!selectionBorder.classList.contains(pathClassName)) {
        selectionBorder.classList.add(pathClassName)
    }

    let svgPoints = headSvg.children[1]
    if (!svgPoints.classList.contains(pointsClassName)) {
        svgPoints.classList.add(pointsClassName)
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
            if (s.selectionElementsId.length > 0) {
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

                for (let i = 0; i < s.elements.length; i++) {
                    workspace.appendChild(document.getElementById(`svg_${s.elements[i].id}`) as HTMLElement)
                }

                workspace.appendChild(getMultipleSelection(topLeftPoint, bottomRightPoint))
            } else {
                let multipleSelection = document.getElementById('multiple-selection')
                if (multipleSelection) {
                    multipleSelection.remove()
                }
            }
        }
    })
}