import {showSlideShowPanel} from "./functions/showPresentation"
import {changeTextCursor} from "./functions/changeTextCursor"
import {mouseMoveElements} from "./functions/mouseMoveElements"
import {dispatch, getEditor} from "./stateManager/StateManager"
import {changeVisibilitySlideHr} from "./slideMenu/changeVisibilitySlideHr"
import {moveElementPoint, resizeElement} from "./functions/resizeElement"
import {endMoveElements} from "./functions/endMoveElements"
import {endMoveSlides} from "./functions/endMoveSlides"
import {clearAllSlideHr} from "./slideMenu/clearAllSlideHr"
import {endResizeElement} from "./functions/endResizeElement"
import {changePositionOfElements} from "./functions/changePositionOfElements"
import {removeSelectOfElement} from "./functions/removeSelectOfElements"
import {moveSlides} from "./functions/moveSlides"
import {moveElements} from "./slideArea/moveElements"


let isMoveElements: boolean
let firstPosX: number
let firstPosY: number
let isResize: boolean

let isMoveSlides: boolean

let pointIndex: number
let payload: any
let resized = false

let isMouseMove = false

export function useDragAndDrop() {
    let handleMouseDown = (evt: MouseEvent) => {
        firstPosX = evt.clientX
        firstPosY = evt.clientY
        isMoveElements = moveElements(evt)

        isMoveSlides = moveSlides(evt)

        pointIndex = resizeElement(evt, pointIndex)
        isResize = pointIndex >= 0

        removeSelectOfElement(evt)

        if (isResize || isMoveElements || isMoveSlides) {
            window.addEventListener('mousemove', handleMouseMove)
        }
    }
    window.addEventListener('mousedown', handleMouseDown)



    let handleMouseMove = (evt: MouseEvent) => {
        document.documentElement.style.cursor = ''
        showSlideShowPanel(evt)
        changeTextCursor(evt)

        if (isMoveElements) {
            mouseMoveElements(evt, firstPosX, firstPosY)
        }

        if (isMoveSlides) {
            let selectedSlide = getEditor().selectionSlidesId[0]

            let elem = evt.target as HTMLElement

            let shiftY = evt.pageY - elem.getBoundingClientRect().top

            if (elem.id !== undefined && selectedSlide !== elem.id) {
                changeVisibilitySlideHr(getEditor(), {shiftY: shiftY, startSlideId: selectedSlide, endSlideId: elem.id})
                isMouseMove = true
            }
        }

        if (isResize) {
            resized = true
            payload = moveElementPoint(evt, firstPosX, firstPosY, pointIndex)
        }
        window.addEventListener('mouseup', handleMouseUp)
    }


    let handleMouseUp = (evt: MouseEvent) => {
        if (isMoveElements) {
            isMoveElements = endMoveElements(isMoveElements)
        }

        if (isMoveSlides) {
            let selectedSlide = getEditor().selectionSlidesId[0]
            let elem = evt.target as HTMLElement

            let shiftY = evt.pageY - elem.getBoundingClientRect().top

            if (isMouseMove && elem.id !== '' && elem.id !== undefined  && selectedSlide !== elem.id) {
                dispatch(endMoveSlides, {shiftY: shiftY, startSlideId: selectedSlide, endSlideId: elem.id})
                isMouseMove = false
            }
            clearAllSlideHr()

            isMoveSlides = false
        }

        if (isResize) {
            isResize = false
            pointIndex = -1
            if (resized) {
                endResizeElement(payload)
                if (!payload.get('small')) {
                    dispatch(changePositionOfElements, payload)
                }
            }
        }
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mouseup', handleMouseUp)
    }
}